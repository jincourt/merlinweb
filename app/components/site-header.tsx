"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { MerlinLogo } from "./ui";

const navLinkClass =
  "t-hero text-[clamp(1rem,1.5vw,1.125rem)] transition-colors hover:!text-black";

export function SiteHeader() {
  const pathname = usePathname();
  const content = useIntlayer("site");

  const navItems = [{ href: "/contact", label: content.contact }] as const;

  return (
    <header className="rule bg-white text-black">
      <div className="mx-auto flex h-[4.5rem] w-full min-w-0 max-w-[1200px] items-center gap-6 px-5 sm:h-20 sm:gap-10 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center group"
          aria-label={content.headerHomeAria}
        >
          <MerlinLogo className="h-10 w-10 sm:h-11 sm:w-11" black />
        </Link>

        <nav
          className="ml-auto flex min-w-0 items-center gap-6 sm:gap-10"
          aria-label={content.mainNavAria}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${navLinkClass} ${isActive ? "!text-black" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
