"use client";

import { useIntlayer } from "next-intlayer";
import type { OptionCategory } from "@/lib/options";
import { useLocalizedOptions } from "@/lib/use-localized-options";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const SUBSCRIPTION_PRICES: Record<OptionCategory, "priceSite" | "priceMarketing" | "priceCustom"> = {
  site: "priceSite",
  marketing: "priceMarketing",
  identite: "priceCustom",
};

const SUBSCRIPTION_DETAILS: Record<
  OptionCategory,
  "subscriptionSiteDetail" | "subscriptionMarketingDetail" | "subscriptionIdentiteDetail"
> = {
  site: "subscriptionSiteDetail",
  marketing: "subscriptionMarketingDetail",
  identite: "subscriptionIdentiteDetail",
};

const SUBSCRIPTION_CATEGORIES: OptionCategory[] = ["site", "marketing", "identite"];

export function MarketingSubscriptionsSection() {
  const content = useIntlayer("home");
  const { categoryMeta } = useLocalizedOptions();

  return (
    <section className="border-t border-[var(--border-on-dark)] bg-gray-dark text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <MotionDiv>
          <h2 className="t-hero text-[clamp(1.875rem,5vw,3.5rem)] text-white">
            {content.subscriptionsTitle}
            <span className="text-white/40">.</span>
          </h2>
        </MotionDiv>

        <MotionStagger
          className="mt-12 grid gap-px bg-white/12 sm:mt-16 sm:grid-cols-3"
          stagger={0.08}
        >
          {SUBSCRIPTION_CATEGORIES.map((category) => {
            const meta = categoryMeta[category];
            const detailKey = SUBSCRIPTION_DETAILS[category];
            const priceKey = SUBSCRIPTION_PRICES[category];

            return (
              <MotionItem key={category}>
                <div className="flex min-h-[9rem] flex-col justify-end bg-gray-dark p-5 sm:min-h-[10rem] sm:p-6">
                  <p className="t-mono !text-[0.6875rem] !text-white/55">
                    {meta.label}
                  </p>
                  <p className="t-hero-sub mt-2 line-clamp-2 text-[clamp(0.8125rem,1.6vw,0.9375rem)] !text-white/40">
                    {content[detailKey]}
                  </p>
                  <p className="t-hero mt-4 text-[clamp(1.125rem,2.5vw,1.625rem)] leading-[1.1] text-white">
                    {content[priceKey]}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
