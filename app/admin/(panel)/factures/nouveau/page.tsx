import Link from "next/link";
import { InvoiceEditor } from "@/app/components/invoice-editor";
import { getAdminClientOptions } from "@/lib/admin-clients";

export const dynamic = "force-dynamic";

export default async function AdminNewInvoicePage() {
  const existingClients = await getAdminClientOptions();

  return (
    <>
      <header className="admin-page-header">
        <Link href="/admin/factures" className="admin-table-link text-sm">
          ← Factures
        </Link>
        <h1 className="t-display mt-3 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          Nouveau document
        </h1>
        <p className="t-body mt-3 max-w-xl">
          Créez un devis ou une facture avec options du catalogue, lignes
          personnalisées et export PDF.
        </p>
      </header>

      <InvoiceEditor existingClients={existingClients} />
    </>
  );
}
