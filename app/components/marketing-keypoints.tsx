"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";

type Keypoint = {
  value: number;
  suffix: string;
  label: string;
  insight: string;
};

const KEYPOINTS: Keypoint[] = [
  {
    value: 80,
    suffix: "%",
    label: "Recherchent en ligne",
    insight: "Sans site, vous n'existez pas sur Google.",
  },
  {
    value: 77,
    suffix: "%",
    label: "Veulent réserver en ligne",
    insight: "Vos clients veulent agir sans passer par le téléphone.",
  },
  {
    value: 56,
    suffix: "%",
    label: "Exigent l'achat en ligne",
    insight: "Catalogue et commande deviennent la norme.",
  },
  {
    value: 7,
    suffix: "j",
    label: "Pour être en ligne",
    insight: "Merlin livre un site pro en une semaine.",
  },
];

function AnimatedValue({
  value,
  active,
}: {
  value: number;
  active: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 20,
    mass: 0.9,
  });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    motionValue.set(active ? value : 0);
  }, [active, value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

function KeypointCard({
  point,
  index,
}: {
  point: Keypoint;
  index: number;
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

  return (
    <MotionItem soft>
      <div ref={cardRef} className="keypoint-card">
        <div className="keypoint-card-value">
          <span className="keypoint-accent">
            <AnimatedValue value={point.value} active={inView} />
            {point.suffix}
          </span>
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

export function MarketingKeypoints() {
  return (
    <section id="enjeux" className="keypoints-section">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <MotionDiv>
          <span className="t-mono block !text-[1rem] !text-black/70">
            Le coût de l&apos;invisibilité
          </span>
          <h2 className="t-display mt-6 sm:mt-8 text-[clamp(2rem,5vw,3.25rem)] text-black max-w-2xl">
            Chaque jour sans site,
            <br />
            une opportunité s&apos;éteint
            <span className="text-red">.</span>
          </h2>
        </MotionDiv>

        <MotionStagger
          className="keypoints-grid mt-14 sm:mt-16"
          delay={0.06}
          stagger={0.1}
        >
          {KEYPOINTS.map((point, index) => (
            <KeypointCard key={point.label} point={point} index={index} />
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
