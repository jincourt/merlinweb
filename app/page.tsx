import { HeroGeometry } from "./components/hero-geometry";
import { DevisWizard } from "./components/devis-wizard";
import { MerlinLogo } from "./components/ui";
import { InviteSection } from "./components/invite-section";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { MarketingKeypoints } from "./components/marketing-keypoints";
import { MarketingCompetition } from "./components/marketing-competition";
import { MarketingWhyMerline } from "./components/marketing-why-merline";
import { MarketingModules } from "./components/marketing-modules";
import { ProductShowcase } from "./components/product-showcase";
import { MotionDiv, MotionItem, MotionStagger } from "./components/motion";
import { TiltCard } from "./components/tilt-card";
import { PromoBasePrice } from "./components/promo-base-price";
import { PROMO_SPOTS_LEFT, PROMO_SPOTS_TOTAL } from "@/lib/options";
import { ArrowRight } from "lucide-react";

const SPECS = [
  { key: "Prestation", val: "Site one-page personnalisé" },
  { key: "Équipe", val: "3 personnes · Lausanne, VD" },
  { key: "Délai", val: "7 jours ouvrables" },
  { key: "Suivi", val: "Inclus" },
  { key: "Tarif", promo: true, highlight: true },
  { key: "Hébergement", val: "200.- CHF/an · domaine & SSL" },
  { key: "Disponibilité", val: "Offre limitée" },
];

function OfferPriceCard({ animate = false }: { animate?: boolean }) {
  const specs = (
    <>
      {SPECS.map((s) => (
        <div key={s.key} className="spec-row last:border-b-0">
          <span className="t-mono">{s.key}</span>
          <span
            className={`text-[0.9375rem] font-medium ${s.highlight ? "text-red" : "text-black"}`}
          >
            {"promo" in s && s.promo ? (
              <PromoBasePrice variant="spec" />
            ) : (
              s.val
            )}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <TiltCard className="rounded-2xl bg-white p-8 sm:p-10 text-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
      <div className="flex items-start justify-between">
        <MerlinLogo className="h-8 w-8" />
        <span className="t-mono">Série CH · 2026</span>
      </div>

      <PromoBasePrice variant="hero" />

      {animate ? (
        <MotionStagger className="mt-8" delay={0.1} stagger={0.06}>
          {SPECS.map((s) => (
            <MotionItem key={s.key} soft>
              <div className="spec-row last:border-b-0">
                <span className="t-mono">{s.key}</span>
                <span
                  className={`text-[0.9375rem] font-medium ${s.highlight ? "text-red" : "text-black"}`}
                >
                  {"promo" in s && s.promo ? (
                    <PromoBasePrice variant="spec" />
                  ) : (
                    s.val
                  )}
                </span>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      ) : (
        <div className="mt-8">{specs}</div>
      )}
    </TiltCard>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── HERO — rouge / blanc ── */}
        <section id="offre" className="relative overflow-hidden bg-red text-white">
          <HeroGeometry />
          <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <MotionDiv immediate>
                <MerlinLogo className="h-14 w-14 sm:h-16 sm:w-16" red={false} />
                <span className="t-mono-on-dark mt-6 block !text-white/90">
                  Studio web · Lausanne, VD
                </span>
                <h1 className="t-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-white">
                  Vos clients vous cherchent sur Google.
                  <br />
                  <span className="text-white/75">
                    Aujourd&apos;hui, ils trouvent votre concurrent.
                  </span>
                </h1>
                <p className="t-display mt-6 text-[clamp(1.375rem,3.5vw,2rem)] text-white leading-snug">
                  Dans 7 jours, c&apos;est vous qu&apos;ils appellent
                  <span className="text-white/40">.</span>
                </p>
                <p className="t-body-on-dark mt-6 max-w-md">
                  Site sur mesure offert à{" "}
                  <span className="font-medium text-white">0 CHF</span> pour les
                  premiers clients — pas de template. Seul l&apos;hébergement
                  reste à charge :{" "}
                  <span className="font-medium text-white">200.- CHF/an</span>{" "}
                  (nom de domaine, SSL, serveur).
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#devis" className="btn-white">
                    Réserver ma place
                    <ArrowRight size={14} strokeWidth={2} aria-hidden />
                  </a>
                  <span className="t-mono-on-dark !text-white/50">
                    {PROMO_SPOTS_LEFT} place{PROMO_SPOTS_LEFT > 1 ? "s" : ""}{" "}
                    restante{PROMO_SPOTS_LEFT > 1 ? "s" : ""}
                  </span>
                </div>
              </MotionDiv>

              <div className="sm:hidden">
                <OfferPriceCard />
              </div>
              <MotionDiv delay={0.15} className="hidden sm:block">
                <OfferPriceCard animate />
              </MotionDiv>
            </div>
          </div>
        </section>

        <MarketingKeypoints />

        <MarketingCompetition />

        <ProductShowcase />

        <MarketingWhyMerline />

        <MarketingModules />

        {/* ── DEVIS — blanc / noir ── */}
        <section id="devis" className="bg-white text-black scroll-mt-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
              <MotionDiv>
                <span className="t-mono block !text-[1rem] !text-black/70">
                  Dernière étape
                </span>
                <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2.5rem,6vw,4.5rem)] text-black">
                  Réservez
                  <br />
                  votre place
                  <span className="text-black/40">.</span>
                </h2>
                <p className="t-body mt-6 max-w-sm">
                  Laissez vos coordonnées — nous revenons sous 24h pour valider
                  votre projet. Configurez ensuite les modules dont vous avez
                  besoin.
                </p>
                <div className="mt-6 max-w-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="t-mono !text-black/70">Places disponibles</span>
                    <span className="t-mono !text-black">
                      {PROMO_SPOTS_LEFT}/{PROMO_SPOTS_TOTAL} restantes
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/8"
                    role="progressbar"
                    aria-valuenow={PROMO_SPOTS_LEFT}
                    aria-valuemin={0}
                    aria-valuemax={PROMO_SPOTS_TOTAL}
                    aria-label={`${PROMO_SPOTS_LEFT} places restantes sur ${PROMO_SPOTS_TOTAL}`}
                  >
                    <div
                      className="h-full rounded-full bg-red transition-all"
                      style={{
                        width: `${(PROMO_SPOTS_LEFT / PROMO_SPOTS_TOTAL) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv delay={0.12}>
                <DevisWizard />
              </MotionDiv>
            </div>
          </div>
        </section>
      </main>

      <InviteSection />
      <SiteFooter />
    </>
  );
}
