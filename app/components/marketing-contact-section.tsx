"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useIntlayer } from "next-intlayer";
import { MotionDiv } from "./motion";

const CONTACT_EMAIL = "merlineapp@gmail.com";
const CONTACT_PHONE = "078 604 15 44";
const CONTACT_PHONE_HREF = "tel:+41786041544";

const ICON_CLASS =
  "size-5 shrink-0 [shape-rendering:crispEdges] [image-rendering:crisp-edges]";

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={ICON_CLASS}
    >
      <path
        d="M16 14H0V2H16V14ZM12 6H10V8H6V6H4V8H6V10H10V8H12V6H14V4H12V6ZM2 6H4V4H2V6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={ICON_CLASS}
    >
      <path
        d="M2 10H6V16H2V14H0V4H2V10ZM16 14H14V16H10V10H14V4H16V14ZM4 4H2V2H4V4ZM14 4H12V2H14V4ZM12 2H4V0H12V2Z"
        fill="currentColor"
      />
    </svg>
  );
}

type MarketingContactSectionProps = {
  showAppointmentButton?: boolean;
  col2?: ReactNode;
  pageLayout?: boolean;
};

export function MarketingContactSection({
  showAppointmentButton = true,
  col2,
  pageLayout = false,
}: MarketingContactSectionProps) {
  const content = useIntlayer("contact");
  const site = useIntlayer("site");

  return (
    <section
      id={pageLayout ? undefined : "contact"}
      className={`relative w-full min-w-0 bg-white text-black scroll-mt-16 ${
        pageLayout
          ? ""
          : `overflow-hidden border-t border-black/8 ${
              col2 ? "" : "flex min-h-[28vh] flex-col sm:min-h-[32vh]"
            }`
      }`}
    >
      <div
        className={`relative z-10 mx-auto w-full min-w-0 max-w-[1200px] px-5 sm:px-8 ${
          pageLayout
            ? "pt-24 pb-16 sm:pt-32 sm:pb-20"
            : col2
              ? "pt-24 sm:pt-32 pb-16 sm:pb-20"
              : "mt-auto pt-24 sm:pt-32 pb-8 sm:pb-10"
        }`}
      >
        <div
          className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 ${
            col2 ? "lg:items-start" : "lg:items-stretch"
          }`}
        >
          <MotionDiv
            immediate={pageLayout}
            soft={pageLayout}
            className={`max-w-3xl lg:flex lg:flex-col ${
              col2 ? "lg:justify-start" : "lg:justify-end"
            }`}
          >
            <h2 className="t-hero text-[clamp(1.875rem,5vw,3.5rem)] text-black">
              {content.title}
              <span className="text-black/40">.</span>
            </h2>
            <p className="t-hero-sub mt-6 max-w-xl text-black/45">
              {content.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 t-hero-sub text-[clamp(1.0625rem,2vw,1.375rem)]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2.5 text-black transition-colors hover:text-black/60"
              >
                <EmailIcon />
                {CONTACT_EMAIL}
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center gap-2.5 text-black transition-colors hover:text-black/60"
              >
                <PhoneIcon />
                {CONTACT_PHONE}
              </a>
            </div>
          </MotionDiv>

          {col2 ? (
            <MotionDiv
              delay={pageLayout ? 0 : 0.06}
              immediate={pageLayout}
              soft={pageLayout}
              className={`w-full min-w-0 lg:max-w-[24.5rem]${
                pageLayout ? "" : " lg:justify-self-end"
              }`}
            >
              {col2}
            </MotionDiv>
          ) : showAppointmentButton ? (
            <MotionDiv
              delay={0.06}
              className="flex items-center justify-center lg:min-h-full"
            >
              <Link href="/contact" className="btn-black">
                {site.bookAppointment}
              </Link>
            </MotionDiv>
          ) : null}
        </div>
      </div>
    </section>
  );
}
