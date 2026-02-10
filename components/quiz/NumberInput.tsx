"use client";

import { useState, useEffect } from "react";
import { calculateBMI, getBMICategory } from "@/lib/utils";

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  showBMI?: boolean;
  height?: number;
  showWeightLossPercent?: boolean;
  currentWeight?: number;
}

export function NumberInput({
  value, onChange, placeholder = "0", unit = "", min, max,
  showBMI = false, height, showWeightLossPercent = false, currentWeight,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || "");
  const [metric, setMetric] = useState(true);

  useEffect(() => { setInputValue(value?.toString() || ""); }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num)) onChange(num);
    else if (raw === "") onChange(null);
  };

  const bmi = showBMI && height && value ? calculateBMI(height, value) : null;
  const bmiCat = bmi ? getBMICategory(bmi) : null;
  const lossPct = showWeightLossPercent && currentWeight && value
    ? Math.round(((currentWeight - value) / currentWeight) * 100) : null;

  const showToggle = unit === "cm" || unit === "kg";
  const dispUnit = metric ? unit : unit === "cm" ? "in" : unit === "kg" ? "lbs" : unit;

  return (
    <div className="space-y-6">
      {showToggle && (
        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-gray-100 p-0.5">
            <button
              type="button"
              onClick={() => setMetric(false)}
              className={`px-5 py-2 text-[13px] font-semibold rounded-full transition-all ${
                !metric ? "bg-[var(--brand)] text-white shadow-sm" : "text-gray-500"
              }`}
            >
              {unit === "cm" ? "in" : "lbs"}
            </button>
            <button
              type="button"
              onClick={() => setMetric(true)}
              className={`px-5 py-2 text-[13px] font-semibold rounded-full transition-all ${
                metric ? "bg-[var(--brand)] text-white shadow-sm" : "text-gray-500"
              }`}
            >
              {unit}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-baseline justify-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus
          className="w-28 text-center text-[48px] font-bold text-[var(--text)]
                     border-b-2 border-gray-200 focus:border-[var(--brand)]
                     outline-none transition-colors bg-transparent
                     placeholder:text-gray-200 pb-1"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <span className="text-[18px] text-[var(--text-muted)]">{dispUnit}</span>
      </div>

      {value !== null && min !== undefined && max !== undefined && (value < min || value > max) && (
        <p className="text-center text-[13px] text-red-500">
          Please enter a value between {min} and {max} {unit}
        </p>
      )}

      {showBMI && bmi && bmiCat && (
        <div className="bg-[var(--danger-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="text-red-600 font-bold mr-1.5">!</span>
            <span className="font-semibold">Your BMI is {bmi.toFixed(1)}</span>
            <span className="text-[var(--text-secondary)]">, which is considered </span>
            <span className="font-semibold">{bmiCat.toLowerCase()}</span>
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            There&apos;s a lot you could gain by losing a little weight. We&apos;ll use your BMI to create the weight loss program you need.
          </p>
        </div>
      )}

      {showWeightLossPercent && lossPct !== null && lossPct > 0 && (
        <div className="bg-[var(--info-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="mr-1.5">👆</span>
            <span className="font-semibold text-[var(--info-text)]">
              {lossPct > 20 ? "Challenging goal" : "Achievable goal"}:
            </span>
            <span className="text-[var(--text-secondary)]"> lose {lossPct}% of your weight</span>
          </p>
        </div>
      )}
    </div>
  );
}
