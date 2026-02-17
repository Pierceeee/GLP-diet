"use client";

import type { QuizAnswers } from "@/types";
import { getTargetWeightDate, formatTargetDate } from "@/lib/utils";
import { ContinueButton } from "./ContinueButton";
import { PartyPopper } from "lucide-react";

interface WeightPredictionProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export function WeightPrediction({ answers, onContinue }: WeightPredictionProps) {
  const currentWeight = (answers.weight as number) ?? 70;
  const targetWeight = (answers["target-weight"] as number) ?? 60;
  const startDate = new Date();
  const targetDate = getTargetWeightDate(currentWeight, targetWeight, startDate);
  const targetDateStr = formatTargetDate(targetDate);
  const startDateStr = startDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const endDateStr = targetDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  // Chart dimensions and scale
  const chartWidth = 280;
  const chartHeight = 140;
  const padding = { top: 12, right: 48, bottom: 24, left: 36 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const weightMin = Math.floor(Math.min(targetWeight, currentWeight) - 1);
  const weightMax = Math.ceil(Math.max(currentWeight, targetWeight) + 1);
  const weightRange = Math.max(weightMax - weightMin, 1);

  const x = (t: number) => padding.left + t * innerWidth; // t 0..1
  const y = (w: number) =>
    padding.top + innerHeight - ((w - weightMin) / weightRange) * innerHeight;

  const pathPoints = [
    [x(0), y(currentWeight)],
    [x(1), y(targetWeight)],
  ];
  const pathD = `M ${pathPoints[0][0]} ${pathPoints[0][1]} L ${pathPoints[1][0]} ${pathPoints[1][1]}`;
  const areaD = `${pathD} L ${pathPoints[1][0]} ${padding.top + innerHeight} L ${pathPoints[0][0]} ${padding.top + innerHeight} Z`;

  const step = weightRange <= 6 ? 1 : weightRange <= 12 ? 2 : 5;
  const yTicks: number[] = [];
  for (let w = weightMin; w <= weightMax; w += step) yTicks.push(w);
  if (yTicks.length < 2) yTicks.push(weightMax);
  yTicks.sort((a, b) => a - b);

  return (
    <div className="space-y-6 text-center">
      {/* Main heading */}
      <h2
        className="text-[22px] sm:text-[26px] font-bold leading-tight text-[var(--brand)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        We predict that you&apos;ll weigh{" "}
        <span className="text-[var(--brand)]">{targetWeight} kg</span> by{" "}
        <span className="text-[var(--brand)]">{targetDateStr}</span>!
      </h2>

      {/* Weight loss graph */}
      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 mx-auto max-w-[340px]">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          <defs>
            <linearGradient
              id="weightGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="35%" stopColor="#ea580c" />
              <stop offset="65%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          {/* Area under line */}
          <path d={areaD} fill="url(#weightGradient)" opacity={0.85} />
          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Y-axis labels */}
          {yTicks.map((w) => (
            <text
              key={w}
              x={padding.left - 6}
              y={y(w) + 4}
              textAnchor="end"
              className="fill-[var(--text-muted)]"
              style={{ fontSize: 11 }}
            >
              {Math.round(w)}
            </text>
          ))}
          {/* X-axis labels */}
          <text
            x={x(0)}
            y={chartHeight - 4}
            textAnchor="middle"
            className="fill-[var(--text-muted)]"
            style={{ fontSize: 11 }}
          >
            {startDateStr}
          </text>
          <text
            x={x(1)}
            y={chartHeight - 4}
            textAnchor="middle"
            className="fill-[var(--text-muted)]"
            style={{ fontSize: 11 }}
          >
            {endDateStr}
          </text>
          {/* Goal marker */}
          <circle
            cx={pathPoints[1][0]}
            cy={pathPoints[1][1]}
            r="5"
            fill="var(--brand)"
            stroke="white"
            strokeWidth="2"
          />
          <g transform={`translate(${pathPoints[1][0]},${Math.max(pathPoints[1][1] - 36, padding.top)})`}>
            <rect
              x="-32"
              y="0"
              width="64"
              height="36"
              rx="6"
              fill="var(--brand)"
            />
            <text
              x="0"
              y="14"
              textAnchor="middle"
              fill="white"
              style={{ fontSize: 10, fontWeight: 600 }}
            >
              Goal
            </text>
            <text
              x="0"
              y="28"
              textAnchor="middle"
              fill="white"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              {targetWeight} kg
            </text>
          </g>
        </svg>
      </div>

      {/* Good news box */}
      <div className="bg-[var(--brand-light)] rounded-2xl px-5 py-4 text-left max-w-[340px] mx-auto">
        <p className="text-[15px] font-semibold text-[var(--brand)] flex items-center gap-2 mb-1">
          <PartyPopper className="w-5 h-5 flex-shrink-0" aria-hidden />
          Good news!
        </p>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
          Based on similar GLP Diet users, we predict that you&apos;ll achieve
          your goal weight of {targetWeight} kg before {targetDateStr}.
        </p>
      </div>

      <ContinueButton onClick={onContinue}>Continue</ContinueButton>
    </div>
  );
}
