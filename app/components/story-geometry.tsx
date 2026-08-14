type StoryGeometryVariant = "on-dark" | "on-light";

type StoryGeometryProps = {
  variant?: StoryGeometryVariant;
};

const PALETTES = {
  "on-dark": {
    LINE: "rgba(255,255,255,0.14)",
    LINE_SOFT: "rgba(255,255,255,0.08)",
    LINE_FAINT: "rgba(255,255,255,0.05)",
    CIRCLE: "rgba(255,255,255,0.12)",
    CIRCLE_SOFT: "rgba(255,255,255,0.07)",
  },
  "on-light": {
    LINE: "rgba(17,17,17,0.1)",
    LINE_SOFT: "rgba(17,17,17,0.06)",
    LINE_FAINT: "rgba(17,17,17,0.035)",
    CIRCLE: "rgba(17,17,17,0.09)",
    CIRCLE_SOFT: "rgba(17,17,17,0.05)",
  },
} as const;

function gridLines(
  step: number,
  w: number,
  h: number,
  faint: string,
) {
  const hLines = Array.from({ length: Math.ceil(h / step) + 1 }, (_, i) => (
    <line
      key={`h-${i}`}
      x1="0"
      y1={i * step}
      x2={w}
      y2={i * step}
      stroke={faint}
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
      stroke={faint}
      strokeWidth="1"
    />
  ));
  return [...hLines, ...vLines];
}

function circleGroup(
  cx: number,
  cy: number,
  radii: number[],
  circle: string,
  circleSoft: string,
  dashed = false,
) {
  return radii.map((r, i) => (
    <circle
      key={`${cx}-${cy}-${r}`}
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={i % 2 === 0 ? circle : circleSoft}
      strokeWidth="1"
      strokeDasharray={dashed || i % 2 === 1 ? `${4 + i * 2} ${6 + i}` : undefined}
    />
  ));
}

const W = 1080;
const H = 1920;
const SX = W / 1200;

function sx(x: number) {
  return x * SX;
}

function ty(y: number, row: number) {
  return y + row * 640;
}

