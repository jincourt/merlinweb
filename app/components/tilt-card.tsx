"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const MAX_TILT = 12;
const IDLE = 2.8;

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 24, mass: 0.55 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 24, mass: 0.55 });

  const glareX = useTransform(springY, [-MAX_TILT, MAX_TILT], [18, 82]);
  const glareY = useTransform(springX, [MAX_TILT, -MAX_TILT], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.38), transparent 55%)`;

  useEffect(() => {
    if (hovering) return;

    const ax = animate(rotateX, [0, IDLE, 0, -IDLE, 0], {
      duration: 7.5,
      ease: "easeInOut",
      repeat: Infinity,
    });
    const ay = animate(rotateY, [0, -IDLE * 0.85, 0, IDLE * 0.85, 0], {
      duration: 9,
      ease: "easeInOut",
      repeat: Infinity,
    });

    return () => {
      ax.stop();
      ay.stop();
    };
  }, [hovering, rotateX, rotateY]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateX.set(clamp((0.5 - py) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT));
    rotateY.set(clamp((px - 0.5) * 2 * MAX_TILT, -MAX_TILT, MAX_TILT));
  }

  function onEnter() {
    setHovering(true);
  }

  function onLeave() {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        className={`relative will-change-transform ${className}`}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div style={{ transform: "translateZ(18px)" }}>{children}</div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: glare,
            opacity: hovering ? 1 : 0.35,
            transition: "opacity 0.35s ease",
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
