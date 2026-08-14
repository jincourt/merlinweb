import { MerlinLogo } from "./ui";
import { StoryGeometry } from "./story-geometry";
import {
  BASE_OFFER,
  BASE_OFFER_ORIGINAL_PRICE,
  CATEGORY_META,
  formatChf,
  PROMO_SPOTS_LEFT,
  PROMO_SPOTS_TOTAL,
} from "@/lib/options";
import { Mail, Phone } from "lucide-react";

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

/** Marges safe zone — évite le recouvrement UI Instagram / TikTok / Meta Ads */
export const STORY_PAD_X = 72;
export const STORY_SAFE_TOP = 280;
export const STORY_SAFE_BOTTOM = 340;

const storySafePadding = {
  paddingTop: STORY_SAFE_TOP,
  paddingBottom: STORY_SAFE_BOTTOM,
  paddingLeft: STORY_PAD_X,
  paddingRight: STORY_PAD_X,
} as const;

function StorySafeArea({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative z-10 flex min-h-0 flex-1 flex-col ${className}`} style={storySafePadding}>
      {children}
    </div>
  );
}

const SPECS = [
  { key: "Prestation", val: "Site one-page personnalisé" },
  { key: "Réalisation", val: "Équipe professionnelle" },
  { key: "Délai", val: "7 jours ouvrables" },
  { key: "Suivi", val: "Inclus" },
  { key: "Tarif", promo: true },
  { key: "Disponibilité", val: "Offre limitée" },
];

const MODULES = [
  { n: "01", ...CATEGORY_META.site },
  { n: "02", ...CATEGORY_META.marketing },
  { n: "03", ...CATEGORY_META.identite },
];

function StoryPriceHero({ onDark = false }: { onDark?: boolean }) {
  const original = formatChf(BASE_OFFER_ORIGINAL_PRICE).replace(" CHF", "");
  const promo = formatChf(BASE_OFFER.price).replace(" CHF", "");

  return (
    <div className={onDark ? "mt-10" : "mt-8"}>
      <p
        className={`story-font-mono text-[28px] uppercase tracking-[0.14em] ${
          onDark ? "text-white/55" : "text-black/45"
        }`}
      >
        Au lieu de{" "}
        <span className={onDark ? "text-white/40 line-through" : "text-black/35 line-through"}>
          {original} CHF
        </span>
      </p>
      <p
        className={`mt-3 story-font-display text-[156px] leading-none ${
          onDark ? "text-white" : "text-red"
        }`}
      >
        {promo}
        <span
          className={`ml-4 align-middle story-font-mono text-[36px] ${
            onDark ? "text-white/50" : "text-muted"
          }`}
        >
          CHF
        </span>
      </p>
    </div>
  );
}

function StoryPriceSpec() {
  const original = formatChf(BASE_OFFER_ORIGINAL_PRICE);
  const promo = formatChf(BASE_OFFER.price);

  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 text-[32px] font-medium">
      <span className="text-muted opacity-60 line-through">{original}</span>
      <span className="text-black/30" aria-hidden="true">
        →
      </span>
      <span className="text-red">{promo}</span>
    </span>
  );
}

/** Story 1 — Hero offre rouge */
export function StoryOfferHero() {
  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-red text-white">
      <StoryGeometry variant="on-dark" />
      <StorySafeArea>
        <MerlinLogo className="h-[80px] w-[80px]" red={false} />
        <span className="mt-8 story-font-mono text-[28px] uppercase tracking-[0.08em] text-white/85">
          Offre promotionnelle
        </span>
        <h1 className="story-font-display mt-6 max-w-[900px] text-[80px] text-white">
          Un site professionnel,
          <br />
          livré en 7 jours
        </h1>
        <p className="mt-8 max-w-[820px] text-[34px] leading-[1.5] text-white/60">
          Offre limitée à 0 CHF pour les premiers clients. Pas de template — chaque site est conçu
          sur mesure par notre équipe.
        </p>
        <StoryPriceHero onDark />
        <div className="mt-auto flex flex-col gap-4 pt-10">
          <span className="inline-flex items-center gap-4 rounded-full border border-white/45 px-10 py-5 story-font-mono text-[24px] uppercase tracking-[0.06em] text-white">
            <Phone size={26} strokeWidth={2} aria-hidden />
            078 604 15 44
          </span>
          <span className="inline-flex items-center gap-4 rounded-full border border-white/45 px-10 py-5 story-font-mono text-[24px] uppercase tracking-[0.06em] text-white">
            <Mail size={26} strokeWidth={2} aria-hidden />
            merlineapp@gmail.com
          </span>
        </div>
      </StorySafeArea>
    </div>
  );
}

/** Story 2 — Fiche offre blanche */
export function StoryOfferSpecs() {
  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-white">
      <StoryGeometry variant="on-light" />
      <div
        className="relative overflow-hidden bg-red text-white"
        style={{
          paddingTop: STORY_SAFE_TOP,
          paddingLeft: STORY_PAD_X,
          paddingRight: STORY_PAD_X,
          paddingBottom: 56,
        }}
      >
        <StoryGeometry variant="on-dark" />
        <div className="relative z-10">
          <MerlinLogo className="h-[68px] w-[68px]" red={false} />
          <p className="mt-6 story-font-mono text-[24px] uppercase tracking-[0.08em] text-white/70">
            Série CH · 2026
          </p>
          <h2 className="story-font-display mt-4 text-[64px]">Votre site sur mesure</h2>
        </div>
      </div>

      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col text-black"
        style={{
          paddingLeft: STORY_PAD_X,
          paddingRight: STORY_PAD_X,
          paddingBottom: STORY_SAFE_BOTTOM,
        }}
      >
        <StoryPriceHero />

        <div className="mt-8 min-h-0 flex-1">
          {SPECS.map((s) => (
            <div
              key={s.key}
              className="grid grid-cols-[280px_1fr] items-baseline gap-6 border-b border-black/8 py-7 last:border-b-0"
            >
              <span className="story-font-mono text-[24px] uppercase tracking-[0.04em] text-muted">
                {s.key}
              </span>
              <span className="text-[30px] font-medium text-black">
                {"promo" in s && s.promo ? <StoryPriceSpec /> : s.val}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-auto pt-6 story-font-mono text-[22px] uppercase tracking-[0.06em] text-muted">
          merline.ch · Devis en ligne
        </p>
      </div>
    </div>
  );
}

/** Story 3 — Modules & urgence */
export function StoryModulesUrgency() {
  const progress = (PROMO_SPOTS_LEFT / PROMO_SPOTS_TOTAL) * 100;

  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-gray-dark text-white">
      <StoryGeometry variant="on-dark" />
      <StorySafeArea>
        <MerlinLogo className="h-[72px] w-[72px]" red={false} />
        <span className="mt-8 story-font-mono text-[26px] uppercase tracking-[0.08em] text-white/55">
          Modules
        </span>
        <h2 className="story-font-display mt-6 text-[72px] text-white">
          Trois catégories,
          <br />
          à la carte
        </h2>
        <p className="mt-6 max-w-[860px] text-[30px] leading-[1.55] text-white/45">
          Site de base offert à 0 CHF. Ajoutez les fonctionnalités dont vous avez besoin — devis
          transparent, envoi direct à notre équipe.
        </p>

        <div className="mt-10 space-y-0 border-t border-white/12">
          {MODULES.map((step) => (
            <div
              key={step.n}
              className="border-b border-white/12 py-8 last:border-b-0"
            >
              <span className="story-font-mono text-[40px] tracking-tight text-white/10">
                {step.n}
              </span>
              <h3 className="mt-2 text-[34px] font-medium text-white">{step.label}</h3>
              <p className="mt-2 text-[24px] leading-relaxed text-white/45">{step.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-10">
          <div className="flex items-center justify-between gap-6">
            <span className="story-font-mono text-[24px] uppercase tracking-[0.04em] text-white/55">
              Places disponibles
            </span>
            <span className="story-font-mono text-[24px] text-white">
              {PROMO_SPOTS_LEFT}/{PROMO_SPOTS_TOTAL} restantes
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-red" style={{ width: `${progress}%` }} />
          </div>
          <span className="mt-8 inline-flex rounded-full bg-white px-12 py-6 story-font-mono text-[26px] uppercase tracking-[0.06em] text-black">
            Demandez votre devis
          </span>
        </div>
      </StorySafeArea>
    </div>
  );
}

export const MARKETING_STORIES = [
  {
    id: "offre-hero",
    filename: "merlin-story-offre-hero.png",
    title: "Offre hero",
    subtitle: "Accroche promotionnelle — fond rouge",
    Component: StoryOfferHero,
  },
  {
    id: "offre-specs",
    filename: "merlin-story-fiche-offre.png",
    title: "Fiche offre",
    subtitle: "Détails & tarif — carte blanche",
    Component: StoryOfferSpecs,
  },
  {
    id: "modules-urgence",
    filename: "merlin-story-modules.png",
    title: "Modules & urgence",
    subtitle: "Catalogue & places limitées",
    Component: StoryModulesUrgency,
  },
] as const;
