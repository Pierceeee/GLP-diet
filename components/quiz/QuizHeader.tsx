"use client";

import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { TOTAL_STEPS } from "@/config/questions";

interface QuizHeaderProps {
  currentStep: number;
  onBack?: () => void;
  showBack?: boolean;
  showStepCount?: boolean;
  totalSteps?: number;
}

export function QuizHeader({ currentStep, onBack, showBack = true, showStepCount = true, totalSteps = TOTAL_STEPS }: QuizHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="w-full max-w-[660px] mx-auto px-6">
        <div className="relative flex items-center justify-center h-12">
          {/* Back */}
          <div className="absolute left-0">
            {showBack && currentStep > 1 && (
              <button
                onClick={onBack}
                className="p-1 text-gray-400 hover:text-gray-800 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              </button>
            )}
          </div>
          {/* Title */}
          <span className="text-[16px] font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            GLP Diet
          </span>
          {/* Step */}
          <div className="absolute right-0">
            {showStepCount && (
              <span className="text-[13px] text-[var(--text-muted)]">
                {currentStep}/{totalSteps}
              </span>
            )}
          </div>
        </div>
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </header>
  );
}
