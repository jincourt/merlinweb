import { getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { MarketingContactSection } from "./components/marketing-contact-section";
import { MarketingHero } from "./components/marketing-hero";
import { MarketingIntroSection } from "./components/marketing-intro-section";
import { MarketingProjectsSection } from "./components/marketing-projects-section";
import { MarketingSubscriptionsSection } from "./components/marketing-subscriptions-section";

export default async function Home() {
  const locale = await getLocale();
  const home = getIntlayer("home", locale);

  return (
    <>
      <SiteHeader />
      <main>
        <MarketingHero
          id="offre"
          tone="black"
          title={<>{home.heroTitle}</>}
        />

        <MarketingIntroSection />

        <MarketingProjectsSection />

        <MarketingSubscriptionsSection />

        <MarketingContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
