"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Gender } from "@/types";

const BODY_AREAS = ["arms", "chest", "back", "belly", "butt", "legs"];

const AREA_LABELS: Record<string, string> = {
  arms: "Arms",
  chest: "Chest",
  back: "Back",
  belly: "Belly",
  butt: "Butt",
  legs: "Legs",
};

type DotPosition = {
  x: number;
  y: number;
};

const FEMALE_DOT_POSITIONS: Record<string, DotPosition> = {
  arms: { x: 64, y: 31 },
  chest: { x: 50, y: 28 },
  back: { x: 57, y: 36 },
  belly: { x: 51, y: 37 },
  legs: { x: 41, y: 72 },
  butt: { x: 60, y: 47 },
};

const MALE_DOT_POSITIONS: Record<string, DotPosition> = {
  arms: { x: 37, y: 30 },
  chest: { x: 47, y: 27 },
  back: { x: 59, y: 36 },
  belly: { x: 49, y: 38 },
  legs: { x: 41, y: 80 },
  butt: { x: 39, y: 51 },
};

function LabelChip({
  area,
  label,
  selected,
  onClick,
}: {
  area: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full min-w-[110px] items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:min-w-[140px] sm:px-4 sm:py-3 sm:text-base ${
        selected
          ? "bg-[#e6f5f8] border-2 border-[#0097b2]"
          : "bg-[#f0f0f0] border-2 border-transparent hover:bg-[#e8e8e8]"
      }`}
    >
      <span className="text-[var(--text)] font-medium">{label}</span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all sm:h-6 sm:w-6 ${
          selected ? "bg-[#0097b2]" : "bg-white border-2 border-[#d0d0d0]"
        }`}
      >
        {selected && (
          <svg
            className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6L5 8.5L9.5 3.5" />
          </svg>
        )}
      </span>
    </button>
  );
}

interface BodyHighlightProps {
  gender: Gender;
  selectedAreas: string[];
  onToggle: (area: string) => void;
}

export function BodyHighlight({
  gender,
  selectedAreas,
  onToggle,
}: BodyHighlightProps) {
  const imageSrc =
    gender === "male"
      ? "/images/bodymap/male-body.png"
      : "/images/bodymap/female-body.png";
  const dotPositions =
    gender === "male" ? MALE_DOT_POSITIONS : FEMALE_DOT_POSITIONS;

  const containerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const [lines, setLines] = useState<
    { chipRight: number; chipCenterY: number; dotX: number; dotY: number }[]
  >([]);

  const getRenderedImageBounds = useCallback(() => {
    const imgEl = imgElRef.current;
    if (!imgEl) return null;

    const imgRect = imgEl.getBoundingClientRect();
    const naturalW = imgEl.naturalWidth || 1;
    const naturalH = imgEl.naturalHeight || 1;

    const containerW = imgRect.width;
    const containerH = imgRect.height;
    const scale = Math.min(containerW / naturalW, containerH / naturalH);
    const renderedW = naturalW * scale;
    const renderedH = naturalH * scale;
    const offsetX = imgRect.left + (containerW - renderedW) / 2;
    const offsetY = imgRect.top + (containerH - renderedH) / 2;

    return {
      x: offsetX,
      y: offsetY,
      width: renderedW,
      height: renderedH,
    };
  }, []);

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    const chips = chipsRef.current;
    if (!container || !chips) return;

    const bounds = getRenderedImageBounds();
    if (!bounds) return;

    const containerRect = container.getBoundingClientRect();
    const chipButtons = chips.querySelectorAll("button");
    const newLines: typeof lines = [];

    chipButtons.forEach((btn, i) => {
      const area = BODY_AREAS[i];
      const dot = dotPositions[area];
      const btnRect = btn.getBoundingClientRect();

      const chipRight = btnRect.right - containerRect.left;
      const chipCenterY = btnRect.top + btnRect.height / 2 - containerRect.top;

      const dotX = bounds.x - containerRect.left + (dot.x / 100) * bounds.width;
      const dotY = bounds.y - containerRect.top + (dot.y / 100) * bounds.height;

      newLines.push({ chipRight, chipCenterY, dotX, dotY });
    });

    setLines(newLines);
  }, [dotPositions, getRenderedImageBounds]);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgElRef.current = e.currentTarget;
      recalculate();
    },
    [recalculate],
  );

  useEffect(() => {
    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, [recalculate]);

  useEffect(() => {
    const timer = setTimeout(recalculate, 300);
    return () => clearTimeout(timer);
  }, [recalculate, gender]);

  return (
    <div ref={containerRef} className="relative flex w-full items-center gap-4 sm:gap-8">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ overflow: "visible" }}
      >
        {lines.map((line, i) => {
          const area = BODY_AREAS[i];
          const isSelected = selectedAreas.includes(area);
          const midX = line.chipRight + (line.dotX - line.chipRight) * 0.45;

          return (
            <g key={area}>
              <path
                d={`M ${line.chipRight} ${line.chipCenterY} 
                    C ${midX} ${line.chipCenterY}, 
                      ${midX} ${line.dotY}, 
                      ${line.dotX} ${line.dotY}`}
                stroke={isSelected ? "#0097b2" : "#d0d0d0"}
                strokeWidth="1.5"
                fill="none"
                className="transition-all duration-300"
              />
              <circle
                cx={line.dotX}
                cy={line.dotY}
                r="5"
                fill={isSelected ? "#0097b2" : "#9ca3af"}
                stroke={isSelected ? "#007f96" : "#6b7280"}
                strokeWidth="1"
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      <div ref={chipsRef} className="flex flex-col justify-center gap-2 sm:gap-2.5 shrink-0">
        {BODY_AREAS.map((area) => (
          <LabelChip
            key={area}
            area={area}
            label={AREA_LABELS[area]}
            selected={selectedAreas.includes(area)}
            onClick={() => onToggle(area)}
          />
        ))}
      </div>

      <div className="relative flex-1 max-w-[280px] sm:max-w-[340px]">
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={imageSrc}
            alt="Body areas"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 280px, 340px"
            priority
            onLoad={onImageLoad}
          />
        </div>
      </div>
    </div>
  );
}
