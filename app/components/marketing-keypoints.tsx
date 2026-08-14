"use client";

import { MotionDiv } from "./motion";
import {
  KeypointGrid,
  type MarketingKeypoint,
} from "./marketing-keypoint-cards";

const KEYPOINTS: MarketingKeypoint[] = [
  {
    value: 97,
    suffix: "%",
    label: "Cherchent en ligne",
    insight:
      "Avant de vous appeler, vos prospects tapent votre métier sur Google ou Maps.",
    source: "Think with Google · Insights consommateurs, 2024",
  },
  {
    value: 88,
    suffix: "%",
    label: "Consultent les avis",
    insight:
      "La note et les témoignages en ligne pèsent autant qu'une recommandation.",
    source: "BrightLocal · Enquête avis consommateurs locaux, 2024",
  },
  {
    value: 53,
    suffix: "%",
    label: "Jugent sur le design",
    insight:
      "Un site daté ou absent = entreprise peu fiable aux yeux du visiteur.",
    source: "Stanford · Recherche crédibilité web (étude de référence)",
  },
  {
    value: 46,
    suffix: "%",
    label: "Quittent un site lent",
    insight:
      "Chaque seconde de chargement coûte des contacts — surtout sur mobile.",
    source: "Google · Core Web Vitals (Think with Google)",
  },
];

export function MarketingKeypoints() {
  return (
    <section id="enjeux" className="keypoints-section">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <MotionDiv>
          <span className="t-mono block !text-[1rem] !text-black/70">
            Le coût de l&apos;invisibilité
          </span>
          <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-black max-w-2xl">
            Chaque jour sans site,
            <br />
            une opportunité s&apos;éteint
            <span className="text-red">.</span>
          </h2>
        </MotionDiv>

        <KeypointGrid points={KEYPOINTS} className="mt-14 sm:mt-16" />
      </div>
    </section>
  );
}
