import { Star } from "lucide-react";
import { MerlinLogo } from "./ui";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";
import { LeaveNoteLink } from "./leave-note-link";

const MENU_LINKS = [
  { label: "Offre", href: "#offre" },
  { label: "Modules", href: "#processus" },
  { label: "Devis", href: "#devis" },
];

export function SiteFooter() {
  return (
    <footer className="bg-gray-dark text-white max-sm:border-t-0">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-8 pb-14">
        <MotionStagger
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          <MotionItem>
            <div className="flex items-center gap-2.5">
              <MerlinLogo className="h-8 w-8" red={false} />
              <span className="t-mono-on-dark !text-white/85">Merlin</span>
            </div>
            <p className="mt-3 flex items-center gap-1.5 t-mono-on-dark !text-[0.875rem] !text-white/70">
              <Star
                size={16}
                strokeWidth={0}
                fill="currentColor"
                className="text-white/85"
                aria-hidden="true"
              />
              4.8/5
            </p>
            <LeaveNoteLink />
            <p className="mt-4 text-sm text-white/45 leading-relaxed">
              Studio web suisse.
              <br />
              Sites personnalisés pour indépendants et PME.
            </p>
          </MotionItem>

          <MotionItem>
            <p className="t-mono-on-dark">Menu</p>
            <ul className="mt-4 space-y-2">
              {MENU_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="tag tag-on-dark">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </MotionItem>

          <MotionItem className="sm:col-span-2 sm:text-right lg:col-span-1 lg:ml-auto">
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
        </MotionStagger>

        <MotionDiv soft delay={0.15} className="mt-12 text-center">
          <p className="t-mono-on-dark !text-[0.625rem]">
            © {new Date().getFullYear()} Merlin · Tous droits réservés
          </p>
        </MotionDiv>
      </div>
    </footer>
  );
}
