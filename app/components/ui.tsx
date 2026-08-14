function MerlinLogo({
  className = "h-8 w-8",
  red = true,
  blend = true,
}: {
  className?: string;
  red?: boolean;
  blend?: boolean;
}) {
  if (!red) {
    return (
      <img
        src="/logo/merline.gif"
        alt="Merlin"
        className={`shrink-0 ${blend ? "mix-blend-lighten" : ""} ${className}`}
      />
    );
  }

  return (
    <span
      className={`logo-red shrink-0 ${className}`}
      role="img"
      aria-label="Merlin"
    />
  );
}

function CrossMark({ className = "" }: { className?: string }) {
  return (
    <span className={`cross-mark ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Marquee() {
  const items = ["Site sur mesure", "Design professionnel"];
  const track = [...items, ...items];

  return (
    <div className="rule overflow-hidden py-5 bg-white">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="tag shrink-0 px-6">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export { CrossMark, MerlinLogo };
