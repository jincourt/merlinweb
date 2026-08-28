"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  Calendar,
  Eye,
  FileText,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MotionDiv } from "./motion";

type Scene = {
  id: string;
  module: string;
  title: string;
};

const SCENES: Scene[] = [
  {
    id: "vitrine",
    module: "Site vitrine",
    title: "Simple à lire. Facile à contacter.",
  },
  {
    id: "analytics",
    module: "Analytics & suivi",
    title: "Voyez qui vient, reste, convertit",
  },
  {
    id: "catalogue",
    module: "Catalogue produits",
    title: "Présentez, filtrez, vendez",
  },
  {
    id: "facturation",
    module: "Facturation en ligne",
    title: "Facturez depuis votre site",
  },
  {
    id: "rdv",
    module: "Prise de rendez-vous",
    title: "Vos clients réservent seuls",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const SCENE_DURATION = 12000;
const enter = { duration: 0.65, ease };
const stagger = 0.14;

function VitrineUi() {
  const services = [
    { name: "Rénovation complète", price: "Sur devis" },
    { name: "Maçonnerie & gros œuvre", price: "Dès 95 CHF/h" },
    { name: "Carrelage & finitions", price: "Sur devis" },
  ];

  return (
    <div className="showcase-vitrine-min">
      <motion.div
        className="showcase-vitrine-min-visual"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, ...enter }}
      >
        <Image
          src="/nicolas.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 45vw, 100vw"
          quality={92}
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="showcase-vitrine-min-content">
        <motion.p
          className="showcase-vitrine-min-brand"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...enter }}
        >
          Nicolas Travaux
        </motion.p>

        <motion.p
          className="showcase-vitrine-min-meta"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, ...enter }}
        >
          Lausanne · Artisan indépendant
        </motion.p>

        <motion.h4
          className="showcase-vitrine-min-title"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, ...enter }}
        >
          Clair sur le prix,
          <br />
          solide sur le résultat
        </motion.h4>

        <motion.p
          className="showcase-vitrine-min-text"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, ...enter }}
        >
          Gros œuvre, rénovation et finitions pour particuliers. Un interlocuteur,
          un devis détaillé.
        </motion.p>

        <motion.ul
          className="showcase-vitrine-min-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44, ...enter }}
        >
          {services.map((service, i) => (
            <motion.li
              key={service.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.48 + i * 0.06, duration: 0.45, ease }}
            >
              <span>{service.name}</span>
              <span>{service.price}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="showcase-vitrine-min-actions"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, ...enter }}
        >
          <span className="showcase-vitrine-min-cta">Demander un devis</span>
          <span className="showcase-vitrine-min-phone">078 000 00 00</span>
        </motion.div>

        <motion.p
          className="showcase-vitrine-min-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, ...enter }}
        >
          4,9 ★ · 38 avis Google
        </motion.p>
      </div>
    </div>
  );
}

function DashHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="showcase-dash-header">
      <div>
        <span className="showcase-dash-eyebrow">{eyebrow}</span>
        <h4 className="showcase-dash-title">{title}</h4>
      </div>
      {action}
    </div>
  );
}

