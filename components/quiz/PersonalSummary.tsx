"use client";

import { useState, useEffect } from "react";
import type { QuizAnswers, Gender } from "@/types";
import { calculateBMI } from "@/lib/utils";

interface PersonalSummaryProps {
  answers: QuizAnswers;
  gender: Gender;
}

export function PersonalSummary({ answers, gender }: PersonalSummaryProps) {
  const weight = (answers.weight as number) || 100;
  const height = (answers.height as number) || 170;
  const age = (answers.age as number) || 30;
  const activity = (answers["daily-activity"] as string) || "";
  const energy = (answers["energy-level"] as string) || "";
  const goals = (answers.goals as string[]) || [];

  const bmi = calculateBMI(height, weight);

  // BMI ranges with equal visual widths so category position is clearer.
  const segments = [
    { min: 15, max: 18.5, width: 25 }, // Underweight
    { min: 18.5, max: 25, width: 25 }, // Healthy
    { min: 25, max: 30, width: 25 }, // Overweight
    { min: 30, max: 42, width: 25 }, // Obese
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

  const pct = calculatePosition(bmi);
  const markerPct = Math.min(Math.max(pct, 2), 98);

  // Animation state
  const [animated, setAnimated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Start gauge animation after mount
    const t1 = setTimeout(() => setAnimated(true), 300);
    // Show BMI message after gauge animates
    const t2 = setTimeout(() => setShowMessage(true), 1200);
    // Show stats card after message
    const t3 = setTimeout(() => setShowStats(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // BMI category info
  const getBmiMessage = () => {
    if (bmi < 18.5) {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmi.toFixed(1)}, which falls below the typical range`,
        description: null,
      };
    } else if (bmi < 25) {
      return {
        emoji: "👌",
        title: "A good starting BMI for building a fit body",
        description: "Research shows that a GLP-1\u2013focused diet can support metabolism, promote weight loss, improve muscle strength, and contribute to better overall health.",
      };
    } else if (bmi < 30) {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmi.toFixed(1)}, which is above the typical range`,
        description: "This means your weight is slightly higher than recommended for your height.\n\nWe\u2019ll use your BMI to create a personalized weight-loss plan designed specifically for you.",
      };
    } else {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmi.toFixed(1)}, which is considered obese`,
        description: "There\u2019s a lot you could gain by losing a little weight. We\u2019ll use your BMI to create the weight loss program you need.",
      };
    }
  };

  // Pick body image based on BMI and gender
  const getBodyImage = () => {
    const isObese = bmi >= 25;
    if (gender === "female") {
      return isObese ? "/images/summary-obese-female.png" : "/images/summary-normal-female.png";
    }
    return isObese ? "/images/summary-obese-male.png" : "/images/summary-normal-male.png";
  };

  // Body fat estimate based on BMI, age, gender
  const getBodyFat = () => {
    const isMale = gender === "male";
    const fat = 1.2 * bmi + 0.23 * age - (isMale ? 16.2 : 5.4);
    return Math.max(5, Math.min(55, parseFloat(fat.toFixed(2))));
  };

  const activityLabels: Record<string, string> = {
    "desk-based": "Low",
    "very-active": "High",
    "train-often": "Medium",
    "home-focused": "Low",
  };

  const energyLabels: Record<string, string> = {
    "low-all-day": "Low",
    "post-lunch-slump": "Medium",
    "tired-before-meals": "Low",
    "stable-high": "High",
  };

  const goalLabels: Record<string, string> = {
    "weight-control": "Manage weight",
    "body-toning": "Body toning",
    "overall-health": "Overall health",
    "natural-glp1": "Natural GLP-1 support",
    "medication-support": "Medication support",
    "metabolic-health": "Metabolic health",
    "energy-levels": "Energy levels",
    "gut-health": "Gut health",
  };

  const bmiMessage = getBmiMessage();
  const bodyFat = getBodyFat();
  const displayGoals = goals.length > 0 
    ? goals.map(g => goalLabels[g] || g) 
    : ["Manage weight"];

  return (
    <div className="space-y-4">
      {/* BMI Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 w-full mx-auto text-left">
        <h3 className="text-[16px] font-bold mb-6">Body Mass Index (BMI)</h3>

        {/* Badge + Gauge */}
        <div className="mb-2 mt-8">
          {/* Bar container - relative for positioning badge and dot */}
          <div className="relative">
            {/* Badge */}
            <div
              className="absolute -top-7 flex flex-col items-center"
              style={{
                left: animated ? `${markerPct}%` : "0%",
                transform: "translateX(-50%)",
                transition: "left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                opacity: animated ? 1 : 0,
                transitionProperty: "left, opacity",
                transitionDuration: "0.8s, 0.3s",
              }}
            >
              <span className="text-[11px] font-bold text-white bg-red-500 px-2.5 py-1 rounded-md whitespace-nowrap">
                You - {bmi.toFixed(1)}
              </span>
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-red-500" />
            </div>
                {/* Bar - equal-width category segments */}
            <div className="h-[10px] rounded-full overflow-hidden flex">
              <div className="bg-blue-400 rounded-l-full" style={{ width: "25%" }} />
              <div className="bg-green-400" style={{ width: "25%" }} />
              <div className="bg-yellow-400" style={{ width: "25%" }} />
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-r-full" style={{ width: "25%" }} />
            </div>
            {/* Dot */}
            <div
              className="absolute top-1/2 w-[14px] h-[14px] rounded-full bg-white border-[2.5px] border-red-500 shadow"
              style={{
                left: animated ? `${markerPct}%` : "0%",
                transform: "translate(-50%, -50%)",
                transition: "left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>
        </div>

        {/* Labels — aligned to equal-width gauge segments */}
        <div className="flex text-[11px] text-[var(--text-muted)] mt-2">
          <span className="text-center" style={{ width: "25%" }}>Underweight</span>
          <span className="text-center" style={{ width: "25%" }}>Healthy</span>
          <span className="text-center" style={{ width: "25%" }}>Overweight</span>
          <span className="text-center" style={{ width: "25%" }}>Obese</span>
        </div>
      </div>

      {/* BMI Message */}
      <div
        className="bg-red-50 rounded-2xl border border-red-100 px-5 py-4 w-full mx-auto text-left"
        style={{
          opacity: showMessage ? 1 : 0,
          transform: showMessage ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <p className="text-[14px] font-semibold text-gray-900">
          <span className="mr-1.5">{bmiMessage.emoji}</span>
          {bmiMessage.title}
        </p>
        {bmiMessage.description && (
          <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed whitespace-pre-line italic">
            {bmiMessage.description}
          </p>
        )}
      </div>

      {/* Stats + Body Image Card */}
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 w-full mx-auto overflow-hidden"
        style={{
          opacity: showStats ? 1 : 0,
          transform: showStats ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div className="flex items-center">
          {/* Left: Stats */}
          <div className="flex-1 space-y-4">
            {/* Body Fat */}
            <div>
              <p className="text-[12px] text-[var(--text-muted)] mb-0.5">Body fat</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[16px]">🔍</span>
                <span className="text-[18px] font-bold text-gray-900">{bodyFat}%</span>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <p className="text-[12px] text-[var(--text-muted)] mb-0.5">Activity level</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[16px]">📊</span>
                <span className="text-[18px] font-bold text-gray-900">{activityLabels[activity] || "Low"}</span>
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <p className="text-[12px] text-[var(--text-muted)] mb-0.5">Energy level</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[16px]">🥱</span>
                <span className="text-[18px] font-bold text-gray-900">{energyLabels[energy] || "Low"}</span>
              </div>
            </div>

            {/* Goals */}
            <div>
              <p className="text-[12px] text-[var(--text-muted)] mb-0.5">{displayGoals.length > 1 ? "Goals" : "Goal"}</p>
              <div className="space-y-1">
                {displayGoals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className="text-[16px]">🔥</span>
                    <span className="text-[18px] font-bold text-gray-900">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Body Image */}
          <div className="flex-shrink-0 ml-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getBodyImage()}
              alt={`${gender} body`}
              className="w-52 sm:w-64 h-auto rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
