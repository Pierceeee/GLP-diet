"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import type { Gender } from "@/types";

interface BodyPartDef {
  id: string;
  label: string;
  position: { top: string; left?: string; right?: string };
  lineEndpoint?: { x: number; y: number }; // SVG coordinates for the line connection
}

/*
 * SVG paths precisely mapped to the actual body images.
 * Coordinates based on 1000×1000 viewBox matching the body image dimensions.
 * Refined for organic muscle shapes and smoother contours.
 */

const MALE_SVG_PATHS: Record<string, string[]> = {
  arms: [
    // Left Arm (Deltoid + Bicep/Tricep + Forearm) - Hand on hip
    `M 360,185
     C 335,195 295,250 300,340
     C 305,390 325,435 355,465
     C 370,450 385,430 395,390
     C 390,340 400,290 410,240
     C 390,220 375,200 360,185 Z`,
    // Right Arm - Hand on hip
    `M 640,185
     C 665,195 705,250 700,340
     C 695,390 675,435 645,465
     C 630,450 615,430 605,390
     C 610,340 600,290 590,240
     C 610,220 625,200 640,185 Z`,
  ],
  chest: [
    // Left Pec
    `M 420,210
     C 410,240 415,280 435,305
     C 460,315 485,310 498,290
     C 498,250 495,220 485,200
     C 460,195 435,200 420,210 Z`,
    // Right Pec
    `M 580,210
     C 590,240 585,280 565,305
     C 540,315 515,310 502,290
     C 502,250 505,220 515,200
     C 540,195 565,200 580,210 Z`,
  ],
  back: [
    // Left Lat - Continuous V-shape
    `M 390,300
     C 375,340 370,400 380,440
     C 395,450 415,440 420,410
     C 420,380 410,330 390,300 Z`,
    // Right Lat
    `M 610,300
     C 625,340 630,400 620,440
     C 605,450 585,440 580,410
     C 580,380 590,330 610,300 Z`,
  ],
  belly: [
    // 6-pack grid - Organic Shapes
    // Top Left Abs
    `M 445,330 C 435,340 435,370 445,385 C 465,390 485,385 495,380 L 495,330 C 480,325 460,325 445,330 Z`,
    // Top Right Abs
    `M 555,330 C 565,340 565,370 555,385 C 535,390 515,385 505,380 L 505,330 C 520,325 540,325 555,330 Z`,
    // Mid Left Abs
    `M 445,395 C 438,405 438,445 450,460 C 470,465 490,460 495,455 L 495,390 C 480,395 460,395 445,395 Z`,
    // Mid Right Abs
    `M 555,395 C 562,405 562,445 550,460 C 530,465 510,460 505,455 L 505,390 C 520,395 540,395 555,395 Z`,
    // Lower Abs Left
    `M 455,470 C 450,485 455,515 465,530 C 480,535 495,530 495,525 L 495,465 C 480,470 465,465 455,470 Z`,
    // Lower Abs Right
    `M 545,470 C 550,485 545,515 535,530 C 520,535 505,530 505,525 L 505,465 C 520,470 535,465 545,470 Z`,
  ],
  butt: [
    // Hips/Glutes - Smooth side contour
    // Left
    `M 375,500
     C 360,530 355,580 370,620
     C 390,630 420,620 425,580
     C 425,540 405,510 375,500 Z`,
    // Right
    `M 625,500
     C 640,530 645,580 630,620
     C 610,630 580,620 575,580
     C 575,540 595,510 625,500 Z`,
  ],
  legs: [
    // Left Leg - Single continuous form-fitting shape
    `M 395,620
     C 380,680 385,780 395,850
     C 400,900 415,940 435,950
     C 455,940 465,900 465,850
     C 465,780 460,680 445,620
     C 430,600 410,600 395,620 Z`,
    // Right Leg - Single continuous form-fitting shape
    `M 605,620
     C 620,680 615,780 605,850
     C 600,900 585,940 565,950
     C 545,940 535,900 535,850
     C 535,780 540,680 555,620
     C 570,600 590,600 605,620 Z`,
  ],
};

