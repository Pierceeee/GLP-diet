"use client";

import { useEffect, useState } from "react";
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

const ANSWERS_STORAGE_KEY = "glp-quiz-answers";

function loadAnswersFromStorage(): QuizAnswers {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(ANSWERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function SummaryAfterEmail({ answers: propAnswers, onContinue }: SummaryAfterEmailProps) {
  const [animate, setAnimate] = useState(false);
  const [showBmiCard, setShowBmiCard] = useState(false);
  const [showMetabolicCard, setShowMetabolicCard] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<QuizAnswers>({});

  // Load answers from localStorage on mount to ensure we have the data
  useEffect(() => {
    const stored = loadAnswersFromStorage();
    if (Object.keys(stored).length > 0) {
      setLocalAnswers(stored);
    }
  }, []);

  // Merge prop answers with localStorage answers (localStorage takes priority for actual values)
  const answers = { ...propAnswers, ...localAnswers };

  const weight = (answers.weight as number) || 0;
  const height = (answers.height as number) || 0;
  const age = (answers.age as number) || 0;

  // Don't calculate BMI if we don't have valid data
  const hasValidData = weight > 0 && height > 0;
  const bmi = hasValidData ? calculateBMI(height, weight) : 0;
  const categoryDisplay = hasValidData ? getBMICategoryDisplay(bmi) : "Unknown";
  const metabolism = hasValidData ? getMetabolismStatus(bmi) : "Normal";

  const isHealthy = categoryDisplay === "Healthy";

  // BMI ranges and their widths (total 27 units from 15 to 42)
  // Underweight: 15-18.5 (3.5 units) = 12.96%
  // Healthy: 18.5-25 (6.5 units) = 24.07%
  // Overweight: 25-30 (5 units) = 18.52%
  // Obese: 30-42 (12 units) = 44.44%
  const segments = [
    { min: 15, max: 18.5, width: 12.96 },    // Underweight
    { min: 18.5, max: 25, width: 24.07 },    // Healthy
    { min: 25, max: 30, width: 18.52 },      // Overweight
    { min: 30, max: 42, width: 44.44 },      // Obese
  ];

  // Calculate position based on which segment the BMI falls into
  const calculatePosition = (bmiValue: number): number => {
    const clampedBmi = Math.min(Math.max(bmiValue, 15), 42);
    let position = 0;
    
    for (const seg of segments) {
      if (clampedBmi <= seg.min) break;
      if (clampedBmi >= seg.max) {
        position += seg.width;
      } else {
        // BMI is within this segment
        const segmentProgress = (clampedBmi - seg.min) / (seg.max - seg.min);
        position += segmentProgress * seg.width;
        break;
      }
    }
    return position;
  };

  const pct = hasValidData ? calculatePosition(bmi) : 0;

  // Animation timings
  useEffect(() => {
    const t1 = setTimeout(() => setShowBmiCard(true), 100);
    const t2 = setTimeout(() => setAnimate(true), 400);
    const t3 = setTimeout(() => setShowMetabolicCard(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

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

          {/* Current BMI Card - Animated */}
          <div
            className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 w-full text-left mb-4"
            style={{
              opacity: showBmiCard ? 1 : 0,
              transform: showBmiCard ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Scale className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <span className="text-[15px] font-semibold">Current BMI</span>
            </div>

            <div className="mb-2 pt-8">
              {/* Bar container - relative for positioning badge and dot */}
              <div className="relative">
                {/* Animated badge */}
                <div
                  className="absolute -top-8 flex flex-col items-center transition-all duration-700 ease-out"
                  style={{
                    left: animate ? `${pct}%` : "0%",
                    transform: "translateX(-50%)",
                    opacity: animate ? 1 : 0,
                  }}
                >
                  <span
                    className={`text-[12px] font-bold text-white px-2.5 py-1 rounded-md whitespace-nowrap shadow-sm ${
                      isHealthy ? "bg-[var(--success)]" : "bg-red-500"
                    }`}
                  >
                    You - {bmi.toFixed(1)}
                  </span>
                  <div
                    className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent ${
                      isHealthy ? "border-t-[var(--success)]" : "border-t-red-500"
                    }`}
                  />
                </div>

                {/* Gauge bar - percentage widths matching segment calculations */}
                <div className="h-3.5 rounded-full overflow-hidden flex">
                  <div className="bg-blue-400 rounded-l-full" style={{ width: '12.96%' }} />
                  <div className="bg-green-500" style={{ width: '24.07%' }} />
                  <div className="bg-yellow-400" style={{ width: '18.52%' }} />
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-r-full" style={{ width: '44.44%' }} />
                </div>

                {/* Animated dot */}
                <div
                  className={`absolute top-1/2 w-4 h-4 rounded-full bg-white border-2 shadow transition-all duration-700 ease-out ${
                    isHealthy ? "border-[var(--success)]" : "border-red-500"
                  }`}
                  style={{
                    left: animate ? `${pct}%` : "0%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </div>

            {/* Labels — aligned to gauge segments using same percentage widths */}
            <div className="flex text-[11px] text-[var(--text-muted)] mt-2">
              <span className="text-center" style={{ width: '12.96%' }}>Underweight</span>
              <span className="text-center" style={{ width: '24.07%' }}>Healthy</span>
              <span className="text-center" style={{ width: '18.52%' }}>Overweight</span>
              <span className="text-center" style={{ width: '44.44%' }}>Obese</span>
            </div>

            <div
              className={`flex items-center gap-2 mt-5 rounded-xl px-4 py-3 ${
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

          {/* Metabolic Age Card - Animated */}
          <div
            className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 w-full text-left mb-8"
            style={{
              opacity: showMetabolicCard ? 1 : 0,
              transform: showMetabolicCard ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Hourglass className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
                <span className="text-[15px] font-semibold">Metabolic age</span>
              </div>
              <span className="text-[18px] font-bold text-red-600">
                {age > 0 ? `${age + 9} years` : "—"}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[var(--danger-bg)] rounded-xl px-4 py-3">
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
