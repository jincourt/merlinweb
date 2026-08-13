import { formatAdminDate, getAdminVisitors } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function displayReferrer(referrer: string | null) {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer.slice(0, 48);
  }
}

export default async function AdminVisitesPage() {
  const visitors = await getAdminVisitors();

  return (
    <>
      <header className="admin-page-header">
        <span className="t-mono !text-black/70">Visites</span>
        <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          Visiteurs uniques
        </h1>
        <p className="t-body mt-3 max-w-xl">
          {visitors.length} visiteur{visitors.length !== 1 ? "s" : ""} unique
          {visitors.length !== 1 ? "s" : ""} identifié
          {visitors.length !== 1 ? "s" : ""} sur le site.
        </p>
      </header>

      {visitors.length === 0 ? (
        <div className="admin-empty">
          <p className="t-body">Aucune visite enregistrée pour le moment.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Première visite</th>
                <th>Dernière visite</th>
                <th>Sessions</th>
                <th>Pages</th>
                <th>Provenance</th>
                <th>Appareil</th>
                <th>UTM / Code</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor) => (
                <tr key={visitor.id}>
                  <td className="admin-table-date">
                    {formatAdminDate(visitor.first_seen_at)}
                  </td>
                  <td className="admin-table-date">
                    {formatAdminDate(visitor.last_seen_at)}
                  </td>
                  <td>{visitor.session_count}</td>
                  <td>
                    <div className="admin-table-contact">
                      <span>{visitor.first_path}</span>
                      {visitor.last_path !== visitor.first_path && (
                        <span className="admin-table-muted">
                          → {visitor.last_path}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      <span>{displayReferrer(visitor.referrer)}</span>
                      {visitor.language && (
                        <span className="admin-table-muted">
                          {visitor.language}
                          {visitor.timezone ? ` · ${visitor.timezone}` : ""}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      <span>{visitor.browserLabel}</span>
                      {visitor.screen && (
                        <span className="admin-table-muted">
                          {visitor.screen}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      {visitor.utmLabel && <span>{visitor.utmLabel}</span>}
                      {visitor.invite_code && (
                        <span className="admin-table-tag">
                          Code {visitor.invite_code}
                        </span>
                      )}
                      {!visitor.utmLabel && !visitor.invite_code && (
                        <span className="admin-table-muted">—</span>
                      )}
                    </div>
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