// Female body highlights - precisely calibrated to body image
// Body center is at x=500, image is 1000x1000
const FEMALE_SVG_PATHS: Record<string, string[]> = {
  arms: [
    // Left arm (her left = image right side, bent with hand on hip)
    // Upper arm from shoulder to elbow
    `M 408,168 Q 395,185 392,230 Q 390,280 398,320 L 418,318 Q 425,275 422,225 Q 418,180 415,170 Z`,
    // Forearm from elbow toward hip  
    `M 395,328 Q 385,355 392,395 Q 400,425 418,435 L 435,428 Q 430,395 422,360 Q 415,332 408,328 Z`,
    
    // Right arm (her right = image left side, hanging down)
    // Upper arm
    `M 572,168 Q 588,188 595,240 Q 600,300 595,360 L 578,358 Q 575,295 578,235 Q 580,185 575,172 Z`,
    // Forearm hanging
    `M 592,368 Q 602,405 605,465 Q 608,520 600,545 L 582,542 Q 578,490 582,430 Q 585,385 588,372 Z`,
  ],
  chest: [
    // Sports bra - left side
    `M 428,195 Q 420,202 420,218 L 420,260 Q 420,275 438,278 L 492,278 Q 500,272 500,258 L 500,218 Q 500,202 488,198 L 438,195 Z`,
    // Sports bra - right side  
    `M 555,195 Q 565,202 565,218 L 565,260 Q 565,275 548,278 L 505,278 Q 498,272 498,258 L 498,218 Q 498,202 510,198 L 548,195 Z`,
  ],
  back: [
    // Left side/oblique at waist
    `M 418,295 Q 408,302 408,318 L 408,368 Q 408,382 422,385 L 448,385 Q 460,378 460,365 L 460,318 Q 460,302 448,295 L 425,295 Z`,
    // Right side/oblique at waist
    `M 562,295 Q 572,302 572,318 L 572,368 Q 572,382 558,385 L 532,385 Q 520,378 520,365 L 520,318 Q 520,302 532,295 L 555,295 Z`,
  ],
  belly: [
    // Upper left ab
    `M 458,295 Q 450,300 450,312 L 450,345 Q 450,358 465,360 L 492,360 Q 500,355 500,345 L 500,312 Q 500,300 488,295 L 465,295 Z`,
    // Upper right ab
    `M 528,295 Q 538,300 538,312 L 538,345 Q 538,358 522,360 L 502,360 Q 495,355 495,345 L 495,312 Q 495,300 508,295 L 522,295 Z`,
    // Lower left ab
    `M 460,368 Q 452,372 452,385 L 452,418 Q 452,430 468,432 L 492,432 Q 500,428 500,418 L 500,385 Q 500,372 488,368 L 468,368 Z`,
    // Lower right ab
    `M 528,368 Q 538,372 538,385 L 538,418 Q 538,430 522,432 L 502,432 Q 495,428 495,418 L 495,385 Q 495,372 508,368 L 522,368 Z`,
  ],
  butt: [
    // Left hip on leggings
    `M 412,445 Q 395,465 398,520 Q 402,572 432,590 L 475,585 Q 498,562 495,515 Q 490,470 465,450 L 425,445 Z`,
    // Right hip on leggings
    `M 568,445 Q 585,465 582,520 Q 578,572 548,590 L 508,585 Q 485,562 488,515 Q 492,470 518,450 L 558,445 Z`,
  ],
  legs: [
    // Left thigh (front leg)
    `M 395,598 Q 375,645 378,735 Q 382,820 415,848 L 465,845 Q 495,815 492,735 Q 488,655 460,605 L 415,598 Z`,
    // Left calf
    `M 375,862 Q 358,905 368,968 Q 378,1000 412,1000 L 452,998 Q 478,975 472,920 Q 465,870 438,858 L 392,862 Z`,
    
    // Right thigh (back leg)
    `M 575,598 Q 598,645 595,735 Q 592,820 560,848 L 515,845 Q 488,815 490,735 Q 492,655 522,605 L 565,598 Z`,
    // Right calf
    `M 598,862 Q 615,905 605,968 Q 595,1000 562,1000 L 522,998 Q 498,975 502,920 Q 508,870 535,858 L 582,862 Z`,
  ],
};

