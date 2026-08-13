import { requireAdminAuth } from "@/lib/admin-auth";
import { getAdminInvoice, markInvoiceSent } from "@/lib/invoice-data";
import { sendInvoiceEmail } from "@/lib/invoice-email";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const invoice = await getAdminInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Introuvable." }, { status: 404 });
    }

    await sendInvoiceEmail(invoice);
    await markInvoiceSent(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invoice send error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur d'envoi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
