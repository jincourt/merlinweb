import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CATEGORY_META,
  formatCategoryPriceRange,
  type OptionCategory,
} from "@/lib/options";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const MODULE_CARDS: {
  n: string;
  category: OptionCategory;
  pitch: string;
  note?: string;
}[] = [
  {
    n: "01",
    category: "site",
    pitch:
      "Vos clients vous écrivent, réservent et paient — sans que vous jongliez entre dix outils.",
    note: "+ 200.- CHF/an · domaine et hébergement",
  },
  {
    n: "02",
    category: "marketing",
    pitch:
      "Quelqu'un cherche votre métier sur Google ? C'est vous qu'il voit — avec vos avis et votre numéro.",
  },
  {
    n: "03",
    category: "identite",
    pitch:
      "Logo, couleurs, cartes de visite. Une image. Partout où vos clients vous regardent.",
  },
];

export function MarketingModules() {
  return (
    <section id="processus" className="modules-section scroll-mt-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="modules-section-head">
          <MotionDiv>
            <span className="t-mono-on-dark block !text-[1rem] !text-white/70">
              Clarté
            </span>
            <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-white max-w-xl">
              Trois modules.

            </h2>
            <p className="t-body-on-dark mt-6 max-w-lg">
              Le site de base est offert à 0 CHF. Ensuite, vous ajoutez ce qui
              compte vraiment pour vous — les prix viennent après, en toute
              transparence.
            </p>
          </MotionDiv>
        </div>

        <MotionStagger className="modules-grid mt-14 sm:mt-16" delay={0.08} stagger={0.1}>
          {MODULE_CARDS.map((card) => {
            const meta = CATEGORY_META[card.category];
            const priceRange = formatCategoryPriceRange(card.category);

            return (
              <MotionItem key={card.n} soft className="flex min-w-0">
                <article className="module-card">
                  <div className="module-card-top">
                    <span className="module-card-n" aria-hidden>
                      {card.n}
                    </span>
                    <h3 className="module-card-title">{meta.label}</h3>
                  </div>

                  <p className="module-card-pitch">{card.pitch}</p>

                  {priceRange ? (
                    <p className="module-card-price">{priceRange}</p>
                  ) : null}

                  {card.note ? (
                    <p className="module-card-note">{card.note}</p>
                  ) : null}

                  <Link
                    href={`/options/${meta.slug}`}
                    className="module-card-link"
                  >
                    Voir les options
                    <ArrowRight size={13} strokeWidth={2} aria-hidden />
                  </Link>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