/** Motif géométrique portrait — même densité que l'accueil, adapté 1080×1920 */
export function StoryGeometry({ variant = "on-dark" }: StoryGeometryProps) {
  const colors = PALETTES[variant];
  const rows = [0, 1, 2];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {gridLines(80, W, H, colors.LINE_FAINT)}

        {[480, 960, 1440].map((y) => (
          <line
            key={`main-h-${y}`}
            x1="0"
            y1={y}
            x2={W}
            y2={y}
            stroke={colors.LINE_SOFT}
            strokeWidth="1"
          />
        ))}
        {[180, 360, 540, 720, 900].map((x) => (
          <line
            key={`main-v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2={H}
            stroke={colors.LINE_SOFT}
            strokeWidth="1"
          />
        ))}

        {rows.flatMap((row) =>
          [
            [0, 640, 1200, 0],
            [0, 640 * 0.6, 1200, 0],
            [0, 640, 1200 * 0.7, 0],
            [1200 * 0.3, 640, 1200, 0],
            [0, 0, 1200, 640 * 0.5],
            [0, 640 * 0.4, 1200, 640],
            [1200 * 0.2, 0, 1200, 640 * 0.8],
            [0, 640 * 0.8, 1200 * 0.6, 0],
            [1200 * 0.5, 640, 1200, 640 * 0.2],
            [1200 * 0.7, 640, 1200, 640 * 0.45],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`diag-${row}-${i}`}
              x1={sx(x1)}
              y1={ty(y1, row)}
              x2={sx(x2)}
              y2={ty(y2, row)}
              stroke={i % 3 === 0 ? colors.LINE : colors.LINE_SOFT}
              strokeWidth="1"
            />
          )),
        )}

        {rows.flatMap((row) =>
          [
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
            <line
              key={`seg-${row}-${i}`}
              x1={sx(x1)}
              y1={ty(y1, row)}
              x2={sx(x2)}
              y2={ty(y2, row)}
              stroke={colors.LINE}
              strokeWidth="1"
            />
          )),
        )}

        {rows.flatMap((row) =>
          [
            [600, 320, 40],
            [200, 180, 24],
            [950, 450, 30],
            [450, 520, 20],
            [750, 150, 18],
            [1100, 280, 22],
            [120, 420, 16],
            [380, 60, 14],
          ].map(([cx, cy, size], i) => (
            <g key={`cross-${row}-${i}`}>
              <line
                x1={sx(cx - size)}
                y1={ty(cy, row)}
                x2={sx(cx + size)}
                y2={ty(cy, row)}
                stroke={colors.LINE}
                strokeWidth="1"
              />
              <line
                x1={sx(cx)}
                y1={ty(cy - size, row)}
                x2={sx(cx)}
                y2={ty(cy + size, row)}
                stroke={colors.LINE}
                strokeWidth="1"
              />
            </g>
          )),
        )}

        {rows.flatMap((row) => [
          ...circleGroup(
            sx(1050),
            ty(80, row),
            [60, 100, 140, 190, 240],
            colors.CIRCLE,
            colors.CIRCLE_SOFT,
            true,
          ),
          ...circleGroup(
            sx(-60),
            ty(580, row),
            [80, 130, 180, 230],
            colors.CIRCLE,
            colors.CIRCLE_SOFT,
            true,
          ),
          ...circleGroup(
            sx(600),
            ty(320, row),
            [80, 140, 200, 270, 340],
            colors.CIRCLE,
            colors.CIRCLE_SOFT,
          ),
          ...circleGroup(
            sx(1200),
            ty(400, row),
            [70, 120, 170, 220],
            colors.CIRCLE,
            colors.CIRCLE_SOFT,
          ),
          ...circleGroup(
            sx(0),
            ty(100, row),
            [90, 150, 210],
            colors.CIRCLE,
            colors.CIRCLE_SOFT,
          ),
        ])}

        {rows.flatMap((row) =>
          [
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
          ].flatMap(([cx, cy, radii]) =>
            circleGroup(
              sx(cx as number),
              ty(cy as number, row),
              radii as number[],
              colors.CIRCLE,
              colors.CIRCLE_SOFT,
              true,
            ),
          ),
        )}

        {rows.flatMap((row) =>
          [
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
              key={`dot-${row}-${i}`}
              cx={sx(cx)}
              cy={ty(cy, row)}
              r={8 + (i % 4) * 4}
              fill="none"
              stroke={colors.CIRCLE}
              strokeWidth="1"
            />
          )),
        )}

        {rows.flatMap((row) =>
          (
            [
              [620, 80, 90, 780, 140],
              [40, 420, 70, 160, 480],
              [900, 500, 60, 980, 420],
              [300, 500, 80, 420, 560],
              [700, 40, 50, 780, 100],
              [1000, 180, 70, 1080, 260],
              [500, 600, 90, 620, 640],
              [200, 40, 60, 280, 100],
              [850, 350, 55, 920, 290],
              [50, 250, 45, 110, 190],
            ] as const
          ).map(([x1, y1, r, x2, y2], i) => (
            <path
              key={`arc-${row}-${i}`}
              d={`M ${sx(x1)} ${ty(y1, row)} A ${sx(r)} ${sx(r)} 0 0 1 ${sx(x2)} ${ty(y2, row)}`}
              fill="none"
              stroke={i % 2 === 0 ? colors.LINE : colors.LINE_SOFT}
              strokeWidth="1"
              strokeDasharray={i % 3 === 0 ? "5 7" : undefined}
            />
          )),
        )}

        {rows.flatMap((row) =>
          (
            [
              [
                [480, 180],
                [540, 260],
                [420, 260],
              ],
              [
                [820, 480],
                [880, 540],
                [760, 540],
              ],
              [
                [160, 80],
                [200, 140],
                [120, 140],
              ],
              [
                [1040, 420],
                [1080, 480],
                [1000, 480],
              ],
              [
                [600, 500],
                [640, 560],
                [560, 560],
              ],
            ] as const
          ).map((points, i) => {
            const d = points
              .map(([x, y], j) => `${j === 0 ? "M" : "L"} ${sx(x)} ${ty(y, row)}`)
              .join(" ");
            return (
              <path
                key={`poly-${row}-${i}`}
                d={`${d} Z`}
                fill="none"
                stroke={colors.LINE_SOFT}
                strokeWidth="1"
              />
            );
          }),
        )}

        {rows.flatMap((row) =>
          [
            [700, 380, 28],
            [320, 440, 22],
            [950, 160, 20],
            [130, 260, 18],
          ].map(([cx, cy, s], i) => (
            <path
              key={`diamond-${row}-${i}`}
              d={`M ${sx(cx)} ${ty(cy - s, row)} L ${sx(cx + s)} ${ty(cy, row)} L ${sx(cx)} ${ty(cy + s, row)} L ${sx(cx - s)} ${ty(cy, row)} Z`}
              fill="none"
              stroke={colors.LINE}
              strokeWidth="1"
            />
          )),
        )}

        {/* Accents portrait — zones hautes / basses */}
        {circleGroup(980, 180, [50, 90, 130], colors.CIRCLE, colors.CIRCLE_SOFT, true)}
        {circleGroup(80, 1740, [60, 100, 150], colors.CIRCLE, colors.CIRCLE_SOFT, true)}
        {circleGroup(540, 960, [100, 160, 220, 290], colors.CIRCLE, colors.CIRCLE_SOFT)}
      </svg>
    </div>
  );
}
