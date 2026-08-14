"use client";

import { ArrowRight, Star } from "lucide-react";
import { PROMO_SPOTS_LEFT } from "@/lib/options";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const WHY_MERLIN_POINTS = [
  {
    n: "01",
    value: "3'500–7'000 CHF",
    label: "Agences suisses",
    insight:
      "Fourchette habituelle pour un site vitrine one-page en Suisse romande — avant options et maintenance.",
  },
  {
    n: "02",
    value: "0 CHF",
    label: "Offre de lancement",
    insight:
      "Site sur mesure offert aux premiers clients. Seul l'hébergement (200.- CHF/an) reste à charge.",
  },
  {
    n: "03",
    value: "Sur mesure",
    label: "L'approche Merlin",
    insight:
      "Personnalisé, professionnel, exigeant — conçu pour vous, pas en série.",
    highlight: true,
  },
];

function ReserveCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`.trim()}>
      <a href="#devis" className="btn-primary">
        Réserver ma place
        <ArrowRight size={14} strokeWidth={2} aria-hidden />
      </a>
      <span className="t-mono !text-black/50">
        {PROMO_SPOTS_LEFT} place{PROMO_SPOTS_LEFT > 1 ? "s" : ""} restante
        {PROMO_SPOTS_LEFT > 1 ? "s" : ""}
      </span>
    </div>
  );
}

export function MarketingWhyMerline() {
  return (
    <section id="pourquoi" className="why-merlin-section scroll-mt-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <MotionDiv>
            <span className="t-mono block !text-[1rem] !text-black/70">
              Pourquoi Merlin
            </span>
            <p className="mt-4 flex items-center gap-1.5 t-mono !text-[0.875rem] !text-black/70">
              <Star
                size={16}
                strokeWidth={0}
                fill="currentColor"
                className="text-red"
                aria-hidden="true"
              />
              4.8/5 · avis clients
            </p>
            <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-black max-w-xl">
              Trop cher,
              <br />
              trop générique,
              <br />
              trop compliqué
              <span className="text-red">.</span>
            </h2>
            <p className="t-body mt-6 max-w-md">
              Entre agences hors de prix et templates interchangeables, Merlin
              allie sur mesure et accessibilité — avec un accompagnement humain
              de A à Z.
            </p>

            <ReserveCta className="mt-8 hidden lg:flex" />
          </MotionDiv>

          <MotionStagger className="why-merlin-points" stagger={0.08} delay={0.06}>
            {WHY_MERLIN_POINTS.map((point) => (
              <MotionItem key={point.n} soft className="flex min-w-0">
                <article
                  className={`why-merlin-point${point.highlight ? " why-merlin-point-highlight" : ""}`}
                >
                  <span className="why-merlin-point-n" aria-hidden>
                    {point.n}
                  </span>
                  <p className="why-merlin-point-value">{point.value}</p>
                  <h3 className="why-merlin-point-label">{point.label}</h3>
                  <p className="why-merlin-point-insight">{point.insight}</p>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>

          <ReserveCta className="mt-0 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
