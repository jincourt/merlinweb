import { requireAdminAuth } from "@/lib/admin-auth";
import {
  deleteInvoice,
  getAdminInvoice,
  updateInvoice,
} from "@/lib/invoice-data";
import type { InvoiceInput, InvoiceLineItem, InvoiceType } from "@/lib/invoice-types";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

function parseLineItems(value: unknown): InvoiceLineItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const label = typeof row.label === "string" ? row.label : "";
      if (!label.trim()) return null;
      return {
        id: typeof row.id === "string" ? row.id : crypto.randomUUID(),
        optionId: typeof row.optionId === "string" ? row.optionId : undefined,
        label,
        description:
          typeof row.description === "string" ? row.description : undefined,
        quantity: Number(row.quantity) || 1,
        unitPrice: Number(row.unitPrice) || 0,
        isCustom: row.isCustom === true,
      };
    })
    .filter(Boolean) as InvoiceLineItem[];
}

function parseBody(body: Record<string, unknown>): InvoiceInput | null {
  const type = body.type;
  const clientName = typeof body.clientName === "string" ? body.clientName : "";

  if (type !== "devis" && type !== "facture") return null;
  if (!clientName.trim()) return null;

  const lineItems = parseLineItems(body.lineItems);
  if (lineItems.length === 0) return null;

  const status = body.status;
  const validStatus =
    status === "draft" ||
    status === "sent" ||
    status === "paid" ||
    status === "cancelled"
      ? status
      : undefined;

  return {
    type: type as InvoiceType,
    clientName,
    clientEmail:
      typeof body.clientEmail === "string" ? body.clientEmail : undefined,
    clientPhone:
      typeof body.clientPhone === "string" ? body.clientPhone : undefined,
    clientAddress:
      typeof body.clientAddress === "string" ? body.clientAddress : undefined,
    lineItems,
    notes: typeof body.notes === "string" ? body.notes : undefined,
    validUntil:
      typeof body.validUntil === "string" ? body.validUntil : undefined,
    dueDate: typeof body.dueDate === "string" ? body.dueDate : undefined,
    status: validStatus,
  };
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await context.params;
  const invoice = await getAdminInvoice(id);

  if (!invoice) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }

  return NextResponse.json({ invoice });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseBody(body);

    if (!input) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const invoice = await updateInvoice(id, input);
    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Invoice update error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteInvoice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invoice delete error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
