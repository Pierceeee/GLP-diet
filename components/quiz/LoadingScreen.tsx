"use client";

import { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { loadingMessages } from "@/config/questions";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => { if (p >= 100) { clearInterval(iv); return 100; } return p + 1; });
    }, 80);
    loadingMessages.forEach((m, i) => {
      setTimeout(() => setDone((d) => [...d, i]), m.delay + 1500);
    });
    const t = setTimeout(onComplete, 8500);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onComplete]);

  const R = 58;
  const C = 2 * Math.PI * R;

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6">
      {/* Circle */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={R} stroke="var(--border)" strokeWidth="4" fill="none" />
          <circle
            cx="64" cy="64" r={R}
            stroke="var(--brand)" strokeWidth="4" fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct / 100)}
            className="transition-all duration-100 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[28px] font-bold text-[var(--brand)]" style={{ fontFamily: "var(--font-heading)" }}>
            {pct}%
          </span>
        </div>
      </div>

      <h2 className="text-[22px] font-bold mb-8" style={{ fontFamily: "var(--font-heading)" }}>
        Generating...
      </h2>

      <div className="space-y-4 w-full max-w-[440px]">
        {loadingMessages.map((m, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-3 transition-opacity duration-300 ${
              done.includes(i) ? "opacity-100" : "opacity-0"
            }`}
          >
            <CircleCheck
              className="w-5 h-5 flex-shrink-0 text-[var(--brand)]"
              strokeWidth={2}
            />
            <span className="text-[14px] text-[var(--text)]">
              {m.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
