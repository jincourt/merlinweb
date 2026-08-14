import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CATEGORY_META,
  type CategoryMeta,
  getOptionsForCategory,
} from "@/lib/options";
import { getOptionPageContent } from "@/lib/option-page-content";
import { MerlinLogo } from "./ui";
import { MotionDiv } from "./motion";
import { SiteFooter } from "./site-footer";

type Props = {
  category: CategoryMeta["id"];
};

function OptionBulletList({ items }: { items: string[] }) {
  return (
    <ul className="option-detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

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
                Réserver ma place
              </Link>
            </MotionDiv>
          </div>
        </section>

        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
            <nav
              className="option-nav"
              aria-label={`Modules ${meta.label}`}
            >
              {options.map((option) => (
                <a
                  key={option.id}
                  href={`#${option.id}`}
                  className="btn-outline option-nav-btn"
                >
                  {option.label}
                </a>
              ))}
            </nav>

            <div className="space-y-0 mt-14 sm:mt-16">
              {options.map((option) => {
                const content = getOptionPageContent(option.id);
                const intro = option.detail ?? option.description;

                return (
                  <article
                    key={option.id}
                    id={option.id}
                    className="option-anchor border-b border-[var(--border)] py-12 first:pt-0 last:border-b-0 scroll-mt-24"
                  >
                    <header className="max-w-3xl">
                      <h2 className="text-[clamp(1.375rem,3vw,1.75rem)] font-medium leading-tight text-black">
                        {option.label}
                      </h2>
                      <p className="t-mono mt-3 !text-black/55">
                        {option.description}
                      </p>
                      <p className="option-detail-intro">{intro}</p>
                    </header>

                    {content ? (
                      <div className="option-detail-body mt-8 max-w-3xl">
                        <OptionBulletList items={content.highlights} />
                        <p className="option-detail-example">{content.example}</p>
                      </div>
                    ) : null}

                    {option.footnote && (
                      <p className="t-mono mt-6 !text-[0.625rem] !text-black/50">
                        * {option.footnote}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
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
