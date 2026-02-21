"use client";

import { useEffect, useState } from "react";
import type { QuizAnswers } from "@/types";
import { calculateBMI, getMetabolismStatus } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ContinueButton } from "./ContinueButton";

interface FatBurningRateScreenProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

const comparisonData = [
  { current: "Excess fat storage", withGlp: "Fast fat-burning rate" },
  { current: "Easy weight gain", withGlp: "Steady weight loss" },
  { current: "Increased hunger & cravings", withGlp: "Better appetite control" },
  { current: "Digestive issues", withGlp: "Healthy gut" },
  { current: "Sleep issues & fatigue", withGlp: "Highly energized" },
  { current: "Low GLP-1 levels", withGlp: "High GLP-1 levels" },
];

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

function rateToPercent(rate: "Slow" | "Normal" | "Fast"): number {
  if (rate === "Slow") return 18;
  if (rate === "Fast") return 85;
  return 50;
}

export function FatBurningRateScreen({ answers: propAnswers, onContinue }: FatBurningRateScreenProps) {
  const [animateGauge, setAnimateGauge] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<QuizAnswers>({});

  useEffect(() => {
    const stored = loadAnswersFromStorage();
    if (Object.keys(stored).length > 0) {
      setLocalAnswers(stored);
    }
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimateGauge(true), 200);
    const t2 = setTimeout(() => setShowTable(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const answers = { ...propAnswers, ...localAnswers };
  const height = (answers.height as number) || 170;
  const weight = (answers.weight as number) || 70;
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
          <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">
            A slower fat-burning rate can make it more difficult to lose weight
            and maintain results over time.
          </p>

          {/* Fat Burning Rate Gauge */}
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 mb-6 text-left">
            <p className="text-[15px] font-semibold mb-4">Fat Burning Rate</p>
            <div className="relative pt-8 pb-2">
              <div className="h-3.5 rounded-full overflow-hidden flex bg-gray-100">
                <div className="flex-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-1.5 px-0.5">
                <span>Slow</span>
                <span>Average</span>
                <span>Fast</span>
              </div>
              {/* Animated badge */}
              <div
                className="absolute flex flex-col items-center -top-1 transition-all duration-700 ease-out"
                style={{
                  left: animateGauge ? `${percent}%` : "0%",
                  transform: "translateX(-50%)",
                  opacity: animateGauge ? 1 : 0,
                }}
              >
                <span className="text-[11px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-md whitespace-nowrap shadow-sm">
                  You: {percent}%
                </span>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-red-600" />
              </div>
              {/* Animated dot */}
              <div
                className="absolute top-1/2 w-5 h-5 rounded-full bg-white border-2 border-red-600 shadow transition-all duration-700 ease-out"
                style={{
                  left: animateGauge ? `${percent}%` : "0%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "2px",
                }}
              />
            </div>
          </div>

          {/* Comparison Table */}
          <div
            className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden mb-8"
            style={{
              opacity: showTable ? 1 : 0,
              transform: showTable ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-2">
              <div className="bg-red-50 px-4 py-3 flex items-center gap-2 border-b border-red-100">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-[14px] font-semibold text-red-600">Currently</span>
              </div>
              <div className="bg-emerald-50 px-4 py-3 flex items-center gap-2 border-b border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[14px] font-semibold text-emerald-700">With GLP Diet</span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-2"
                style={{
                  opacity: showTable ? 1 : 0,
                  transform: showTable ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.3s ease ${index * 80}ms, transform 0.3s ease ${index * 80}ms`,
                }}
              >
                <div className={`px-4 py-3 text-left ${index < comparisonData.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-[13px] text-gray-700">{row.current}</span>
                </div>
                <div className={`px-4 py-3 text-left bg-emerald-50/50 ${index < comparisonData.length - 1 ? "border-b border-emerald-100/50" : ""}`}>
                  <span className="text-[13px] text-emerald-800 font-medium">{row.withGlp}</span>
                </div>
              </div>
            ))}
          </div>

          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </main>
    </div>
  );
}
