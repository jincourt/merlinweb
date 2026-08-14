"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MotionItem, MotionStagger } from "./motion";

export type MarketingKeypoint = {
  value?: number;
  displayText?: string;
  suffix?: string;
  prefix?: string;
  formatLocale?: boolean;
  label: string;
  insight: string;
};

function AnimatedValue({
  value,
  active,
  formatLocale,
  prefix = "",
  suffix = "",
}: {
  value: number;
  active: boolean;
  formatLocale?: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 20,
    mass: 0.9,
  });
  const format = (v: number) =>
    formatLocale ? Math.round(v).toLocaleString("fr-CH") : String(Math.round(v));
  const display = useTransform(spring, format);

  useEffect(() => {
    motionValue.set(active ? value : 0);
  }, [active, value, motionValue]);

  return (
    <span className="keypoint-animated-value">
      <span className="keypoint-animated-value-live">
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </span>
    </span>
  );
}

function KeypointCard({
  point,
  index,
  variant,
}: {
  point: MarketingKeypoint;
  index: number;
  variant: "light" | "red";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardClass =
    variant === "red" ? "keypoint-card keypoint-card-on-red" : "keypoint-card";
  const hasCurrency = Boolean(point.prefix?.trim());
  const valueClass = hasCurrency
    ? "keypoint-card-value keypoint-card-value-currency"
    : "keypoint-card-value";

  return (
    <MotionItem soft>
      <div ref={cardRef} className={cardClass}>
        <div className={valueClass}>
          {point.displayText ? (
            <span className="keypoint-accent">{point.displayText}</span>
          ) : hasCurrency ? (
            <>
              <span className="keypoint-accent keypoint-value-prefix">
                {point.prefix?.trim()}
              </span>
              <span className="keypoint-accent keypoint-value-main">
                <AnimatedValue
                  value={point.value ?? 0}
                  active={inView}
                  formatLocale={point.formatLocale}
                  suffix={point.suffix}
                />
              </span>
            </>
          ) : (
            <span className="keypoint-accent">
              <AnimatedValue
                value={point.value ?? 0}
                active={inView}
                formatLocale={point.formatLocale}
                prefix={point.prefix}
                suffix={point.suffix}
              />
            </span>
          )}
        </div>
        <p className="keypoint-card-label">{point.label}</p>
        <p className="keypoint-card-insight">{point.insight}</p>
        <span className="keypoint-card-index" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </MotionItem>
  );
}

type KeypointGridProps = {
  points: MarketingKeypoint[];
  variant?: "light" | "red";
  className?: string;
};

export function KeypointGrid({
  points,
  variant = "light",
  className = "",
}: KeypointGridProps) {
  return (
    <MotionStagger
      className={`keypoints-grid ${className}`.trim()}
      delay={0.06}
      stagger={0.1}
    >
      {points.map((point, index) => (
        <KeypointCard
          key={point.label}
          point={point}
          index={index}
          variant={variant}
        />
      ))}
    </MotionStagger>
  );
}
