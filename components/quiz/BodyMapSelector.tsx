"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { Gender } from "@/types";

interface BodyPart {
  id: string;
  label: string;
  /** Position of the checkbox label relative to the image container */
  position: { top: string; left?: string; right?: string };
}

/**
 * Same body parts for both genders, positioned to alternate left/right
 * matching the screenshot layout.
 */
const bodyParts: BodyPart[] = [
  { id: "arms",  label: "Arms",  position: { top: "18%", left: "0" } },
  { id: "chest", label: "Chest", position: { top: "18%", right: "0" } },
  { id: "back",  label: "Back",  position: { top: "36%", left: "0" } },
  { id: "belly", label: "Belly", position: { top: "36%", right: "0" } },
  { id: "butt",  label: "Butt",  position: { top: "54%", left: "0" } },
  { id: "legs",  label: "Legs",  position: { top: "54%", right: "0" } },
];

interface BodyMapSelectorProps {
  gender: Gender;
  selected: string[];
  onChange: (id: string) => void;
}

export function BodyMapSelector({ gender, selected, onChange }: BodyMapSelectorProps) {
  const imageSrc = gender === "female"
    ? "/images/bodymap/female-base.png"
    : "/images/bodymap/male-base.png";

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ minHeight: "460px" }}>
      {/* Center image */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[220px] h-[440px]">
        <Image
          src={imageSrc}
          alt={`${gender} body`}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Checkbox labels positioned around the image */}
      {bodyParts.map((part) => {
        const isSelected = selected.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onChange(part.id)}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border text-[14px] font-medium transition-all z-10"
            style={{
              top: part.position.top,
              left: part.position.left,
              right: part.position.right,
              borderColor: isSelected ? "var(--brand)" : "#e5e7eb",
            }}
          >
            <div
              className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors"
              style={{
                backgroundColor: isSelected ? "var(--brand)" : "white",
                borderColor: isSelected ? "var(--brand)" : "#d1d5db",
              }}
            >
              {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span style={{ color: isSelected ? "var(--brand)" : "#374151" }}>
              {part.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
