import Link from "next/link";
import { formatAdminDate } from "@/lib/admin-data";
import { getAdminInvoices } from "@/lib/invoice-data";

export const dynamic = "force-dynamic";

export default async function AdminFacturesPage() {
  const invoices = await getAdminInvoices();

  return (
    <>
      <header className="admin-page-header admin-page-header-row">
        <div>
          <span className="t-mono !text-black/70">Factures</span>
          <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
            Devis & factures
          </h1>
          <p className="t-body mt-3 max-w-xl">
            {invoices.length} document{invoices.length !== 1 ? "s" : ""} — PDF,
            QR-facture suisse et envoi email.
          </p>
        </div>
        <Link href="/admin/factures/nouveau" className="btn-primary shrink-0">
          Nouveau document
        </Link>
      </header>

      {invoices.length === 0 ? (
        <div className="admin-empty">
          <p className="t-body">Aucun devis ou facture pour le moment.</p>
          <Link href="/admin/factures/nouveau" className="btn-outline mt-6">
            Créer un devis
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Type</th>
                <th>Client</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <Link
                      href={`/admin/factures/${invoice.id}`}
                      className="admin-table-link font-mono"
                    >
                      {invoice.number}
                    </Link>
                  </td>
                  <td>
                    <span className="admin-table-tag">{invoice.typeLabel}</span>
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      <span>{invoice.client_name}</span>
                      {invoice.client_email && (
                        <a href={`mailto:${invoice.client_email}`}>
                          {invoice.client_email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="admin-table-total">{invoice.totalFormatted}</td>
                  <td>
                    <span
                      className={`admin-invoice-status admin-invoice-status-${invoice.status}`}
                    >
                      {invoice.statusLabel}
                    </span>
                  </td>
                  <td className="admin-table-date">
                    {formatAdminDate(invoice.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
