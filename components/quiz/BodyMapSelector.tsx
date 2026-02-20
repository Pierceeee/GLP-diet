"use client";

import { Check } from "lucide-react";
import type { Gender } from "@/types";

interface BodyPart {
  id: string;
  label: string;
  /** Position of the checkbox label relative to the image container */
  position: { top: string; left?: string; right?: string };
  /** Highlight zone over the body image (percentage-based) */
  zone: { top: string; left: string; width: string; height: string };
}

/**
 * Same body parts for both genders, positioned to alternate left/right
 * matching the screenshot layout.
 */
const bodyParts: BodyPart[] = [
  {
    id: "arms",
    label: "Arms",
    position: { top: "15%", left: "0" },
    zone: { top: "20%", left: "14%", width: "14%", height: "20%" },
  },
  {
    id: "chest",
    label: "Chest",
    position: { top: "15%", right: "0" },
    zone: { top: "20%", left: "36%", width: "28%", height: "10%" },
  },
  {
    id: "back",
    label: "Back",
    position: { top: "35%", left: "0" },
    zone: { top: "30%", left: "36%", width: "28%", height: "10%" },
  },
  {
    id: "belly",
    label: "Belly",
    position: { top: "35%", right: "0" },
    zone: { top: "40%", left: "38%", width: "24%", height: "10%" },
  },
  {
    id: "butt",
    label: "Butt",
    position: { top: "55%", left: "0" },
    zone: { top: "50%", left: "36%", width: "28%", height: "8%" },
  },
  {
    id: "legs",
    label: "Legs",
    position: { top: "55%", right: "0" },
    zone: { top: "58%", left: "30%", width: "40%", height: "30%" },
  },
];

interface BodyMapSelectorProps {
  gender: Gender;
  selected: string[];
  onChange: (id: string) => void;
}

export function BodyMapSelector({ gender, selected, onChange }: BodyMapSelectorProps) {
  const imageSrc = gender === "female"
    ? "/images/bodymap/female-body.png"
    : "/images/bodymap/male-body.png";

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ minHeight: "700px" }}>
      {/* Center image with highlight overlays */}
      <div className="flex justify-center">
        <div className="relative" style={{ width: "100%", maxWidth: "500px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${gender} body`}
            style={{ width: "100%", height: "auto" }}
          />

          {/* Highlight overlay zones */}
          {bodyParts.map((part) => {
            const isSelected = selected.includes(part.id);
            return (
              <button
                key={`zone-${part.id}`}
                onClick={() => onChange(part.id)}
                aria-label={`Select ${part.label}`}
                className="absolute rounded-[20px] cursor-pointer"
                style={{
                  top: part.zone.top,
                  left: part.zone.left,
                  width: part.zone.width,
                  height: part.zone.height,
                  backgroundColor: isSelected
                    ? "rgba(0, 166, 153, 0.2)"
                    : "transparent",
                  border: isSelected
                    ? "2.5px solid rgba(0, 166, 153, 0.5)"
                    : "2.5px solid transparent",
                  boxShadow: isSelected
                    ? "0 0 20px 6px rgba(0, 166, 153, 0.2), inset 0 0 16px rgba(0, 166, 153, 0.1)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Checkbox labels positioned around the image */}
      {bodyParts.map((part) => {
        const isSelected = selected.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onChange(part.id)}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border text-[14px] font-medium z-10"
            style={{
              top: part.position.top,
              left: part.position.left,
              right: part.position.right,
              borderColor: isSelected ? "var(--brand)" : "#e5e7eb",
              transform: isSelected ? "scale(1.05)" : "scale(1)",
              boxShadow: isSelected
                ? "0 4px 12px rgba(0, 166, 153, 0.2)"
                : "0 1px 2px rgba(0,0,0,0.05)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border-2"
              style={{
                backgroundColor: isSelected ? "var(--brand)" : "white",
                borderColor: isSelected ? "var(--brand)" : "#d1d5db",
                transition: "all 0.2s ease",
              }}
            >
              {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span
              style={{
                color: isSelected ? "var(--brand)" : "#374151",
                transition: "color 0.2s ease",
              }}
            >
              {part.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
