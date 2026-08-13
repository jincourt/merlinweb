import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CATEGORY_META,
  type CategoryMeta,
  getOptionsForCategory,
} from "@/lib/options";
import { getOptionPageContent } from "@/lib/option-page-content";
import { MerlinLogo } from "./ui";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";
import { SiteFooter } from "./site-footer";

type Props = {
  category: CategoryMeta["id"];
};

export function OptionCategoryPage({ category }: Props) {
  const meta = CATEGORY_META[category];
  const options = getOptionsForCategory(category);
  const otherCategories = Object.values(CATEGORY_META).filter(
    (c) => c.id !== category,
  );

  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-red text-white">
          <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-24">
            <MotionDiv immediate>
              <Link
                href="/#processus"
                className="btn-outline-white !text-[0.625rem] !py-3 !px-4"
              >
                <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                Retour
              </Link>
              <div className="mt-10 flex items-center gap-3">
                <MerlinLogo className="h-10 w-10" red={false} />
                <span className="t-mono-on-dark !text-white/85">Modules</span>
              </div>
              <h1 className="t-display mt-6 text-[clamp(2rem,5vw,3.5rem)] text-white">
                {meta.label}
              </h1>
              <p className="t-body-on-dark mt-6 max-w-2xl">{meta.intro}</p>
              <Link href="/#devis" className="btn-white mt-8">
                Configurer mon devis
              </Link>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <MotionStagger className="space-y-0" delay={0.05} stagger={0.06}>
              {options.map((option) => {
                const content = getOptionPageContent(option.id);

                return (
                  <MotionItem key={option.id}>
                    <article className="border-b border-[var(--border)] py-12 first:pt-0 last:border-b-0">
                      <h2 className="text-[1.25rem] font-medium text-black">
                        {option.label}
                      </h2>
                      <p className="t-body mt-2 max-w-2xl text-black/70">
                        {option.description}
                      </p>

                      {content ? (
                        <div className="option-detail-grid mt-8">
                          <div className="option-detail-block">
                            <span className="t-mono !text-black/70">
                              Pourquoi c&apos;est utile
                            </span>
                            <p className="option-detail-text">{content.why}</p>
                          </div>
                          <div className="option-detail-block">
                            <span className="t-mono !text-black/70">
                              Personnalisation
                            </span>
                            <p className="option-detail-text">
                              {content.customize}
                            </p>
                          </div>
                          <div className="option-detail-block">
                            <span className="t-mono !text-black/70">
                              Exemple concret
                            </span>
                            <p className="option-detail-text">
                              {content.example}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="t-body mt-6 max-w-2xl">
                          {option.detail ?? option.description}
                        </p>
                      )}

                      {option.footnote && (
                        <p className="t-mono mt-6 !text-[0.625rem]">
                          * {option.footnote}
                        </p>
                      )}
                    </article>
                  </MotionItem>
                );
              })}
            </MotionStagger>
          </div>
        </section>

        <section className="bg-gray-dark text-white border-t border-[var(--border-on-dark)]">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 sm:py-20">
            <MotionDiv>
              <span className="t-mono-on-dark">Autres catégories</span>
              <div className="mt-6 flex flex-wrap gap-3">
                {otherCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/options/${c.slug}`}
                    className="btn-outline-white"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </MotionDiv>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