function AnalyticsUi() {
  const bars = [32, 48, 41, 62, 55, 78, 71, 88, 74, 92];
  const rows = [
    { source: "google.ch", device: "Mobile", scroll: "84 %", time: "2m 14s" },
    { source: "Direct", device: "Desktop", scroll: "62 %", time: "1m 08s" },
    { source: "instagram.com", device: "Mobile", scroll: "91 %", time: "3m 02s" },
  ];

  return (
    <div className="showcase-dash-panel">
      <DashHeader eyebrow="Visites" title="Visiteurs uniques" />
      <div className="showcase-dash-stats">
        {[
          { label: "Visites", value: "847", hint: "+34 % ce mois", icon: Eye },
          {
            label: "Conversion",
            value: "2.7 %",
            hint: "+0.8 pt",
            icon: TrendingUp,
          },
          { label: "Durée moy.", value: "1m 42s", hint: "Par session", icon: Eye },
        ].map((stat, i) => (
          <motion.article
            key={stat.label}
            className="showcase-dash-stat"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * stagger, ...enter }}
          >
            <div className="showcase-dash-stat-top">
              <span>{stat.label}</span>
              <stat.icon size={14} strokeWidth={1.75} className="text-red" />
            </div>
            <p className="showcase-dash-stat-value">{stat.value}</p>
            <p className="showcase-dash-stat-hint">{stat.hint}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="showcase-dash-chart-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, ...enter }}
      >
        <div className="showcase-dash-chart-head">
          <span>Trafic — 14 derniers jours</span>
          <span className="showcase-dash-live">En direct</span>
        </div>
        <div className="showcase-dash-chart">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="showcase-dash-chart-bar"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ height: `${h}%` }}
              transition={{ delay: 0.65 + i * 0.07, duration: 0.75, ease }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="showcase-dash-table-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, ...enter }}
      >
        <table className="showcase-dash-table">
          <thead>
            <tr>
              <th>Provenance</th>
              <th>Appareil</th>
              <th>Engagement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.source}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95 + i * stagger, duration: 0.55, ease }}
              >
                <td>{row.source}</td>
                <td>{row.device}</td>
                <td>
                  <span>{row.scroll}</span>
                  <span className="showcase-dash-muted">{row.time}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function CatalogueUi() {
  const products = [
    {
      name: "Consultation initiale",
      price: "120 CHF",
      category: "Service",
      status: "Actif",
      statusKey: "active",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Forfait mensuel",
      price: "350 CHF",
      category: "Abonnement",
      status: "Actif",
      statusKey: "active",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Atelier sur mesure",
      price: "210 CHF",
      category: "Service",
      status: "Brouillon",
      statusKey: "draft",
      image:
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <div className="showcase-dash-panel">
      <DashHeader
        eyebrow="Catalogue"
        title="Vos offres"
        action={
          <span className="showcase-dash-btn">
            <Plus size={12} strokeWidth={2} />
            Ajouter
          </span>
        }
      />

      <div className="showcase-dash-summary">
        {[
          { label: "Offres actives", value: "4", count: "Visibles sur le site" },
          { label: "Panier moyen", value: "285 CHF", count: "3 ventes ce mois" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="showcase-dash-summary-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * stagger, ...enter }}
          >
            <span className="showcase-dash-summary-label">{s.label}</span>
            <span className="showcase-dash-summary-value">{s.value}</span>
            <span className="showcase-dash-summary-count">{s.count}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="showcase-dash-toolbar showcase-dash-toolbar-compact"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, ...enter }}
      >
        <span className="showcase-dash-search">
          <Search size={13} strokeWidth={1.75} />
          Rechercher…
        </span>
        <div className="showcase-dash-filters">
          {["Tous", "Services", "Produits"].map((f, i) => (
            <span
              key={f}
              className={`showcase-dash-filter${i === 0 ? " showcase-dash-filter-active" : ""}`}
            >
              {f}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="showcase-dash-table-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, ...enter }}
      >
        <table className="showcase-dash-table showcase-dash-table-catalogue">
          <thead>
            <tr>
              <th>Offre</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <motion.tr
                key={p.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * stagger, duration: 0.55, ease }}
              >
                <td>
                  <div className="showcase-dash-product-row">
                    <div className="showcase-dash-product-thumb">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <span className="showcase-dash-product-row-name">{p.name}</span>
                  </div>
                </td>
                <td>{p.category}</td>
                <td className="showcase-dash-total">{p.price}</td>
                <td>
                  <span className={`showcase-dash-status showcase-dash-status-${p.statusKey}`}>
                    {p.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function FacturationUi() {
  const invoices = [
    {
      number: "2026-0042",
      client: "Studio Lumière SA",
      total: "1 550 CHF",
      status: "Payée",
      statusKey: "paid",
    },
    {
      number: "2026-0041",
      client: "Martin Dupont",
      total: "890 CHF",
      status: "Envoyée",
      statusKey: "sent",
    },
    {
      number: "2026-0040",
      client: "Atelier Vert",
      total: "420 CHF",
      status: "Brouillon",
      statusKey: "draft",
    },
  ];

  return (
    <div className="showcase-dash-panel">
      <DashHeader
        eyebrow="Factures"
        title="Devis & factures"
        action={
          <span className="showcase-dash-btn showcase-dash-btn-primary">
            <FileText size={12} strokeWidth={2} />
            Nouveau
          </span>
        }
      />

      <div className="showcase-dash-summary">
        {[
          { label: "En attente", value: "2 310 CHF", count: "2 docs" },
          { label: "Encaissé ce mois", value: "8 150 CHF", count: "6 docs" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="showcase-dash-summary-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * stagger, ...enter }}
          >
            <span className="showcase-dash-summary-label">{s.label}</span>
            <span className="showcase-dash-summary-value">{s.value}</span>
            <span className="showcase-dash-summary-count">{s.count}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="showcase-dash-table-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, ...enter }}
      >
        <table className="showcase-dash-table">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <motion.tr
                key={inv.number}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * stagger, duration: 0.55, ease }}
              >
                <td className="showcase-dash-mono">{inv.number}</td>
                <td>{inv.client}</td>
                <td className="showcase-dash-total">{inv.total}</td>
                <td>
                  <span className={`showcase-dash-status showcase-dash-status-${inv.statusKey}`}>
                    {inv.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function RdvUi() {
  const days = [
    { label: "Lun", num: "11", active: false },
    { label: "Mar", num: "12", active: false },
    { label: "Mer", num: "13", active: false },
    { label: "Jeu", num: "14", active: true },
    { label: "Ven", num: "15", active: false },
  ];

  const appointments = [
    { time: "09:00", client: "Sophie M.", service: "Consultation", status: "Confirmé" },
    { time: "10:30", client: "Thomas R.", service: "Suivi", status: "Confirmé" },
    { time: "14:00", client: "Claire B.", service: "Première visite", status: "En attente" },
    { time: "16:30", client: "Marc L.", service: "Devis", status: "Confirmé" },
  ];

  return (
    <div className="showcase-dash-panel">
      <DashHeader
        eyebrow="Rendez-vous"
        title="Agenda"
        action={
          <span className="showcase-dash-btn">
            <Calendar size={12} strokeWidth={2} />
            Semaine
          </span>
        }
      />

      <motion.div
        className="showcase-dash-week"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, ...enter }}
      >
        {days.map((d, i) => (
          <motion.span
            key={d.num}
            className={`showcase-dash-day${d.active ? " showcase-dash-day-active" : ""}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease }}
          >
            <span className="showcase-dash-day-label">{d.label}</span>
            <span className="showcase-dash-day-num">{d.num}</span>
          </motion.span>
        ))}
      </motion.div>

      <div className="showcase-dash-appointments">
        {appointments.map((appt, i) => (
          <motion.div
            key={appt.time}
            className={`showcase-dash-appt${appt.status === "En attente" ? " showcase-dash-appt-pending" : ""}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * stagger, duration: 0.55, ease }}
          >
            <span className="showcase-dash-appt-time">{appt.time}</span>
            <div className="showcase-dash-appt-body">
              <span className="showcase-dash-appt-client">{appt.client}</span>
              <span className="showcase-dash-appt-service">{appt.service}</span>
            </div>
            <span
              className={`showcase-dash-appt-status${appt.status === "Confirmé" ? " showcase-dash-appt-status-ok" : ""}`}
            >
              {appt.status}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="showcase-dash-rdv-footer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, ...enter }}
      >
        <span className="showcase-dash-rdv-check">✓</span>
        Confirmation automatique envoyée au client
      </motion.div>
    </div>
  );
}

function SceneUi({ sceneId }: { sceneId: string }) {
  switch (sceneId) {
    case "vitrine":
      return <VitrineUi />;
    case "analytics":
      return <AnalyticsUi />;
    case "catalogue":
      return <CatalogueUi />;
    case "facturation":
      return <FacturationUi />;
    case "rdv":
      return <RdvUi />;
    default:
      return null;
  }
}

export function ProductShowcase() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = SCENES[sceneIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % SCENES.length);
    }, SCENE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="modules" className="showcase-section">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-28 sm:py-40">
        <MotionDiv className="max-w-2xl">
          <h2 className="t-display text-[clamp(2rem,5vw,3.25rem)] text-white">
            Modules à la carte
            <span className="text-red">.</span>
          </h2>
          <p className="t-body-on-dark mt-6 max-w-lg">
            Le site que vos clients voient, plus les outils qui tournent
            derrière. Chaque module répond à un besoin concret de votre
            activité.
          </p>
        </MotionDiv>

        <div className="showcase-layout mt-16 sm:mt-20">
          <div className="showcase-nav-col">
            <div className="showcase-scene-nav" role="tablist" aria-label="Modules">
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === sceneIndex}
                  className={`showcase-scene-tab${i === sceneIndex ? " showcase-scene-tab-active" : ""}`}
                  onClick={() => setSceneIndex(i)}
                >
                  {i === sceneIndex && (
                    <motion.span
                      layoutId="showcase-tab-indicator"
                      className="showcase-scene-tab-indicator"
                      transition={{ duration: 0.4, ease }}
                    />
                  )}
                  <span className="showcase-scene-tab-module">{s.module}</span>
                </button>
              ))}
            </div>
          </div>

          <MotionDiv delay={0.1} className="showcase-visual-wrap">
            <AnimatePresence mode="wait">
              <motion.h3
                key={scene.title}
                className="showcase-scene-headline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease }}
              >
                {scene.title}
              </motion.h3>
            </AnimatePresence>

            <div className="showcase-dash-window">
              <div className="showcase-dash-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scene.id}
                    className="showcase-dash-scene"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <SceneUi sceneId={scene.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
