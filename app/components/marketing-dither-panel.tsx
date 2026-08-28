"use client";

import { DitherShader } from "@/components/ui/dither-shader";

export function MarketingDitherPanel() {
  return (
    <DitherShader
      src="/home/dither.png"
      className="h-[clamp(26rem,58vw,40rem)] min-h-[26rem] w-full"
      gridSize={2}
      ditherMode="bayer"
      colorMode="grayscale"
      objectFit="contain"
      objectPosition="bottom"
      backgroundColor="transparent"
      hideDarkSquares
      contrast={1.25}
      brightness={0.06}
      threshold={0.42}
      darkCutoff={0.05}
    />
  );
}
