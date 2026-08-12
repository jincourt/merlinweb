"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MotionDiv } from "./motion";

const SLIDES = [
  {
    id: "merline",
    title: ["Créez votre boutique", "sans écrire une ligne de code"],
    description:
      "Utilisez notre builder no-code pour lancer votre site e-commerce en quelques minutes — produits, pages et paiements inclus.",
    image: "/merline/merlineapp.png",
    imageAlt: "Interface Merline — builder no-code",
    href: "https://www.merline.app/sell?locale=fr",
    buttonLabel: "Découvrir merline.app",
    buttonClass: "btn-indigo",
  },
  {
    id: "initer",
    title: [
      "Organisez vos rendez-vous,",
      "affichez vos services facilement,",
      "soyez visible sur la map",
    ],
    description:
      "Initer réunit professionnels, artistes, événements et lieux sur une carte interactive — publiez vos services, gérez vos créneaux et soyez visible localement.",
    image: "/initer/initer.png",
    imageAlt: "Interface Initer — visibilité locale sur la map",
    href: "https://initer.io",
    buttonLabel: "Découvrir Initer.io",
    buttonClass: "btn-green",
  },
] as const;

export function BuilderCta() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const total = SLIDES.length;

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="bg-gray-dark text-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex items-center justify-between gap-4">
          <span className="t-mono-on-dark !text-[1rem] !text-white/70">
            Nos autres produits
          </span>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-on-dark)] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Produit précédent"
            >
              <ChevronLeft size={16} strokeWidth={2} aria-hidden />
            </button>
            <span className="t-mono-on-dark !text-white/85">
              {index + 1}/{total}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-on-dark)] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Produit suivant"
            >
              <ChevronRight size={16} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <MotionDiv key={slide.id} immediate soft className="flex flex-col">
          <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-white max-w-3xl">
            {slide.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="t-body-on-dark mt-6 max-w-2xl">{slide.description}</p>

          <div className="relative mt-10 sm:mt-12 w-full">
            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${slide.buttonClass} absolute top-4 right-4 sm:top-6 sm:right-6 z-10`}
            >
              {slide.buttonLabel}
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </a>

            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--border-on-dark)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_32px_70px_-28px_rgba(0,0,0,0.65)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 sm:h-56 bg-gradient-to-b from-black via-black/67 to-transparent"
                aria-hidden="true"
              />
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="relative w-full transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
