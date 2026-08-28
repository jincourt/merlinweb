import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { MarketingHero } from "../components/marketing-hero";
import { MotionDiv } from "../components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getIntlayer("metadata", locale);

  return {
    title: meta.servicesTitle,
    description: meta.servicesDescription,
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const content = getIntlayer("services", locale);
  const site = getIntlayer("site", locale);

  const services = [
    { title: content.siteWebTitle, detail: content.siteWebDetail },
    { title: content.marketingTitle, detail: content.marketingDetail },
    { title: content.identiteTitle, detail: content.identiteDetail },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <MarketingHero
          title={
            <>
              {content.title}
              <span className="text-black/40">.</span>
            </>
          }
          subtitle={content.subtitle}
        />

        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
            <ul className="space-y-14 sm:space-y-20">
              {services.map((service, index) => (
                <MotionDiv key={service.title} delay={index * 0.06}>
                  <li>
                    <h2 className="t-hero text-[clamp(2rem,5vw,3.75rem)] text-black">
                      {service.title}
                    </h2>
                    <p className="t-hero-sub mt-4 max-w-md text-black/45">
                      {service.detail}
                    </p>
                  </li>
                </MotionDiv>
              ))}
            </ul>

            <MotionDiv delay={0.2} className="mt-20 sm:mt-28">
              <Link href="/#contact" className="btn-primary">
                {site.discuss}
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </Link>
            </MotionDiv>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
