"use client";

import { TOTAL_STEPS } from "@/config/questions";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = TOTAL_STEPS }: ProgressBarProps) {
  const pct = Math.min((currentStep / totalSteps) * 100, 100);
  return (
    <div className="h-[3px] w-full bg-[var(--border-light)]">
      <div
        className="h-full bg-[var(--brand)] transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
