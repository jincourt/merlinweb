import { MotionDiv } from "./motion";

type MarketingHeroProps = {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: "white" | "black";
};

export function MarketingHero({
  id,
  title,
  subtitle,
  tone = "black",
}: MarketingHeroProps) {
  const isBlack = tone === "black";

  return (
    <section
      id={id}
      className={`relative flex min-h-[28vh] flex-col overflow-hidden bg-white sm:min-h-[32vh] ${
        isBlack ? "text-black" : "text-white"
      }`}
    >
      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1200px] px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-32">
        <MotionDiv immediate className="max-w-3xl">
          <h1
            className={`t-hero text-[clamp(1.875rem,5vw,3.5rem)] ${
              isBlack ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`t-hero-sub mt-6 max-w-xl ${
                isBlack ? "text-black/55" : "text-white/55"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </MotionDiv>
      </div>
    </section>
  );
}
