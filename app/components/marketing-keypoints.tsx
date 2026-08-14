"use client";

import { MotionDiv } from "./motion";
import {
  KeypointGrid,
  type MarketingKeypoint,
} from "./marketing-keypoint-cards";

const KEYPOINTS: MarketingKeypoint[] = [
  {
    value: 80,
    suffix: "%",
    label: "Recherchent en ligne",
    insight: "Sans site, vous n'existez pas sur Google.",
  },
  {
    value: 77,
    suffix: "%",
    label: "Veulent réserver en ligne",
    insight: "Vos clients veulent agir sans passer par le téléphone.",
  },
  {
    value: 56,
    suffix: "%",
    label: "Exigent l'achat en ligne",
    insight: "Catalogue et commande deviennent la norme.",
  },
  {
    value: 51,
    suffix: "%",
    label: "Jugent sur le web",
    insight:
      "La crédibilité d'une entreprise se décide en ligne — souvent avant le premier contact.",
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
