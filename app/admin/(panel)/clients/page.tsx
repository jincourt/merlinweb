import Link from "next/link";
import { formatAdminDate, getAdminQuotes } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const quotes = await getAdminQuotes();

  return (
    <>
      <header className="admin-page-header">
        <span className="t-mono !text-black/70">Clients</span>
        <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          Demandes de devis
        </h1>
        <p className="t-body mt-3 max-w-xl">
          {quotes.length} demande{quotes.length !== 1 ? "s" : ""} enregistrée
          {quotes.length !== 1 ? "s" : ""} dans la base de données.
        </p>
      </header>

      {quotes.length === 0 ? (
        <div className="admin-empty">
          <p className="t-body">Aucune demande pour le moment.</p>
          <Link href="/#devis" className="btn-outline mt-6">
            Voir le formulaire
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contact</th>
                <th>Options</th>
                <th>Total</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="admin-table-date">
                    {formatAdminDate(quote.created_at)}
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      {quote.email && (
                        <a href={`mailto:${quote.email}`}>{quote.email}</a>
                      )}
                      {quote.phone && (
                        <a href={`tel:${quote.phone.replace(/\s/g, "")}`}>
                          {quote.phone}
                        </a>
                      )}
                      {quote.invite_code && (
                        <span className="admin-table-tag">
                          Code {quote.invite_code}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <ul className="admin-table-options">
                      {quote.optionLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="admin-table-total">{quote.totalFormatted}</td>
                  <td className="admin-table-message">
                    {quote.message || "—"}
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
