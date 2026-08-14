"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MerlinLogo } from "./ui";

const NAV = [
  { href: "#offre", label: "Offre" },
  { href: "#processus", label: "Modules" },
  { href: "#devis", label: "Devis" },
];

export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("offre");
    if (!hero) return;

    function update() {
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom <= 96);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`site-header-scroll fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-black rule transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <MerlinLogo className="h-8 w-8" />
          <span className="t-mono !text-black !text-[0.625rem]">Merlin</span>
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link hover:!text-black transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#devis"
            className="hidden sm:inline-flex btn-primary !py-2 !px-4 !text-[0.625rem]"
          >
            Réserver ma place
            <ArrowRight size={12} strokeWidth={2} aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
