import {
  BASE_OFFER,
  BASE_OFFER_ORIGINAL_PRICE,
  formatChf,
} from "@/lib/options";

type PromoBasePriceProps = {
  variant?: "hero" | "inline" | "spec";
  className?: string;
};

export function PromoBasePrice({
  variant = "inline",
  className = "",
}: PromoBasePriceProps) {
  const originalLabel = formatChf(BASE_OFFER_ORIGINAL_PRICE);
  const promoLabel = formatChf(BASE_OFFER.price);

  if (variant === "hero") {
    const originalShort = originalLabel.replace(" CHF", "");
    const promoShort = promoLabel.replace(" CHF", "");

    return (
      <div className={`mt-10 ${className}`}>
        <p className="t-mono text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          Au lieu de{" "}
          <span className="text-black/45">{originalShort} CHF</span>
        </p>
        <p className="t-display mt-2 sm:mt-3 text-[clamp(4rem,14vw,7rem)] text-red leading-none">
          {promoShort}
          <span className="ml-2 t-mono !text-[1rem] align-middle text-muted">
            CHF
          </span>
        </p>
      </div>
    );
  }

  if (variant === "spec") {
    return (
      <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
        <span className="text-muted opacity-60">{originalLabel}</span>
        <span className="text-black/30" aria-hidden="true">
          →
        </span>
        <span className="text-red">{promoLabel}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span className="t-mono !text-[0.65em] uppercase tracking-[0.12em] text-muted opacity-80">
        Au lieu de
      </span>
      <span className="text-muted opacity-60">{originalLabel}</span>
      <span className="text-black/30" aria-hidden="true">
        →
      </span>
      <span className="text-red">{promoLabel}</span>
    </span>
  );
}
