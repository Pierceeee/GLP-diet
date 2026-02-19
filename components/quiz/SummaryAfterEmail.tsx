"use client";

import type { QuizAnswers } from "@/types";
import {
  calculateBMI,
  getBMICategoryDisplay,
  getMetabolismStatus,
} from "@/lib/utils";
import { Scale, Hourglass, Info, Check } from "lucide-react";
import { ContinueButton } from "./ContinueButton";

interface SummaryAfterEmailProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export function SummaryAfterEmail({ answers, onContinue }: SummaryAfterEmailProps) {
  const weight = (answers.weight as number) ?? 70;
  const height = (answers.height as number) ?? 170;
  const age = (answers.age as number) ?? 30;

  const bmi = calculateBMI(height, weight);
  const categoryDisplay = getBMICategoryDisplay(bmi);
  const metabolism = getMetabolismStatus(bmi);

  const isHealthy = categoryDisplay === "Healthy";

  // Gauge position (18.5–40 range)
  const gaugeMin = 15;
  const gaugeMax = 42;
  const pct = Math.min(
    Math.max(((bmi - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0),
    100
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px] text-center">
          <h2
            className="text-[26px] font-bold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your personal summary
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg mx-auto">
            Based on your quiz responses, it appears your metabolic age may be{" "}
            <span className="text-[var(--brand)] font-semibold">
              higher than average
            </span>
            , which can contribute to{" "}
            <span className="font-semibold text-[var(--text)]">
              carrying extra body weight
            </span>
            .
          </p>

          {/* Current BMI Card */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 w-full text-left mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Scale className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <span className="text-[15px] font-semibold">Current BMI</span>
            </div>

            <div className="relative mb-2">
              <div
                className="absolute -top-7 flex flex-col items-center"
                style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              >
                <span
                  className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-md whitespace-nowrap ${
                    isHealthy ? "bg-[var(--success)]" : "bg-red-500"
                  }`}
                >
                  You - {bmi.toFixed(1)}
                </span>
                <div
                  className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    isHealthy ? "border-t-[var(--success)]" : "border-t-red-500"
                  }`}
                />
              </div>
              <div className="h-3 rounded-full overflow-hidden flex">
                <div className="flex-[18.5] bg-blue-300 rounded-l-full" />
                <div className="flex-[6.5] bg-green-400" />
                <div className="flex-[5] bg-yellow-400" />
                <div className="flex-[10] bg-gradient-to-r from-orange-400 to-red-500 rounded-r-full" />
              </div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 shadow ${
                  isHealthy
                    ? "border-[var(--success)]"
                    : "border-red-500"
                }`}
                style={{
                  left: `${pct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-1.5 px-0.5">
              <span>Underweight</span>
              <span>Healthy</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>

            <div
              className={`flex items-center gap-2 mt-4 rounded-xl px-4 py-2.5 ${
                isHealthy ? "bg-[var(--brand-light)]" : "bg-[var(--danger-bg)]"
              }`}
            >
              {isHealthy ? (
                <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
              )}
              <span className="text-[13px]">
                Your weight category:{" "}
                <span className="font-bold">{categoryDisplay}</span>
              </span>
            </div>
          </div>

          {/* Metabolic Age Card */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 w-full text-left mb-8">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Hourglass className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
                <span className="text-[15px] font-semibold">Metabolic age</span>
              </div>
              <span className="text-[15px] font-bold text-red-600">
                {age} years
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[var(--danger-bg)] rounded-xl px-4 py-2.5">
              <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-[13px]">
                Your metabolism is: <span className="font-bold">{metabolism}</span>
              </span>
            </div>
          </div>

          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </main>
    </div>
  );
}
