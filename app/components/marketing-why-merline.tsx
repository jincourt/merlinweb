"use client";

import { ArrowRight, Star } from "lucide-react";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const WHY_MERLIN_POINTS = [
  {
    n: "01",
    value: "CHF 10k+",
    label: "Agences classiques",
    insight: "Devis à cinq chiffres pour un site vitrine standard.",
  },
  {
    n: "02",
    value: "0 CHF",
    label: "Offre de lancement",
    insight:
      "Un site sur mesure accessible, sans payer le prix d'une grande agence.",
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

export function MarketingWhyMerline() {
  return (
    <section id="pourquoi" className="why-merlin-section">
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
              4.8/5
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
              Les grandes agences facturent des montants élevés. Les outils
              «&nbsp;faciles&nbsp;» produisent des sites interchangeables. Merlin
              se situe entre les deux&nbsp;: sur mesure, accessible, exigeant —
              avec un accompagnement humain du début à la mise en ligne.
            </p>
            <a href="#devis" className="btn-primary mt-8">
              Réserver ma place
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </a>
          </MotionDiv>

          <MotionStagger className="why-merlin-points" stagger={0.08} delay={0.06}>
            {WHY_MERLIN_POINTS.map((point) => (
              <MotionItem key={point.n} soft>
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
        </div>
      </div>
    </section>
  );
}
