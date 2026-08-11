const LINE = "rgba(255,255,255,0.14)";
const LINE_SOFT = "rgba(255,255,255,0.08)";
const LINE_FAINT = "rgba(255,255,255,0.05)";
const CIRCLE = "rgba(255,255,255,0.12)";
const CIRCLE_SOFT = "rgba(255,255,255,0.07)";

function gridLines(step: number, w: number, h: number) {
  const hLines = Array.from({ length: Math.ceil(h / step) + 1 }, (_, i) => (
    <line
      key={`h-${i}`}
      x1="0"
      y1={i * step}
      x2={w}
      y2={i * step}
      stroke={LINE_FAINT}
      strokeWidth="1"
    />
  ));
  const vLines = Array.from({ length: Math.ceil(w / step) + 1 }, (_, i) => (
    <line
      key={`v-${i}`}
      x1={i * step}
      y1="0"
      x2={i * step}
      y2={h}
      stroke={LINE_FAINT}
      strokeWidth="1"
    />
  ));
  return [...hLines, ...vLines];
}

function circleGroup(
  cx: number,
  cy: number,
  radii: number[],
  dashed = false,
) {
  return radii.map((r, i) => (
    <circle
      key={`${cx}-${cy}-${r}`}
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={i % 2 === 0 ? CIRCLE : CIRCLE_SOFT}
      strokeWidth="1"
      strokeDasharray={dashed || i % 2 === 1 ? `${4 + i * 2} ${6 + i}` : undefined}
    />
  ));
}

export function HeroGeometry() {
  const W = 1200;
  const H = 640;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grille de fond */}
        {gridLines(80, W, H)}

        {/* Lignes principales horizontales & verticales */}
        {[160, 320, 480].map((y) => (
          <line key={`main-h-${y}`} x1="0" y1={y} x2={W} y2={y} stroke={LINE_SOFT} strokeWidth="1" />
        ))}
        {[200, 400, 600, 800, 1000].map((x) => (
          <line key={`main-v-${x}`} x1={x} y1="0" x2={x} y2={H} stroke={LINE_SOFT} strokeWidth="1" />
        ))}

        {/* Diagonales — réseau dense */}
        {[
          [0, H, W, 0],
          [0, H * 0.6, W, 0],
          [0, H, W * 0.7, 0],
          [W * 0.3, H, W, 0],
          [0, 0, W, H * 0.5],
          [0, H * 0.4, W, H],
          [W * 0.2, 0, W, H * 0.8],
          [0, H * 0.8, W * 0.6, 0],
          [W * 0.5, H, W, H * 0.2],
          [W * 0.7, H, W, H * 0.45],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={`diag-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 3 === 0 ? LINE : LINE_SOFT}
            strokeWidth="1"
          />
        ))}

        {/* Segments courts — accents */}
        {[
          [80, 120, 200, 120],
          [80, 120, 80, 200],
          [320, 80, 420, 80],
          [420, 80, 420, 160],
          [540, 520, 640, 520],
          [640, 520, 640, 580],
          [900, 200, 1000, 200],
          [1000, 200, 1000, 280],
          [180, 480, 280, 480],
          [180, 480, 180, 560],
          [760, 60, 860, 60],
          [860, 60, 860, 130],
          [1050, 400, 1150, 400],
          [1150, 400, 1150, 480],
          [40, 300, 120, 300],
          [40, 300, 40, 380],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={`seg-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth="1" />
        ))}

        {/* Croix géométriques */}
        {[
          [600, 320, 40],
          [200, 180, 24],
          [950, 450, 30],
          [450, 520, 20],
          [750, 150, 18],
          [1100, 280, 22],
          [120, 420, 16],
          [380, 60, 14],
        ].map(([cx, cy, size], i) => (
          <g key={`cross-${i}`}>
            <line
              x1={cx - size}
              y1={cy}
              x2={cx + size}
              y2={cy}
              stroke={LINE}
              strokeWidth="1"
            />
            <line
              x1={cx}
              y1={cy - size}
              x2={cx}
              y2={cy + size}
              stroke={LINE}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Grands cercles — coins & centre */}
        {circleGroup(1050, 80, [60, 100, 140, 190, 240], true)}
        {circleGroup(-60, 580, [80, 130, 180, 230], true)}
        {circleGroup(600, 320, [80, 140, 200, 270, 340])}
        {circleGroup(1200, 400, [70, 120, 170, 220])}
        {circleGroup(0, 100, [90, 150, 210])}

        {/* Cercles moyens dispersés */}
        {[
          [260, 200, [20, 36, 52, 70]],
          [860, 440, [16, 30, 44, 60]],
          [480, 120, [14, 28, 42]],
          [720, 560, [18, 34, 50]],
          [100, 540, [22, 38, 56]],
          [980, 300, [12, 24, 38, 54]],
          [400, 400, [15, 28, 42, 58]],
          [650, 80, [10, 22, 36]],
          [150, 60, [18, 32, 48]],
          [550, 480, [14, 26, 40]],
        ].map(([cx, cy, radii]) =>
          circleGroup(cx as number, cy as number, radii as number[], true),
        )}

        {/* Petits cercles isolés */}
        {[
          [340, 280],
          [520, 360],
          [780, 220],
          [920, 520],
          [60, 160],
          [1100, 120],
          [680, 420],
          [240, 560],
          [840, 80],
          [460, 580],
          [1020, 580],
          [180, 320],
          [720, 300],
          [560, 200],
          [380, 500],
        ].map(([cx, cy], i) => (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r={8 + (i % 4) * 4}
            fill="none"
            stroke={CIRCLE}
            strokeWidth="1"
          />
        ))}

        {/* Arcs partiels */}
        {[
          "M 620 80 A 90 90 0 0 1 780 140",
          "M 40 420 A 70 70 0 0 0 160 480",
          "M 900 500 A 60 60 0 0 1 980 420",
          "M 300 500 A 80 80 0 0 1 420 560",
          "M 700 40 A 50 50 0 0 0 780 100",
          "M 1000 180 A 70 70 0 0 1 1080 260",
          "M 500 600 A 90 90 0 0 0 620 640",
          "M 200 40 A 60 60 0 0 1 280 100",
          "M 850 350 A 55 55 0 0 0 920 290",
          "M 50 250 A 45 45 0 0 1 110 190",
        ].map((d, i) => (
          <path
            key={`arc-${i}`}
            d={d}
            fill="none"
            stroke={i % 2 === 0 ? LINE : LINE_SOFT}
            strokeWidth="1"
            strokeDasharray={i % 3 === 0 ? "5 7" : undefined}
          />
        ))}

        {/* Polygones en traits — triangles & losanges */}
        {[
          "M 480 180 L 540 260 L 420 260 Z",
          "M 820 480 L 880 540 L 760 540 Z",
          "M 160 80 L 200 140 L 120 140 Z",
          "M 1040 420 L 1080 480 L 1000 480 Z",
          "M 600 500 L 640 560 L 560 560 Z",
        ].map((d, i) => (
          <path
            key={`poly-${i}`}
            d={d}
            fill="none"
            stroke={LINE_SOFT}
            strokeWidth="1"
          />
        ))}

        {/* Losanges */}
        {[
          [700, 380, 28],
          [320, 440, 22],
          [950, 160, 20],
          [130, 260, 18],
        ].map(([cx, cy, s], i) => (
          <path
            key={`diamond-${i}`}
            d={`M ${cx} ${cy - s} L ${cx + s} ${cy} L ${cx} ${cy + s} L ${cx - s} ${cy} Z`}
            fill="none"
            stroke={LINE}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
