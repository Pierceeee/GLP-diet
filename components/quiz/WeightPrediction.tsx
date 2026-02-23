"use client";

import { useEffect, useState } from "react";
import type { QuizAnswers } from "@/types";
import { getTargetWeightDate, formatTargetDate } from "@/lib/utils";
import { ContinueButton } from "./ContinueButton";

interface WeightPredictionProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export function WeightPrediction({ answers, onContinue }: WeightPredictionProps) {
  const [animate, setAnimate] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showGoodNews, setShowGoodNews] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 100);
    const t2 = setTimeout(() => setShowGoal(true), 1200);
    const t3 = setTimeout(() => setShowGoodNews(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

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
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 20, right: 56, bottom: 32, left: 44 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate weight range with more ticks
  const weightDiff = currentWeight - targetWeight;
  const weightMin = Math.floor(targetWeight - weightDiff * 0.1);
  const weightMax = Math.ceil(currentWeight + weightDiff * 0.1);
  const weightRange = Math.max(weightMax - weightMin, 1);

  const x = (t: number) => padding.left + t * innerWidth;
  const y = (w: number) =>
    padding.top + innerHeight - ((w - weightMin) / weightRange) * innerHeight;

  // Generate y-axis ticks
  const step = weightRange <= 10 ? 5 : weightRange <= 30 ? 5 : 10;
  const yTicks: number[] = [];
  const startTick = Math.ceil(weightMin / step) * step;
  for (let w = startTick; w <= weightMax; w += step) {
    yTicks.push(w);
  }
  if (yTicks.length < 2) {
    yTicks.push(weightMin, weightMax);
  }

  // Path for the declining weight line (curved)
  const startX = x(0);
  const startY = y(currentWeight);
  const endX = x(1);
  const endY = y(targetWeight);
  const controlX = startX + innerWidth * 0.5;
  const controlY = startY + (endY - startY) * 0.3;
  
  const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  const areaD = `${pathD} L ${endX} ${padding.top + innerHeight} L ${startX} ${padding.top + innerHeight} Z`;

  // Calculate path length for animation
  const pathLength = 400;

  return (
    <div className="space-y-6 text-center">
      {/* Main heading */}
      <h2
        className="text-[22px] sm:text-[26px] font-bold leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        We estimate you could reach{" "}
        <span className="text-[var(--brand)]">{targetWeight} kg</span> by{" "}
        <span className="text-[var(--brand)]">{targetDateStr}</span>
      </h2>

      {/* Weight loss graph */}
      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5 mx-auto max-w-[380px]">
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
              <stop offset="30%" stopColor="#ea580c" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <clipPath id="revealClip">
              <rect
                x={padding.left}
                y={0}
                width={animate ? innerWidth : 0}
                height={chartHeight}
                style={{
                  transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </clipPath>
          </defs>

          {/* Y-axis labels */}
          {yTicks.map((w) => (
            <text
              key={w}
              x={padding.left - 8}
              y={y(w) + 4}
              textAnchor="end"
              className="fill-[var(--text-muted)]"
              style={{ fontSize: 12 }}
            >
              {Math.round(w)}
            </text>
          ))}

          {/* Horizontal grid lines */}
          {yTicks.map((w) => (
            <line
              key={`grid-${w}`}
              x1={padding.left}
              y1={y(w)}
              x2={padding.left + innerWidth}
              y2={y(w)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Animated area under line */}
          <g clipPath="url(#revealClip)">
            <path d={areaD} fill="url(#weightGradient)" opacity={0.9} />
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
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* X-axis labels */}
          <text
            x={x(0)}
            y={chartHeight - 8}
            textAnchor="middle"
            className="fill-[var(--text-muted)]"
            style={{ fontSize: 12 }}
          >
            {startDateStr}
          </text>
          <text
            x={x(1)}
            y={chartHeight - 8}
            textAnchor="middle"
            className="fill-[var(--text-muted)]"
            style={{ fontSize: 12 }}
          >
            {endDateStr}
          </text>

          {/* Goal marker - animated */}
          <g
            style={{
              opacity: showGoal ? 1 : 0,
              transform: showGoal ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <circle
              cx={endX}
              cy={endY}
              r="6"
              fill="var(--brand)"
              stroke="white"
              strokeWidth="2"
            />
            <g transform={`translate(${endX + 8}, ${endY - 20})`}>
              <rect
                x="0"
                y="0"
                width="52"
                height="40"
                rx="6"
                fill="var(--brand)"
              />
              <text
                x="26"
                y="16"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 11, fontWeight: 600 }}
              >
                Goal
              </text>
              <text
                x="26"
                y="32"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 12, fontWeight: 700 }}
              >
                {targetWeight} kg
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Good news box - animated */}
      <div
        className="bg-[var(--brand-light)] rounded-2xl px-5 py-4 text-left max-w-[380px] mx-auto"
        style={{
          opacity: showGoodNews ? 1 : 0,
          transform: showGoodNews ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <p className="text-[15px] font-semibold text-[var(--brand)] flex items-center gap-2 mb-1">
          <span className="text-[18px]">🙌</span>
          Good news!
        </p>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
          Based on progress seen by users following the{" "}
          <span className="font-semibold">Personalized GLP-1 program</span>, we estimate you can reach your target weight of{" "}
          <span className="font-semibold">{targetWeight} kg</span> by{" "}
          <span className="font-semibold">{targetDateStr}</span>, if you stay consistent with your plan.
        </p>
      </div>

      <ContinueButton onClick={onContinue}>Continue</ContinueButton>
    </div>
  );
}
