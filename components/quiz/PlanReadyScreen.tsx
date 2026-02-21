"use client";

import { useEffect, useState } from "react";
import type { QuizAnswers } from "@/types";
import { ContinueButton } from "./ContinueButton";

interface PlanReadyScreenProps {
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

export function PlanReadyScreen({ answers: propAnswers, onContinue }: PlanReadyScreenProps) {
  const [animate, setAnimate] = useState(false);
  const [showNowBadge, setShowNowBadge] = useState(false);
  const [showAfterBadge, setShowAfterBadge] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<QuizAnswers>({});

  useEffect(() => {
    const stored = loadAnswersFromStorage();
    if (Object.keys(stored).length > 0) {
      setLocalAnswers(stored);
    }
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 100);
    const t2 = setTimeout(() => setShowNowBadge(true), 400);
    const t3 = setTimeout(() => setShowAfterBadge(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const answers = { ...propAnswers, ...localAnswers };
  const currentWeight = (answers.weight as number) || 70;
  const targetWeight = (answers["target-weight"] as number) || 65;
  const week4Weight = currentWeight - (currentWeight - targetWeight) * 0.4;

  const chartWidth = 340;
  const chartHeight = 180;
  const padding = { top: 48, right: 24, bottom: 36, left: 24 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;
  const minW = Math.min(currentWeight, week4Weight) - 2;
  const maxW = Math.max(currentWeight, week4Weight) + 2;
  const range = Math.max(maxW - minW, 1);

  const x = (week: number) => padding.left + ((week - 1) / 3) * innerW;
  const y = (w: number) => padding.top + innerH - ((w - minW) / range) * innerH;

  // Curved path using quadratic bezier
  const startX = x(1);
  const startY = y(currentWeight);
  const endX = x(4);
  const endY = y(week4Weight);
  const controlX = startX + innerW * 0.5;
  const controlY = startY + (endY - startY) * 0.3;
  
  const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  const areaD = `${pathD} L ${endX} ${padding.top + innerH} L ${startX} ${padding.top + innerH} Z`;

  const pathLength = 500;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px] text-center">
          <h2
            className="text-[22px] sm:text-[26px] font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Personalized GLP-1 Programme is ready!
          </h2>
          <p className="text-[15px] text-[var(--text)] mb-8">
            <span className="font-bold">Switch off hunger</span> and see visible progress within <span className="font-bold">4 weeks</span>
          </p>

          <p className="text-[15px] font-semibold text-left mb-2">Your weight</p>
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5 mb-8 overflow-hidden">
            <svg
              width={chartWidth}
              height={chartHeight}
              className="w-full h-auto"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
              <defs>
                <linearGradient
                  id="planGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="50%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#86efac" />
                </linearGradient>
                <clipPath id="areaClip">
                  <rect
                    x={padding.left}
                    y={0}
                    width={animate ? innerW : 0}
                    height={chartHeight}
                    style={{
                      transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </clipPath>
              </defs>

              {/* Animated gradient area */}
              <g clipPath="url(#areaClip)">
                <path d={areaD} fill="url(#planGradient)" opacity={0.7} />
              </g>

              {/* Animated line */}
              <path
                d={pathD}
                fill="none"
                stroke="#0d9488"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={animate ? 0 : pathLength}
                style={{
                  transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />

              {/* Now marker - animated */}
              <g
                style={{
                  opacity: showNowBadge ? 1 : 0,
                  transform: showNowBadge ? "translateY(0)" : "translateY(-8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <circle
                  cx={startX}
                  cy={startY}
                  r="7"
                  fill="#dc2626"
                  stroke="white"
                  strokeWidth="3"
                />
                <g transform={`translate(${startX + 8},${startY - 28})`}>
                  <rect
                    x="0"
                    y="0"
                    width="48"
                    height="26"
                    rx="6"
                    fill="#dc2626"
                  />
                  <text
                    x="24"
                    y="18"
                    textAnchor="middle"
                    fill="white"
                    style={{ fontSize: 13, fontWeight: 600 }}
                  >
                    Now
                  </text>
                </g>
              </g>

              {/* After 4 weeks marker - animated */}
              <g
                style={{
                  opacity: showAfterBadge ? 1 : 0,
                  transform: showAfterBadge ? "translateY(0)" : "translateY(-8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <circle
                  cx={endX}
                  cy={endY}
                  r="7"
                  fill="#16a34a"
                  stroke="white"
                  strokeWidth="3"
                />
                <g transform={`translate(${endX - 100},${endY - 28})`}>
                  <rect
                    x="0"
                    y="0"
                    width="108"
                    height="26"
                    rx="6"
                    fill="#16a34a"
                  />
                  <text
                    x="54"
                    y="18"
                    textAnchor="middle"
                    fill="white"
                    style={{ fontSize: 13, fontWeight: 600 }}
                  >
                    After 4 weeks
                  </text>
                </g>
              </g>

              {/* Week labels */}
              {[1, 2, 3, 4].map((w) => (
                <text
                  key={w}
                  x={x(w)}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className="fill-[var(--text-muted)]"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  Week {w}
                </text>
              ))}
            </svg>
          </div>

          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </main>
    </div>
  );
}
