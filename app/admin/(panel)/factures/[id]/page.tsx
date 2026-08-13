import Link from "next/link";
import { notFound } from "next/navigation";
import { InvoiceEditor } from "@/app/components/invoice-editor";
import { getAdminClientOptions } from "@/lib/admin-clients";
import { getAdminInvoice } from "@/lib/invoice-data";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminInvoiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [invoice, existingClients] = await Promise.all([
    getAdminInvoice(id),
    getAdminClientOptions(),
  ]);

  if (!invoice) notFound();

  return (
    <>
      <header className="admin-page-header">
        <Link href="/admin/factures" className="admin-table-link text-sm">
          ← Factures
        </Link>
        <h1 className="t-display mt-3 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          {invoice.typeLabel} {invoice.number}
        </h1>
        <p className="t-body mt-3 max-w-xl">
          {invoice.client_name} · {invoice.totalFormatted}
          {invoice.sent_at ? ` · Envoyé le ${new Date(invoice.sent_at).toLocaleDateString("fr-CH")}` : ""}
        </p>
      </header>

      <InvoiceEditor initial={invoice} existingClients={existingClients} />
    </>
  );
}
