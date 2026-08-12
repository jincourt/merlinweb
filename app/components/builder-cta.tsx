import { ArrowUpRight } from "lucide-react";
import { MotionDiv } from "./motion";

export function BuilderCta() {
  return (
    <section className="bg-gray-dark text-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <MotionDiv className="flex flex-col">
          <span className="t-mono-on-dark block !text-[1rem] !text-white/70">
            Nos autres produits
          </span>

          <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-white max-w-3xl">
            Créez votre boutique
            <br />
            sans écrire une ligne de code
          </h2>

          <p className="t-body-on-dark mt-6 w-full sm:columns-2 sm:gap-10">
            Utilisez notre builder no-code pour lancer votre site e-commerce
            en quelques minutes — produits, pages et paiements inclus.
          </p>

          <div className="relative mt-10 sm:mt-12 w-full">
            <a
              href="https://www.merline.app/sell?locale=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-indigo absolute top-4 right-4 sm:top-6 sm:right-6 z-10"
            >
              Découvrir merline.app
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </a>

            <a
              href="https://www.merline.app/sell?locale=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--border-on-dark)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_32px_70px_-28px_rgba(0,0,0,0.65)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 sm:h-56 bg-gradient-to-b from-black via-black/67 to-transparent"
                aria-hidden="true"
              />
              <img
                src="/merline/merlineapp.png"
                alt="Interface Merlin App — builder no-code"
                className="relative w-full transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
