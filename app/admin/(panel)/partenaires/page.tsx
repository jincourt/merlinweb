import Link from "next/link";
import { formatAdminDate, getAdminPartners } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await getAdminPartners();

  return (
    <>
      <header className="admin-page-header">
        <span className="t-mono !text-black/70">Partenaires</span>
        <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          Programme parrainage
        </h1>
        <p className="t-body mt-3 max-w-xl">
          {partners.length} partenaire{partners.length !== 1 ? "s" : ""}{" "}
          inscrit{partners.length !== 1 ? "s" : ""} pour recevoir 50.- par
          invitation confirmée.
        </p>
      </header>

      {partners.length === 0 ? (
        <div className="admin-empty">
          <p className="t-body">Aucun partenaire pour le moment.</p>
          <Link href="/#offre" className="btn-outline mt-6">
            Voir la section parrainage
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Téléphone</th>
                <th>Code</th>
                <th>Lien d&apos;invitation</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="admin-table-date">
                    {formatAdminDate(partner.created_at)}
                  </td>
                  <td>
                    <a href={`tel:${partner.phone.replace(/\s/g, "")}`}>
                      {partner.phone}
                    </a>
                  </td>
                  <td>
                    <span className="admin-table-tag">{partner.code}</span>
                  </td>
                  <td>
                    <a
                      href={partner.link}
                      className="admin-table-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {partner.link}
                    </a>
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
