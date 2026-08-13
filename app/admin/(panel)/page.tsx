import { Eye, Gift, Users } from "lucide-react";
import { getAdminStats } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const stats = await getAdminStats();

  const cards = [
    {
      label: "Visites",
      value: stats.visits,
      hint: "Sessions uniques sur la page d'accueil",
      icon: Eye,
    },
    {
      label: "Partenaires",
      value: stats.partners,
      hint: "Numéros enregistrés pour le programme 50.-",
      icon: Gift,
    },
    {
      label: "Clients",
      value: stats.clients,
      hint: "Demandes de devis soumises",
      icon: Users,
    },
  ];

  return (
    <>
      <header className="admin-page-header">
        <span className="t-mono !text-black/70">Tableau de bord</span>
        <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
          Vue d&apos;ensemble
        </h1>
        <p className="t-body mt-3 max-w-xl">
          Statistiques globales du site Merlin — visites, partenaires
          parrainage et demandes clients.
        </p>
      </header>

      <div className="admin-stat-grid">
        {cards.map(({ label, value, hint, icon: Icon }) => (
          <article key={label} className="admin-stat-card">
            <div className="flex items-start justify-between gap-4">
              <span className="t-mono !text-black/70">{label}</span>
              <Icon
                size={18}
                strokeWidth={1.75}
                className="text-red shrink-0"
                aria-hidden
              />
            </div>
            <p className="admin-stat-value">{value.toLocaleString("fr-CH")}</p>
            <p className="admin-stat-hint">{hint}</p>
          </article>
        ))}
      </div>

      {stats.notes > 0 && (
        <p className="t-mono mt-8 !text-black/50">
          {stats.notes} avis client{stats.notes > 1 ? "s" : ""} enregistré
          {stats.notes > 1 ? "s" : ""}
        </p>
      )}
    </>
  );
}
