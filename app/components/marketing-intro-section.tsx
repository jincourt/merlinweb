"use client";

import { useIntlayer } from "next-intlayer";
import { HeroGeometry } from "./hero-geometry";
import { MarketingDitherPanel } from "./marketing-dither-panel";
import { MotionDiv } from "./motion";

export function MarketingIntroSection() {
  const content = useIntlayer("home");

  return (
    <section className="relative overflow-hidden bg-red text-white">
      <HeroGeometry />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 pt-12 sm:pt-16 pb-0">
        <div className="grid grid-cols-1 items-end lg:grid-cols-2">
          <div className="flex items-end pb-8 sm:pb-10">
            <MotionDiv className="max-w-3xl">
              <p className="t-hero-sub mb-3 text-[clamp(0.875rem,2vw,1.125rem)] !text-white/70">
                {content.since2025}
              </p>
              <h2 className="t-hero text-[clamp(1.25rem,3vw,1.875rem)] leading-[1.05] text-white">
                {content.clientsCount}
                <br />
                {content.clientsTrust}
              </h2>
            </MotionDiv>
          </div>
          <div className="relative flex w-full items-end justify-center">
            <MarketingDitherPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
