"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locales } from "intlayer";
import { useIntlayer, useLocale } from "next-intlayer";
import { MerlinLogo } from "./ui";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

const LOCALE_CODES = [
  { locale: Locales.FRENCH, labelKey: "french" as const },
  { locale: Locales.ENGLISH, labelKey: "english" as const },
  { locale: Locales.GERMAN, labelKey: "german" as const },
];

const footerTextClass =
  "t-hero text-[clamp(1rem,1.5vw,1.125rem)] !text-black/75";

function FooterLanguageLinks() {
  const content = useIntlayer("site");
  const { locale, setLocale } = useLocale({ onChange: "push" });

  return (
    <ul className="space-y-3">
      {LOCALE_CODES.map((item) => (
        <li key={item.locale}>
          <button
            type="button"
            onClick={() => setLocale(item.locale)}
            aria-current={locale === item.locale ? "true" : undefined}
            className={`${footerTextClass} transition-colors hover:!text-black ${
              locale === item.locale ? "!text-black" : ""
            }`}
          >
            {content[item.labelKey]}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const content = useIntlayer("site");

  const footerNav = [{ label: content.contact, href: "/contact" }];

  const serviceLabels = [
    content.siteWeb,
    content.infrastructure,
    content.gestion,
    content.interface,
  ];

  return (
    <footer className="border-t border-black/20 bg-white text-black">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-10 pb-14">
        <MotionStagger
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          stagger={0.08}
        >
          <MotionItem>
            <div className="flex items-center gap-2.5">
              <MerlinLogo className="h-8 w-8" black />
              <span className="t-hero text-[clamp(1.125rem,2.5vw,1.5rem)] text-black">
                {content.brand}
              </span>
            </div>
          </MotionItem>

          <MotionItem>
            <nav aria-label={content.footerNavAria}>
              <ul className="space-y-3">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${footerTextClass} transition-colors hover:!text-black`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </MotionItem>

          <MotionItem>
            <ul className="space-y-3">
              {serviceLabels.map((label) => (
                <li key={label}>
                  <span className={footerTextClass}>{label}</span>
                </li>
              ))}
            </ul>
          </MotionItem>

          <MotionItem>
            <FooterLanguageLinks />
          </MotionItem>
        </MotionStagger>

        <MotionDiv soft delay={0.15} className="mt-20 sm:mt-28 text-center">
          <p className="t-hero-sub max-w-lg mx-auto text-black/45">
            &ldquo;{content.footerTagline}&rdquo;
          </p>
        </MotionDiv>
      </div>
    </footer>
  );
}
