import { requireAdminAuth } from "@/lib/admin-auth";
import { getAdminInvoice } from "@/lib/invoice-data";
import {
  generateInvoicePdf,
  getInvoicePdfFilename,
} from "@/lib/invoice-pdf";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const invoice = await getAdminInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Introuvable." }, { status: 404 });
    }

    const pdf = await generateInvoicePdf(invoice);
    const filename = getInvoicePdfFilename(invoice);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Invoice PDF error:", error);
    return NextResponse.json({ error: "Erreur PDF." }, { status: 500 });
  }
}
