"use client";

import type { QuizAnswers } from "@/types";
import { calculateBMI, getMetabolismStatus } from "@/lib/utils";
import { Info, Check } from "lucide-react";
import { ContinueButton } from "./ContinueButton";

interface FatBurningRateScreenProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

const currentlyList = [
  "Excess fat storage",
  "Easy weight gain",
  "Increased hunger & cravings",
  "Digestive issues",
  "Sleep issues & fatigue",
  "Low GLP-1 levels",
];

const withGlpList = [
  "Fast fat-burning rate",
  "Steady weight loss",
  "Better appetite control",
  "Healthy gut",
  "Highly energized",
  "High GLP-1 levels",
];

function rateToPercent(rate: "Slow" | "Normal" | "Fast"): number {
  if (rate === "Slow") return 18;
  if (rate === "Fast") return 85;
  return 50;
}

export function FatBurningRateScreen({ answers, onContinue }: FatBurningRateScreenProps) {
  const height = (answers.height as number) ?? 170;
  const weight = (answers.weight as number) ?? 70;
  const bmi = calculateBMI(height, weight);
  const metabolism = getMetabolismStatus(bmi);
  const percent = rateToPercent(metabolism);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px] text-center">
          <h2
            className="text-[22px] sm:text-[26px] font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your fat-burning rate is:{" "}
            <span className="text-red-600">{metabolism}</span>
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-8">
            A slow fat-burning rate makes it harder for you to lose weight and
            keep it off.
          </p>

          {/* Fat Burning Rate Gauge */}
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 mb-6 text-left">
            <p className="text-[15px] font-semibold mb-4">Fat Burning Rate</p>
            <div className="relative pt-8 pb-2">
              <div className="h-3 rounded-full overflow-hidden flex bg-gray-100">
                <div className="flex-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-1.5 px-0.5">
                <span>Slow</span>
                <span>Average</span>
                <span>Fast</span>
              </div>
              <div
                className="absolute flex flex-col items-center -top-1"
                style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
              >
                <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded whitespace-nowrap">
                  You: {percent}%
                </span>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-red-600" />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-red-600 shadow"
                style={{ left: `${percent}%`, transform: "translate(-50%, -50%)" }}
              />
            </div>
          </div>

          {/* Currently vs With GLP Diet */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[var(--danger-bg)] rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-[14px] font-semibold">Currently</span>
              </div>
              <ul className="space-y-1.5 text-[13px] text-[var(--text-secondary)]">
                {currentlyList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--brand-light)] rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                <span className="text-[14px] font-semibold text-[var(--brand)]">
                  With GLP Diet
                </span>
              </div>
              <ul className="space-y-1.5 text-[13px] text-[var(--text-secondary)]">
                {withGlpList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </main>
    </div>
  );
}
