"use client";

import {
  motion,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "motion/react";

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type MotionDivProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  /** Animate on mount instead of on scroll into view */
  immediate?: boolean;
  /** Soft fade only (no vertical travel) */
  soft?: boolean;
};

export function MotionDiv({
  children,
  className,
  delay = 0,
  duration = 0.65,
  immediate = false,
  soft = false,
  ...props
}: MotionDivProps) {
  const transition: Transition = {
    duration,
    delay,
    ease,
  };

  const variants = soft ? fade : fadeUp;

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -48px 0px" }}
      variants={variants}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  delay?: number;
  stagger?: number;
  immediate?: boolean;
};

export function MotionStagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  immediate = false,
  ...props
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  soft = false,
  ...props
}: HTMLMotionProps<"div"> & { soft?: boolean }) {
  return (
    <motion.div
      className={className}
      variants={soft ? fade : fadeUp}
      transition={{ duration: 0.55, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { motion, fadeUp, fade };
