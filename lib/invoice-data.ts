import { formatChf } from "@/lib/options";
import { createServiceSupabase } from "@/lib/supabase";
import { defaultDueDate, defaultValidUntil } from "@/lib/invoice-types";
import {
  computeInvoiceTotals,
  type InvoiceInput,
  type InvoiceLineItem,
  type InvoiceRecord,
  type InvoiceStatus,
  type InvoiceType,
} from "@/lib/invoice-types";

function normalizeLineItems(items: InvoiceLineItem[]): InvoiceLineItem[] {
  return items
    .filter((item) => item.label.trim())
    .map((item) => ({
      id: item.id,
      optionId: item.optionId,
      label: item.label.trim(),
      description: item.description?.trim() || undefined,
      quantity: Math.max(1, Math.round(item.quantity) || 1),
      unitPrice: Math.round(item.unitPrice) || 0,
      isCustom: item.isCustom,
    }));
}

export async function generateInvoiceNumber(
  type: InvoiceType,
): Promise<string> {
  const prefix = type === "devis" ? "DEV" : "FAC";
  const year = new Date().getFullYear();
  const supabase = createServiceSupabase();

  const { count, error } = await supabase
    .from("invoice")
    .select("id", { count: "exact", head: true })
    .eq("type", type)
    .like("number", `${prefix}-${year}-%`);

  if (error) throw error;

  const seq = (count ?? 0) + 1;
  return `${prefix}-${year}-${String(seq).padStart(3, "0")}`;
}

function rowToRecord(row: Record<string, unknown>): InvoiceRecord {
  const lineItems = Array.isArray(row.line_items)
    ? (row.line_items as InvoiceLineItem[])
    : [];

  return {
    id: String(row.id),
    number: String(row.number),
    type: row.type as InvoiceType,
    status: row.status as InvoiceStatus,
    client_name: String(row.client_name),
    client_email: (row.client_email as string | null) ?? null,
    client_phone: (row.client_phone as string | null) ?? null,
    client_address: (row.client_address as string | null) ?? null,
    line_items: lineItems,
    notes: String(row.notes ?? ""),
    subtotal: Number(row.subtotal ?? 0),
    total: Number(row.total ?? 0),
    valid_until: (row.valid_until as string | null) ?? null,
    due_date: (row.due_date as string | null) ?? null,
    sent_at: (row.sent_at as string | null) ?? null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export type AdminInvoice = InvoiceRecord & {
  totalFormatted: string;
  typeLabel: string;
  statusLabel: string;
};

const TYPE_LABELS: Record<InvoiceType, string> = {
  devis: "Devis",
  facture: "Facture",
};

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Brouillon",
  sent: "Envoyé",
  paid: "Payé",
  cancelled: "Annulé",
};

export function enrichInvoice(invoice: InvoiceRecord): AdminInvoice {
  return {
    ...invoice,
    totalFormatted: formatChf(invoice.total),
    typeLabel: TYPE_LABELS[invoice.type],
    statusLabel: STATUS_LABELS[invoice.status],
  };
}

export async function getAdminInvoices(): Promise<AdminInvoice[]> {
  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("invoice")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data ?? []).map((row) => enrichInvoice(rowToRecord(row)));
  } catch {
    return [];
  }
}

export async function getAdminInvoice(id: string): Promise<AdminInvoice | null> {
  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("invoice")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return enrichInvoice(rowToRecord(data));
  } catch {
    return null;
  }
}

export function buildInvoicePayload(input: InvoiceInput) {
  const lineItems = normalizeLineItems(input.lineItems);
  const { subtotal, total } = computeInvoiceTotals(lineItems);
  const isFacture = input.type === "facture";

  return {
    type: input.type,
    status: input.status ?? "draft",
    client_name: input.clientName.trim(),
    client_email: input.clientEmail?.trim() || null,
    client_phone: input.clientPhone?.trim() || null,
    client_address: input.clientAddress?.trim() || null,
    line_items: lineItems,
    notes: input.notes?.trim() ?? "",
    subtotal,
    total,
    valid_until: isFacture ? null : (input.validUntil ?? defaultValidUntil()),
    due_date: isFacture ? (input.dueDate ?? defaultDueDate()) : null,
    updated_at: new Date().toISOString(),
  };
}

export async function createInvoice(input: InvoiceInput): Promise<InvoiceRecord> {
  const supabase = createServiceSupabase();
  const number = await generateInvoiceNumber(input.type);
  const payload = buildInvoicePayload(input);

  const { data, error } = await supabase
    .from("invoice")
    .insert({ ...payload, number })
    .select("*")
    .single();

  if (error) throw error;
  return rowToRecord(data);
}

export async function updateInvoice(
  id: string,
  input: InvoiceInput,
): Promise<InvoiceRecord> {
  const supabase = createServiceSupabase();
  const payload = buildInvoicePayload(input);

  const { data, error } = await supabase
    .from("invoice")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToRecord(data);
}

export async function markInvoiceSent(id: string): Promise<void> {
  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from("invoice")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteInvoice(id: string): Promise<void> {
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("invoice").delete().eq("id", id);
  if (error) throw error;
}
