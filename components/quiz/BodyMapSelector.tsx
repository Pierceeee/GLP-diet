"use client";

import { Check } from "lucide-react";
import type { Gender } from "@/types";

interface BodyPartZone {
  top: string;
  left: string;
  width: string;
  height: string;
}

interface BodyPart {
  id: string;
  label: string;
  /** Position of the checkbox label relative to the image container */
  position: { top: string; left?: string; right?: string };
  /** Highlight zone(s) over the body image (percentage-based) - can have multiple zones */
  zones: BodyPartZone[];
}

/**
 * Body parts with gender-specific zone positioning
 */
const maleBodyParts: BodyPart[] = [
  {
    id: "arms",
    label: "Arms",
    position: { top: "22%", left: "0" },
    zones: [
      { top: "20%", left: "30%", width: "12%", height: "22%" },
      { top: "20%", left: "58%", width: "12%", height: "22%" },
    ],
  },
  {
    id: "chest",
    label: "Chest",
    position: { top: "22%", right: "0" },
    zones: [{ top: "18%", left: "38%", width: "24%", height: "14%" }],
  },
  {
    id: "back",
    label: "Back",
    position: { top: "38%", left: "0" },
    zones: [{ top: "28%", left: "38%", width: "24%", height: "12%" }],
  },
  {
    id: "belly",
    label: "Belly",
    position: { top: "38%", right: "0" },
    zones: [{ top: "36%", left: "40%", width: "20%", height: "12%" }],
  },
  {
    id: "butt",
    label: "Butt",
    position: { top: "52%", left: "0" },
    zones: [{ top: "44%", left: "38%", width: "24%", height: "10%" }],
  },
  {
    id: "legs",
    label: "Legs",
    position: { top: "52%", right: "0" },
    zones: [{ top: "50%", left: "34%", width: "32%", height: "40%" }],
  },
];

const femaleBodyParts: BodyPart[] = [
  {
    id: "arms",
    label: "Arms",
    position: { top: "22%", left: "0" },
    zones: [
      { top: "28%", left: "38%", width: "8%", height: "20%" },
      { top: "24%", left: "56%", width: "10%", height: "16%" },
    ],
  },
  {
    id: "chest",
    label: "Chest",
    position: { top: "22%", right: "0" },
    zones: [{ top: "18%", left: "42%", width: "16%", height: "12%" }],
  },
  {
    id: "back",
    label: "Back",
    position: { top: "38%", left: "0" },
    zones: [{ top: "26%", left: "42%", width: "16%", height: "10%" }],
  },
  {
    id: "belly",
    label: "Belly",
    position: { top: "38%", right: "0" },
    zones: [{ top: "32%", left: "42%", width: "14%", height: "12%" }],
  },
  {
    id: "butt",
    label: "Butt",
    position: { top: "52%", left: "0" },
    zones: [{ top: "40%", left: "40%", width: "18%", height: "10%" }],
  },
  {
    id: "legs",
    label: "Legs",
    position: { top: "52%", right: "0" },
    zones: [{ top: "48%", left: "34%", width: "28%", height: "42%" }],
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
  
  const bodyParts = gender === "female" ? femaleBodyParts : maleBodyParts;

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ minHeight: "700px" }}>
      {/* Center image with highlight overlays */}
      <div className="flex justify-center">
        <div className="relative" style={{ width: "100%", maxWidth: "500px", aspectRatio: "1 / 1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${gender} body`}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Highlight overlay zones */}
          {bodyParts.map((part) => {
            const isSelected = selected.includes(part.id);
            return part.zones.map((zone, zoneIndex) => (
              <button
                key={`zone-${part.id}-${zoneIndex}`}
                onClick={() => onChange(part.id)}
                aria-label={`Select ${part.label}`}
                className="absolute rounded-[20px] cursor-pointer"
                style={{
                  top: zone.top,
                  left: zone.left,
                  width: zone.width,
                  height: zone.height,
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
            ));
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
