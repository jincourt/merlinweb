import { MerlinLogo } from "./ui";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

export function SiteFooter() {
  return (
    <footer className="bg-gray-dark text-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-8 pb-14">
        <MotionStagger
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          <MotionItem>
            <div className="flex items-center gap-2.5">
              <MerlinLogo className="h-8 w-8" red={false} />
              <span className="t-mono-on-dark !text-white/85">Merlin</span>
            </div>
            <p className="mt-4 text-sm text-white/45 leading-relaxed">
              Studio web suisse.
              <br />
              Sites personnalisés pour indépendants et PME.
            </p>
          </MotionItem>

          <MotionItem>
            <p className="t-mono-on-dark">Menu</p>
            <ul className="mt-4 space-y-2">
              {["Offre", "Processus", "Devis"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l === "Devis" ? "devis" : l.toLowerCase()}`}
                    className="tag tag-on-dark"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </MotionItem>

          <MotionItem>
            <p className="t-mono-on-dark">Contact</p>
            <div className="mt-4 space-y-2 t-mono-on-dark !normal-case !tracking-normal !text-[0.75rem] leading-relaxed">
              <a
                href="mailto:merlineapp@gmail.com"
                className="block hover:!text-white transition-colors"
              >
                merlineapp@gmail.com
              </a>
              <a
                href="tel:+41786041544"
                className="block hover:!text-white transition-colors"
              >
                078 604 15 44
              </a>
            </div>
          </MotionItem>

          <MotionItem>
            <p className="t-mono-on-dark">Référence</p>
            <p className="mt-4 t-mono-on-dark !normal-case !tracking-normal !text-[0.75rem]">
              CH-2026-MRL-0000
            </p>
          </MotionItem>
        </MotionStagger>

        <MotionDiv soft delay={0.15} className="rule-on-dark mt-12 pt-6 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="t-mono-on-dark !text-[0.625rem]">
            © {new Date().getFullYear()} Merlin · Tous droits réservés
          </p>
          <div className="flex flex-col gap-1 sm:items-center">
            <a
              href="mailto:merlineapp@gmail.com"
              className="t-mono-on-dark !text-[0.625rem] !normal-case !tracking-normal hover:!text-white transition-colors"
            >
              merlineapp@gmail.com
            </a>
            <a
              href="tel:+41786041544"
              className="t-mono-on-dark !text-[0.625rem] !normal-case !tracking-normal hover:!text-white transition-colors"
            >
              078 604 15 44
            </a>
          </div>
          <p className="t-mono-on-dark !text-[0.625rem]">
            Hébergement et domaine non inclus
          </p>
        </MotionDiv>
      </div>
    </footer>
  );
}
