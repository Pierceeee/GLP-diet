"use client";

import { useEffect, useState } from "react";
import { ContinueButton } from "./ContinueButton";

interface WeightLossMultiplierChartProps {
  onContinue: () => void;
}

export function WeightLossMultiplierChart({ onContinue }: WeightLossMultiplierChartProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const BAR_MAX_HEIGHT = 140;
  const OTHER_DIETS_HEIGHT = 45;
  const GLP_HEIGHT = 135;

  return (
    <div className="space-y-6 pb-24">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm max-w-lg mx-auto">
        <div className="px-6 py-6">
          {/* Title */}
          <h3
            className="text-[22px] font-extrabold mb-1 leading-tight text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lose <span className="text-[var(--brand)]">three times more</span> weight
          </h3>
          <p className="text-[15px] text-[var(--text-secondary)] text-center mb-6">
            with our personalized plan vs. other meal plans
          </p>

          {/* Chart container */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-6">
              Weight loss rate
            </p>

            {/* Chart with bars */}
            <div className="flex justify-center gap-12">
              {/* Other diets column */}
              <div className="flex flex-col items-center w-[100px]">
                {/* Bar area with fixed height */}
                <div 
                  className="w-full flex flex-col justify-end items-center"
                  style={{ height: `${BAR_MAX_HEIGHT}px` }}
                >
                  {/* Bar */}
                  <div
                    className="w-[72px] rounded-t-lg transition-all duration-1000 ease-out"
                    style={{
                      height: animate ? `${OTHER_DIETS_HEIGHT}px` : "0px",
                      backgroundColor: "#F87171",
                    }}
                  />
                </div>
                {/* Label */}
                <p className="mt-3 text-[12px] font-semibold text-white bg-[#F87171] px-3 py-1.5 rounded-full whitespace-nowrap">
                  Other diets
                </p>
              </div>

              {/* GLP Coaching Program column */}
              <div className="flex flex-col items-center w-[100px]">
                {/* Bar area with fixed height */}
                <div 
                  className="w-full flex flex-col justify-end items-center relative"
                  style={{ height: `${BAR_MAX_HEIGHT}px` }}
                >
                  {/* 3x Badge - positioned above bar */}
                  <div
                    className="absolute left-1/2 transition-all duration-500 flex items-center"
                    style={{
                      bottom: animate ? `${GLP_HEIGHT + 8}px` : "0px",
                      opacity: animate ? 1 : 0,
                      transform: "translateX(-50%)",
                      transitionDelay: "600ms",
                    }}
                  >
                    <span className="text-[22px] font-bold text-[var(--brand)]">3x</span>
                    <span className="ml-0.5 text-[18px]">🎉</span>
                  </div>
                  {/* Bar */}
                  <div
                    className="w-[72px] rounded-t-lg transition-all duration-1000 ease-out"
                    style={{
                      height: animate ? `${GLP_HEIGHT}px` : "0px",
                      backgroundColor: "#22C55E",
                      transitionDelay: "200ms",
                    }}
                  />
                </div>
                {/* Label */}
                <p className="mt-3 text-[12px] font-semibold text-white bg-[#22C55E] px-3 py-1.5 rounded-full whitespace-nowrap">
                  GLP Program
                </p>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-[11px] text-[var(--text-secondary)] text-center mt-6">
              Based on a 4 week study of GLP Coaching Program users
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-[660px] mx-auto">
          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        </div>
      </div>
    </div>
  );
}
