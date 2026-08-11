import Link from "next/link";
import { CrossMark } from "./ui";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const NAV = [
  { href: "#offre", label: "Offre" },
  { href: "#processus", label: "Processus" },
  { href: "#devis", label: "Devis" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-black rule">
      <MotionDiv
        immediate
        soft
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <CrossMark className="text-red" />
          <span className="t-mono !text-black !text-[0.625rem]">Merlin</span>
        </Link>

        <MotionStagger
          immediate
          className="flex items-center gap-5 sm:gap-7"
          stagger={0.05}
          delay={0.1}
        >
          {NAV.map((item) => (
            <MotionItem key={item.href} soft>
              <a
                href={item.href}
                className="tag hover:!text-black transition-colors"
              >
                {item.label}
              </a>
            </MotionItem>
          ))}
          <MotionItem soft>
            <a
              href="#devis"
              className="hidden sm:inline-flex btn-primary !py-2 !px-4 !text-[0.625rem]"
            >
              Démarrer
            </a>
          </MotionItem>
        </MotionStagger>
      </MotionDiv>
    </header>
  );
}
