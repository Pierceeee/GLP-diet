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
  const padding = { top: 20, right: 60, bottom: 32, left: 36 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate weight range with fixed ticks for cleaner display
  const weightDiff = currentWeight - targetWeight;
  const weightMin = Math.floor(targetWeight - weightDiff * 0.05);
  const weightMax = Math.ceil(currentWeight + weightDiff * 0.05);
  const weightRange = Math.max(weightMax - weightMin, 1);

  const x = (t: number) => padding.left + t * innerWidth;
  const y = (w: number) =>
    padding.top + innerHeight - ((w - weightMin) / weightRange) * innerHeight;

  // Generate y-axis ticks (fewer, cleaner)
  const yTicks: number[] = [];
  const tickCount = 4;
  for (let i = 0; i <= tickCount; i++) {
    const w = weightMin + (weightRange * i) / tickCount;
    yTicks.push(Math.round(w));
  }

  // Organic S-curve path using cubic Bézier for smooth spline effect
  const startX = x(0);
  const startY = y(currentWeight);
  const endX = x(1);
  const endY = y(targetWeight);
  
  // Control points for organic S-curve: faster initial drop, tapering toward goal
  const cp1X = startX + innerWidth * 0.25;
  const cp1Y = startY + (endY - startY) * 0.6;
  const cp2X = startX + innerWidth * 0.7;
  const cp2Y = endY - (endY - startY) * 0.05;
  
  const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  const areaD = `${pathD} L ${endX} ${padding.top + innerHeight} L ${startX} ${padding.top + innerHeight} Z`;

  // Path length for animation
  const pathLength = 500;

  // Speech bubble tooltip dimensions
  const bubbleWidth = 54;
  const bubbleHeight = 34;
  const bubbleX = endX + 6;
  const bubbleY = endY - bubbleHeight / 2 - 4;
  const bubbleArrowSize = 6;

  return (
    <div className="space-y-5 text-center">
      {/* Main heading */}
      <h2
        className="text-[22px] sm:text-[26px] font-bold leading-tight text-[#1a3a2f] px-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        We estimate you could reach{" "}
        <span className="text-[#16a34a]">{targetWeight} kg</span> by{" "}
        <span className="text-[#16a34a]">{targetDateStr}</span>
      </h2>

      {/* Weight loss graph - no border box */}
      <div className="px-4 mx-auto max-w-[380px]">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          <defs>
            {/* Multi-stop horizontal gradient: Red -> Orange -> Light Green -> Green */}
            <linearGradient
              id="organicWeightGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="75%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            
            {/* Gradient for the line stroke */}
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            
            <clipPath id="revealClip">
              <rect
                x={padding.left}
                y={0}
                width={animate ? innerWidth + 10 : 0}
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
              fill="#9ca3af"
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              {w}
            </text>
          ))}

          {/* Very faint horizontal grid lines - no dashes */}
          {yTicks.map((w) => (
            <line
              key={`grid-${w}`}
              x1={padding.left}
              y1={y(w)}
              x2={padding.left + innerWidth}
              y2={y(w)}
              stroke="#e5e7eb"
              strokeWidth="0.5"
              opacity="0.6"
            />
          ))}

          {/* Animated gradient area under the spline curve */}
          <g clipPath="url(#revealClip)">
            <path d={areaD} fill="url(#organicWeightGradient)" opacity={0.85} />
          </g>

          {/* Animated spline curve - solid green stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#16a34a"
            strokeWidth="3.5"
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
            y={chartHeight - 6}
            textAnchor="middle"
            fill="#6b7280"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            {startDateStr}
          </text>
          <text
            x={x(1)}
            y={chartHeight - 6}
            textAnchor="middle"
            fill="#6b7280"
            style={{ fontSize: 12, fontWeight: 500 }}
          >
            {endDateStr}
          </text>

          {/* Goal marker with speech-bubble tooltip */}
          <g
            style={{
              opacity: showGoal ? 1 : 0,
              transform: showGoal ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* End point circle */}
            <circle
              cx={endX}
              cy={endY}
              r="5"
              fill="#ffffff"
              stroke="#16a34a"
              strokeWidth="2.5"
            />
            
            {/* Speech bubble tooltip */}
            <g transform={`translate(${bubbleX}, ${bubbleY})`}>
              {/* Bubble body */}
              <rect
                x="0"
                y="0"
                width={bubbleWidth}
                height={bubbleHeight}
                rx="6"
                ry="6"
                fill="#16a34a"
              />
              {/* Arrow pointing left */}
              <polygon
                points={`0,${bubbleHeight / 2} -${bubbleArrowSize},${bubbleHeight / 2 - 4} -${bubbleArrowSize},${bubbleHeight / 2 + 4}`}
                fill="#16a34a"
              />
              {/* Text */}
              <text
                x={bubbleWidth / 2}
                y="13"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 10, fontWeight: 600 }}
              >
                Goal
              </text>
              <text
                x={bubbleWidth / 2}
                y="27"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 13, fontWeight: 700 }}
              >
                {targetWeight} kg
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Good news box - light green background */}
      <div
        className="rounded-xl px-5 py-4 text-left max-w-[380px] mx-auto"
        style={{
          backgroundColor: "#E8F5E9",
          opacity: showGoodNews ? 1 : 0,
          transform: showGoodNews ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <p className="text-[15px] font-semibold text-[#16a34a] flex items-center gap-2 mb-1">
          <span className="text-[18px]">🙌</span>
          Good news!
        </p>
        <p className="text-[14px] text-[#374151] leading-relaxed">
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
