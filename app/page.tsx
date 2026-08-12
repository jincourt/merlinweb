import { HeroGeometry } from "./components/hero-geometry";
import { QuoteWizard } from "./components/quote-wizard";
import { MerlineLogo } from "./components/ui";
import { SiteFooter } from "./components/site-footer";
import { MotionDiv, MotionItem, MotionStagger } from "./components/motion";
import { TiltCard } from "./components/tilt-card";
import { PROMO_SPOTS_LEFT, PROMO_SPOTS_TOTAL } from "@/lib/options";
import { Mail, Phone } from "lucide-react";

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    desc: "Échange sur votre activité, vos objectifs et votre identité.",
  },
  {
    n: "02",
    title: "Conception",
    desc: "Maquette sur mesure, validée avec vous avant production.",
  },
  {
    n: "03",
    title: "Développement",
    desc: "Site responsive, optimisé et prêt à être mis en ligne.",
  },
  {
    n: "04",
    title: "Livraison",
    desc: "Remise des fichiers et accompagnement pour la mise en ligne.",
  },
];

const SPECS = [
  { key: "Prestation", val: "Site one-page personnalisé" },
  { key: "Réalisation", val: "Équipe professionnelle" },
  { key: "Délai", val: "7 jours ouvrables" },
  { key: "Suivi", val: "Inclus" },
  { key: "Tarif", val: "0.- CHF", highlight: true },
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
            {s.val}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <TiltCard className="rounded-2xl bg-white p-8 sm:p-10 text-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
      <div className="flex items-start justify-between">
        <MerlineLogo className="h-8 w-8" />
        <span className="t-mono">Série CH · 2026</span>
      </div>

      <p className="t-display mt-10 text-[clamp(4rem,14vw,7rem)] text-red leading-none">
        0.-
        <span className="ml-2 t-mono !text-[1rem] align-middle text-muted">
          CHF
        </span>
      </p>

      {animate ? (
        <MotionStagger className="mt-8" delay={0.1} stagger={0.06}>
          {SPECS.map((s) => (
            <MotionItem key={s.key} soft>
              <div className="spec-row last:border-b-0">
                <span className="t-mono">{s.key}</span>
                <span
                  className={`text-[0.9375rem] font-medium ${s.highlight ? "text-red" : "text-black"}`}
                >
                  {s.val}
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
      <main>
        {/* ── OFFRE — rouge / blanc ── */}
        <section id="offre" className="relative overflow-hidden bg-red text-white">
          <HeroGeometry />
          <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <MotionDiv immediate>
                <MerlineLogo className="h-14 w-14 sm:h-16 sm:w-16" red={false} />
                <span className="t-mono-on-dark mt-6 block !text-white/90">
                  Offre promotionnelle
                </span>
                <h2 className="t-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-white">
                  Un site professionnel,
                  <br />
                  livré en 7 jours
                </h2>
                <p className="t-body-on-dark mt-6 max-w-md">
                  Offre limitée à 0 CHF pour les premiers clients.
                  Pas de template — chaque site est conçu sur mesure
                  par notre équipe.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="tel:+41786041544" className="btn-outline-white">
                    <Phone size={14} strokeWidth={2} aria-hidden />
                    0786041544
                  </a>
                  <a href="mailto:merlineapp@gmail.com" className="btn-outline-white">
                    <Mail size={14} strokeWidth={2} aria-hidden />
                    merlineapp@gmail.com
                  </a>
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

        {/* ── DEVIS — blanc / noir ── */}
        <section id="devis" className="bg-white text-black scroll-mt-8">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
              <MotionDiv>
                <span className="t-mono">Configurez votre site</span>
                <h2 className="t-display mt-4 text-[clamp(2.5rem,6vw,4.5rem)] text-black">
                  Choisissez vos
                  <br />
                  modules
                  <span className="text-black/40">.</span>
                </h2>
                <p className="t-body mt-6 max-w-sm">
                  Site de base offert à 0 CHF. Ajoutez les fonctionnalités
                  dont vous avez besoin — devis transparent, envoi direct
                  à notre équipe.
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
                <QuoteWizard />
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* ── PROCESSUS — gris foncé / blanc ── */}
        <section id="processus" className="bg-gray-dark text-white">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-20 sm:pt-28 pb-6 sm:pb-8">
            <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="t-mono-on-dark">Méthode</span>
                <h2 className="t-display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-white">
                  De l&apos;idée au site,
                  <br />
                  en une semaine
                </h2>
              </div>
              <span className="t-mono-on-dark">04 étapes</span>
            </MotionDiv>

            <MotionStagger
              className="rule-on-dark mt-14 grid sm:grid-cols-2 lg:grid-cols-4"
              delay={0.08}
              stagger={0.1}
            >
              {PROCESS.map((step) => (
                <MotionItem key={step.n}>
                  <div className="border-b border-[var(--border-on-dark)] py-8 sm:py-10 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8 lg:first:pl-0">
                    <span className="t-mono-on-dark !text-[2rem] !tracking-tight !text-white/10">
                      {step.n}
                    </span>
                    <h3 className="mt-4 text-[0.9375rem] font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/45 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
