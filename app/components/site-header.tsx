"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MerlinLogo } from "./ui";

const NAV = [
  { href: "#offre", label: "Offre" },
  { href: "#processus", label: "Modules" },
];

export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const el = document.getElementById("offre");
      if (!el) return;
      const heroBottom = el.getBoundingClientRect().bottom;
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
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-5 sm:gap-8 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center group"
          aria-label="Merlin — accueil"
        >
          <MerlinLogo className="h-8 w-8" />
        </Link>

        <nav
          className="ml-auto flex min-w-0 items-center gap-3 sm:gap-7"
          aria-label="Navigation principale"
        >
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
            className="inline-flex shrink-0 btn-primary !py-2 !px-3 !text-[0.5625rem] sm:!px-4 sm:!text-[0.625rem]"
          >
            Réserver ma place
            <ArrowRight size={12} strokeWidth={2} aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