const FEMALE_PARTS: BodyPartDef[] = [
  { id: "arms", label: "Arms", position: { top: "18%", left: "5%" }, lineEndpoint: { x: 365, y: 270 } },
  { id: "chest", label: "Chest", position: { top: "18%", right: "5%" }, lineEndpoint: { x: 540, y: 235 } },
  { id: "back", label: "Back", position: { top: "32%", left: "5%" }, lineEndpoint: { x: 420, y: 345 } },
  { id: "belly", label: "Belly", position: { top: "32%", right: "5%" }, lineEndpoint: { x: 520, y: 370 } },
  { id: "butt", label: "Butt", position: { top: "46%", left: "5%" }, lineEndpoint: { x: 420, y: 490 } },
  { id: "legs", label: "Legs", position: { top: "60%", right: "5%" }, lineEndpoint: { x: 535, y: 700 } },
];

const MALE_PARTS: BodyPartDef[] = [
  { id: "arms", label: "Arms", position: { top: "18%", left: "5%" }, lineEndpoint: { x: 315, y: 260 } },
  { id: "chest", label: "Chest", position: { top: "18%", right: "5%" }, lineEndpoint: { x: 605, y: 245 } },
  { id: "back", label: "Back", position: { top: "32%", left: "5%" }, lineEndpoint: { x: 380, y: 415 } },
  { id: "belly", label: "Belly", position: { top: "32%", right: "5%" }, lineEndpoint: { x: 575, y: 385 } },
  { id: "butt", label: "Butt", position: { top: "46%", left: "5%" }, lineEndpoint: { x: 380, y: 625 } },
  { id: "legs", label: "Legs", position: { top: "60%", right: "5%" }, lineEndpoint: { x: 630, y: 910 } },
];

interface BodyMapSelectorProps {
  gender: Gender;
  selected: string[];
  onChange: (id: string) => void;
}

const OVERLAY_RENDER_ORDER = ["back", "chest", "belly", "arms", "butt", "legs"];

export function BodyMapSelector({ gender, selected, onChange }: BodyMapSelectorProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const imageSrc =
    gender === "female"
      ? "/images/bodymap/female-body.png"
      : "/images/bodymap/male-body.png";

  const bodyParts = gender === "female" ? FEMALE_PARTS : MALE_PARTS;
  const svgPaths = gender === "female" ? FEMALE_SVG_PATHS : MALE_SVG_PATHS;
  const safeSelected = hasMounted ? selected : [];

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ minHeight: "580px" }}>
      <div className="flex justify-center">
        <div
          className="relative w-full"
          style={{ maxWidth: "400px", aspectRatio: "1 / 1" }}
        >
          {/* Body Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${gender} body`}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* SVG Overlay for Highlights */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ pointerEvents: "none" }}
          >
            {/* Clean, professional highlight style */}
            <defs>
              {/* Solid semi-transparent fill for clean look */}
              <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(120, 140, 140, 0.55)" />
                <stop offset="100%" stopColor="rgba(90, 110, 110, 0.65)" />
              </linearGradient>
            </defs>
            
            {/* Render clean rectangular shapes */}
            {OVERLAY_RENDER_ORDER.map((partId) => {
              const paths = svgPaths[partId];
              if (!paths || paths.length === 0) return null;
              const isActive = safeSelected.includes(partId);
              
              return paths.map((d, i) => (
                <path
                  key={`${partId}-${i}`}
                  d={d}
                  fill={isActive ? "rgba(128, 148, 148, 0.6)" : "transparent"}
                  stroke={isActive ? "rgba(180, 195, 195, 0.5)" : "none"}
                  strokeWidth={isActive ? 1.5 : 0}
                  rx="8"
                  style={{
                    pointerEvents: "auto",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => onChange(partId)}
                />
              ));
            })}
          </svg>
          
          {/* Connecting Lines Overlay removed as per user preference */}

        </div>
      </div>

      {/* Buttons */}
      {bodyParts.map((part) => {
        const isSelected = safeSelected.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onChange(part.id)}
            className={`absolute flex items-center gap-2 rounded-full text-[14px] font-semibold z-10
                       px-4 py-2.5 transition-all duration-200 select-none shadow-sm
                       ${isSelected 
                         ? "bg-[#1a3a36] border-[#1a3a36] text-white" 
                         : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                       } border`}
            style={{
              top: part.position.top,
              left: part.position.left,
              right: part.position.right,
              transform: "translateY(-50%)", // Center vertically on the point
            }}
          >
            <div
              className={`w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                        ${isSelected ? "bg-white" : "bg-white border-2 border-gray-300"}`}
            >
              {isSelected && <Check className="w-3 h-3 text-[#1a3a36]" strokeWidth={3} />}
            </div>
            <span className="font-medium">
              {part.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
