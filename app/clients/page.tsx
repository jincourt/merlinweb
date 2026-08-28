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
    title: meta.clientsTitle,
    description: meta.clientsDescription,
  };
}

export default async function ClientsPage() {
  const locale = await getLocale();
  const content = getIntlayer("clients", locale);
  const site = getIntlayer("site", locale);

  const clients = [
    { name: "Nicolas", activity: content.nicolasActivity },
    { name: "Atelier Lumière", activity: content.atelierLumiereActivity },
    { name: "Studio Vert", activity: content.studioVertActivity },
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
              {clients.map((client, index) => (
                <MotionDiv key={client.name} delay={index * 0.06}>
                  <li>
                    <h2 className="t-hero text-[clamp(2rem,5vw,3.75rem)] text-black">
                      {client.name}
                    </h2>
                    <p className="t-hero-sub mt-3 text-black/45">{client.activity}</p>
                  </li>
                </MotionDiv>
              ))}
            </ul>

            <MotionDiv delay={0.2} className="mt-20 sm:mt-28">
              <Link href="/#contact" className="btn-primary">
                {site.yourProject}
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
