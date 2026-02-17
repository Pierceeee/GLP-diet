"use client";

import type { QuizAnswers } from "@/types";
import { ContinueButton } from "./ContinueButton";

interface PlanReadyScreenProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export function PlanReadyScreen({ answers, onContinue }: PlanReadyScreenProps) {
  const currentWeight = (answers.weight as number) ?? 70;
  const targetWeight = (answers["target-weight"] as number) ?? 65;
  const week4Weight = currentWeight - (currentWeight - targetWeight) * 0.4;
  const points = [
    { week: 1, weight: currentWeight },
    { week: 2, weight: currentWeight - (currentWeight - targetWeight) * 0.15 },
    { week: 3, weight: currentWeight - (currentWeight - targetWeight) * 0.28 },
    { week: 4, weight: week4Weight },
  ];

  const chartWidth = 280;
  const chartHeight = 120;
  const padding = { top: 32, right: 48, bottom: 28, left: 40 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;
  const minW = Math.min(currentWeight, week4Weight) - 2;
  const maxW = Math.max(currentWeight, week4Weight) + 2;
  const range = maxW - minW;

  const x = (week: number) =>
    padding.left + ((week - 1) / 3) * innerW;
  const y = (w: number) =>
    padding.top +
    innerH -
    ((w - minW) / range) * innerH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.week)} ${y(p.weight)}`)
    .join(" ");
  const areaD = `${pathD} L ${x(4)} ${padding.top + innerH} L ${x(1)} ${padding.top + innerH} Z`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px] text-center">
          <h2
            className="text-[22px] sm:text-[26px] font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your personalized GLP Diet plan is ready!
          </h2>
          <p className="text-[15px] text-[var(--text)] mb-8">
            Get visible results in <span className="font-bold">4 weeks</span>
          </p>

          <p className="text-[15px] font-semibold text-left mb-2">Your weight</p>
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 mb-8 overflow-hidden">
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
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#planGradient)" opacity={0.3} />
              <path
                d={pathD}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={x(1)}
                cy={y(currentWeight)}
                r="6"
                fill="#dc2626"
                stroke="white"
                strokeWidth="2"
              />
              <g transform={`translate(${x(1)},${y(currentWeight) - 22})`}>
                <rect
                  x="-24"
                  y="0"
                  width="48"
                  height="20"
                  rx="4"
                  fill="#dc2626"
                />
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fill="white"
                  style={{ fontSize: 10, fontWeight: 600 }}
                >
                  Now
                </text>
              </g>
              <circle
                cx={x(4)}
                cy={y(week4Weight)}
                r="6"
                fill="#16a34a"
                stroke="white"
                strokeWidth="2"
              />
              <g transform={`translate(${x(4)},${y(week4Weight) - 22})`}>
                <rect
                  x="-52"
                  y="0"
                  width="104"
                  height="20"
                  rx="4"
                  fill="#16a34a"
                />
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fill="white"
                  style={{ fontSize: 10, fontWeight: 600 }}
                >
                  After 4 weeks
                </text>
              </g>
              {[1, 2, 3, 4].map((w) => (
                <text
                  key={w}
                  x={x(w)}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="fill-[var(--text-muted)]"
                  style={{ fontSize: 11 }}
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
