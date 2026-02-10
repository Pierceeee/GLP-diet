"use client";

import type { QuizAnswers, Gender } from "@/types";
import { calculateBMI, getBMICategory } from "@/lib/utils";
import { Info } from "lucide-react";

interface PersonalSummaryProps {
  answers: QuizAnswers;
  gender: Gender;
}

export function PersonalSummary({ answers }: PersonalSummaryProps) {
  const weight = (answers.weight as number) || 100;
  const height = (answers.height as number) || 170;

  const bmi = calculateBMI(height, weight);
  const bmiCat = getBMICategory(bmi);

  // Map BMI to a percentage position on the gauge (18.5–40 range)
  const gaugeMin = 15;
  const gaugeMax = 42;
  const pct = Math.min(Math.max(((bmi - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0), 100);

  return (
    <div className="text-center">
      <h2
        className="text-[26px] font-bold mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Your personal summary
      </h2>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg mx-auto">
        Based on your quiz answers, it looks like you might have an{" "}
        <span className="text-[var(--brand)] font-medium">increased metabolic age</span>
        , which can lead to <span className="font-semibold">excess body weight</span>.
      </p>

      {/* BMI Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 w-full mx-auto text-left">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-[16px]">⚖️</span>
          </div>
          <span className="text-[15px] font-semibold">Current BMI</span>
        </div>

        {/* Gauge */}
        <div className="relative mb-2">
          {/* Badge */}
          <div
            className="absolute -top-7 flex flex-col items-center"
            style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
          >
            <span className="text-[11px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-md whitespace-nowrap">
              You - {bmi.toFixed(1)}
            </span>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
          </div>
          {/* Bar */}
          <div className="h-3 rounded-full overflow-hidden flex">
            <div className="flex-[18.5] bg-blue-300 rounded-l-full" />
            <div className="flex-[6.5] bg-green-400" />
            <div className="flex-[5] bg-yellow-400" />
            <div className="flex-[10] bg-gradient-to-r from-orange-400 to-red-500 rounded-r-full" />
          </div>
          {/* Dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-red-500 shadow"
            style={{ left: `${pct}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-1.5 px-0.5">
          <span>Underweight</span>
          <span>Healthy</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 mt-4 bg-[var(--danger-bg)] rounded-xl px-4 py-2.5">
          <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-[13px]">
            Your weight category: <span className="font-bold">{bmiCat}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
