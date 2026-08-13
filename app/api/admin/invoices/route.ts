import { requireAdminAuth } from "@/lib/admin-auth";
import { createInvoice, getAdminInvoices } from "@/lib/invoice-data";
import type { InvoiceInput, InvoiceLineItem, InvoiceType } from "@/lib/invoice-types";
import { NextResponse } from "next/server";

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

export async function GET() {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const invoices = await getAdminInvoices();
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseBody(body);

    if (!input) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const invoice = await createInvoice(input);
    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Invoice create error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
