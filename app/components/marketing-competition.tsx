"use client";

import { HeroGeometry } from "./hero-geometry";
import { MotionDiv } from "./motion";
import {
  KeypointGrid,
  type MarketingKeypoint,
} from "./marketing-keypoint-cards";

const COMPETITION_KEYPOINTS: MarketingKeypoint[] = [
  {
    value: 76,
    suffix: "%",
    label: "Visitent le site d'un concurrent",
    insight:
      "Avant de vous contacter, ils comparent plusieurs prestataires en ligne.",
    source: "BrightLocal · Enquête avis consommateurs locaux, 2024",
  },
  {
    displayText: "3",
    suffix: " sur 4",
    label: "Clics sur le top 3 Google",
    insight:
      "Les trois premiers résultats locaux captent l'essentiel des appels et demandes.",
    source: "Backlinko · Étude SERP locale (agrégat sectoriel)",
  },
  {
    value: 3,
    suffix: " sec",
    label: "Pour vous juger",
    insight:
      "Un site faible ou absent, et c'est votre concurrent qui paraît professionnel.",
    source: "Google Research · Premières impressions web",
  },
  {
    value: 2500,
    prefix: "≈ CHF ",
    suffix: "",
    formatLocale: true,
    label: "Non convertis par mois",
    insight:
      "Estimation pour 2–3 demandes locales perdues × panier moyen artisan PME romande.",
    source: "Estimation Merlin · panier moyen ≈ 800.- CHF / demande",
  },
];

export function MarketingCompetition() {
  return (
    <section
      id="concurrence"
      className="relative overflow-hidden bg-red text-white"
    >
      <HeroGeometry />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <MotionDiv>
          <span className="t-mono-on-dark block !text-[1rem] !text-white/70">
            Votre concurrence
          </span>
          <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-white max-w-2xl">
            Pendant que vous hésitez,
            <br />
            ils récupèrent vos clients
            <span className="text-white/40">.</span>
          </h2>
          <p className="t-body-on-dark mt-6 max-w-xl">
            Vos concurrents locaux ne dorment pas. Ils apparaissent sur Google,
            rassurent en deux clics et transforment des visiteurs en appels.
            Sans présence en ligne crédible, ce sont eux qui remportent la
            demande — pas vous.
          </p>
        </MotionDiv>

        <KeypointGrid
          points={COMPETITION_KEYPOINTS}
          variant="red"
          className="mt-14 sm:mt-16"
        />
      </div>
    </section>
  );
}
