import { getAdminQuotes } from "@/lib/admin-data";
import { AdminClientsSearch } from "@/app/components/admin-clients-search";

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

      <AdminClientsSearch quotes={quotes} />
    </>
  );
}
