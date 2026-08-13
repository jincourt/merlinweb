import { INVOICE_PAYMENT_TERMS_DAYS } from "@/lib/invoice-config";

export type InvoiceType = "devis" | "facture";
export type InvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

export type InvoiceLineItem = {
  id: string;
  optionId?: string;
  label: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  isCustom?: boolean;
};

export type InvoiceRecord = {
  id: string;
  number: string;
  type: InvoiceType;
  status: InvoiceStatus;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  line_items: InvoiceLineItem[];
  notes: string;
  subtotal: number;
  total: number;
  valid_until: string | null;
  due_date: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
};

export type InvoiceInput = {
  type: InvoiceType;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  lineItems: InvoiceLineItem[];
  notes?: string;
  validUntil?: string;
  dueDate?: string;
  status?: InvoiceStatus;
};

export function computeLineTotal(item: InvoiceLineItem): number {
  return Math.round(item.quantity * item.unitPrice);
}

export function computeInvoiceTotals(lineItems: InvoiceLineItem[]) {
  const subtotal = lineItems.reduce((sum, item) => sum + computeLineTotal(item), 0);
  return { subtotal, total: subtotal };
}

export function defaultDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + INVOICE_PAYMENT_TERMS_DAYS);
  return d.toISOString().slice(0, 10);
}

export function defaultValidUntil() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export function parseClientAddress(address: string | null | undefined) {
  if (!address?.trim()) {
    return { street: "", zip: "", city: "" };
  }

  const lines = address
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const last = lines[lines.length - 1] ?? "";
  const zipCityMatch = last.match(/^(\d{4,5})\s+(.+)$/);

  if (zipCityMatch) {
    return {
      street: lines.slice(0, -1).join(", ") || lines[0] || "",
      zip: zipCityMatch[1],
      city: zipCityMatch[2],
    };
  }

  return { street: lines.join(", "), zip: "", city: "" };
}
