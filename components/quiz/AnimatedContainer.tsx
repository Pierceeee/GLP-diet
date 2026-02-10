"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  keyProp: string | number;
  direction?: "left" | "right";
}

const variants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? -100 : 100,
    opacity: 0,
  }),
};

export function AnimatedContainer({
  children,
  keyProp,
  direction = "right",
}: AnimatedContainerProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={keyProp}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Fade in animation wrapper
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.3,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger children animation
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item (child of StaggerContainer)
 */
export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}
