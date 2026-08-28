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
    insight: "Avant de vous appeler, vos prospects tapent votre métier sur Google.",
  },
  {
    value: 88,
    suffix: "%",
    label: "Consultent les avis",
    insight: "La note et les témoignages pèsent autant qu'une recommandation.",
  },
  {
    value: 53,
    suffix: "%",
    label: "Jugent sur le design",
    insight: "Un site daté ou absent inspire peu confiance.",
  },
  {
    value: 46,
    suffix: "%",
    label: "Quittent un site lent",
    insight: "Chaque seconde de chargement coûte des contacts.",
  },
];

export function MarketingKeypoints() {
  return (
    <section id="enjeux" className="keypoints-section">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-28 sm:py-40">
        <MotionDiv className="max-w-2xl">
          <h2 className="t-display text-[clamp(2rem,5vw,3.25rem)] text-black">
            Vos clients cherchent
            <br />
            avant d&apos;appeler
            <span className="text-red">.</span>
          </h2>
          <p className="t-body mt-6 max-w-lg">
            Avant de vous contacter, ils comparent sur Google. Un site clair et
            crédible fait la différence — surtout face à la concurrence locale.
          </p>
        </MotionDiv>

        <KeypointGrid points={KEYPOINTS} className="mt-16 sm:mt-20" />
      </div>
    </section>
  );
}
