"use client";

import { ContinueButton } from "./ContinueButton";

interface MealCombinationsSummaryProps {
  onContinue: () => void;
}

export function MealCombinationsSummary({ onContinue }: MealCombinationsSummaryProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center pb-24">
      <div className="w-full max-w-[520px] bg-white rounded-2xl border border-[var(--border)] shadow-sm px-6 py-8 sm:px-8 sm:py-10">
        <p
          className="text-[var(--text)] font-bold text-[17px] sm:text-[18px] leading-tight mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Based on your food preferences, we&apos;ve created
        </p>
        <p
          className="text-[var(--brand)] font-bold text-[42px] sm:text-[48px] leading-none my-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          1000+
        </p>
        <p className="text-[var(--text)] text-[14px] sm:text-[15px] leading-relaxed text-left">
          Meal combinations that are the perfect fit for you and will help you
          boost your GLP-1 levels, support GLP-1 weight loss drugs results, reduce
          side effects, and help you reach your body goals in the most enjoyable,
          effortless way!
        </p>
      </div>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-[660px] mx-auto">
          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </div>
    </div>
  );
}
