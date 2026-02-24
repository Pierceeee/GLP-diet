"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import type { Gender } from "@/types";

interface BodyPartDef {
  id: string;
  label: string;
  position: { top: string; left?: string; right?: string };
}

/*
 * Anatomical muscle-group SVG paths on a 1000×1000 viewBox.
 * Designed to mimic the reference overlay style: dark gray filled shapes
 * sitting directly on the body, with segmented abs and distinct muscle groups.
 *
 * MALE pixel-scan landmarks:
 *   Shoulders: y200 x443-595. Arms split at y300.
 *   Left arm: 340-407 | Torso: 411-615 | Right arm: 619-689 (at y300)
 *   Hands on hips at y440. Waist y480: 404-596.
 *   Legs split at y580: 389-501 / 504-616.
 *
 * FEMALE pixel-scan landmarks:
 *   Shoulders: y220 x420-613. Torso at y300: 410-584.
 *   Right arm hanging: 614-654. Left arm on hip: 410-445.
 *   Waist y400: 454-614. Legs split at y540: 378-502 / 528-609.
 */

const MALE_SVG_PATHS: Record<string, string[]> = {
  arms: [
    // Left upper arm — shoulder cap down to elbow area with wavy curves
    `M 398,215 C 355,225 320,260 310,310
     C 300,360 310,400 340,420
     C 370,440 400,435 420,410
     C 440,385 445,340 435,295
     C 425,250 410,220 398,215 Z`,
    // Right upper arm with wavy curves
    `M 602,215 C 645,225 680,260 690,310
     C 700,360 690,400 660,420
     C 630,440 600,435 580,410
     C 560,385 555,340 565,295
     C 575,250 590,220 602,215 Z`,
  ],
  chest: [
    // Left pec
    `M 435,215 C 425,228 420,248 422,268
     C 424,285 435,295 458,298
     C 475,300 490,298 498,290
     C 500,286 500,275 498,260
     C 495,240 485,222 470,213
     C 455,205 440,208 435,215 Z`,
    // Right pec
    `M 565,215 C 575,228 580,248 578,268
     C 576,285 565,295 542,298
     C 525,300 510,298 502,290
     C 500,286 500,275 502,260
     C 505,240 515,222 530,213
     C 545,205 560,208 565,215 Z`,
  ],
  back: [
    // Mid-back — wide band across torso
    `M 422,305 C 418,315 416,332 418,350
     C 420,365 430,378 455,385
     C 475,390 490,392 500,392
     C 510,392 525,390 545,385
     C 570,378 580,365 582,350
     C 584,332 582,315 578,305
     C 555,296 445,296 422,305 Z`,
  ],
  belly: [
    // Top ab segment
    `M 438,395 L 498,395 L 498,420 C 490,425 475,427 460,425 C 448,423 440,418 438,415 Z`,
    `M 502,395 L 562,395 L 562,415 C 560,418 552,423 540,425 C 525,427 510,425 502,420 Z`,
    // Middle ab segment
    `M 435,428 L 498,428 L 498,455 C 490,460 475,462 458,460 C 445,458 438,452 435,448 Z`,
    `M 502,428 L 565,428 L 565,448 C 562,452 555,458 542,460 C 525,462 510,460 502,455 Z`,
    // Lower ab segment
    `M 432,463 L 498,463 L 498,488 C 488,492 472,494 455,492 C 442,490 435,485 432,480 Z`,
    `M 502,463 L 568,463 L 568,480 C 565,485 558,490 545,492 C 528,494 512,492 502,488 Z`,
  ],
  butt: [
    // Left glute
    `M 415,492 C 408,505 404,525 406,545
     C 408,562 418,572 440,578
     C 458,582 478,582 498,580
     L 498,498
     C 475,492 445,490 415,492 Z`,
    // Right glute
    `M 585,492 C 592,505 596,525 594,545
     C 592,562 582,572 560,578
     C 542,582 522,582 502,580
     L 502,498
     C 525,492 555,490 585,492 Z`,
  ],
  legs: [
    // Left thigh — outer + inner shape
    `M 400,585 C 394,615 390,650 388,690
     C 386,730 387,770 390,808
     C 393,840 398,865 406,885
     C 414,900 424,908 434,905
     C 442,900 448,885 452,862
     C 458,835 460,800 462,762
     C 463,725 463,688 464,652
     C 466,620 470,598 478,588
     L 498,585 Z`,
    // Right thigh
    `M 600,585 C 606,615 610,650 612,690
     C 614,730 613,770 610,808
     C 607,840 602,865 594,885
     C 586,900 576,908 566,905
     C 558,900 552,885 548,862
     C 542,835 540,800 538,762
     C 537,725 537,688 536,652
     C 534,620 530,598 522,588
     L 502,585 Z`,
  ],
};

const FEMALE_SVG_PATHS: Record<string, string[]> = {
  arms: [
    // Left arm (her right — hand on hip)
    `M 422,218 C 412,235 406,260 404,285
     C 402,305 402,325 400,345
     C 399,362 400,378 405,392
     C 410,405 420,415 430,420
     C 438,424 444,418 448,405
     C 452,390 454,370 454,348
     C 454,325 452,302 448,280
     C 444,258 438,238 432,225 Z`,
    // Right arm (her left — hanging down)
    `M 588,218 C 600,232 614,255 628,282
     C 640,308 648,335 650,358
     C 652,378 648,395 640,410
     C 632,425 622,438 610,448
     C 600,455 592,452 588,440
     C 584,425 585,405 588,382
     C 592,358 594,332 594,305
     C 594,278 590,252 586,232 Z`,
  ],
  chest: [
    // Left bust
    `M 460,222 C 452,235 448,252 450,270
     C 452,286 462,295 482,298
     C 495,300 498,295 498,282
     C 498,265 492,245 482,230
     C 475,220 465,218 460,222 Z`,
    // Right bust
    `M 545,220 C 552,232 558,250 558,268
     C 556,284 548,294 528,298
     C 515,300 510,295 510,282
     C 510,265 515,245 525,230
     C 532,220 540,216 545,220 Z`,
  ],
  back: [
    // Mid-back band
    `M 456,302 C 450,314 448,330 450,348
     C 452,362 460,372 480,378
     C 495,382 508,382 522,380
     C 542,376 552,366 555,350
     C 558,334 556,316 552,304
     C 535,296 470,296 456,302 Z`,
  ],
  belly: [
    // Top ab segment left
    `M 455,385 L 498,385 L 498,408 C 490,412 478,414 465,412 C 458,410 455,406 455,402 Z`,
    // Top ab segment right
    `M 505,385 L 548,385 L 548,402 C 548,406 545,410 538,412 C 525,414 513,412 505,408 Z`,
    // Mid ab segment left
    `M 452,418 L 498,418 L 498,440 C 490,444 476,446 462,444 C 455,442 452,438 452,434 Z`,
    // Mid ab segment right
    `M 505,418 L 552,418 L 552,434 C 552,438 549,442 542,444 C 528,446 514,444 505,440 Z`,
    // Lower ab segment left
    `M 448,448 L 498,448 L 498,470 C 488,474 474,476 460,474 C 452,472 449,468 448,464 Z`,
    // Lower ab segment right
    `M 505,448 L 555,448 L 555,464 C 554,468 551,472 543,474 C 530,476 515,474 505,470 Z`,
  ],
  butt: [
    // Left glute/hip
    `M 428,478 C 420,492 416,510 418,530
     C 420,545 430,554 452,558
     C 470,560 488,560 498,558
     L 498,484
     C 475,478 448,476 428,478 Z`,
    // Right glute/hip
    `M 572,478 C 578,492 582,510 580,530
     C 578,545 568,554 548,558
     C 530,560 512,560 505,558
     L 505,484
     C 525,478 552,476 572,478 Z`,
  ],
  legs: [
    // Left leg
    `M 395,562 C 388,592 383,630 380,672
     C 378,712 380,750 384,786
     C 388,818 395,842 405,860
     C 413,872 422,878 432,875
     C 440,870 446,858 450,838
     C 456,812 460,780 462,745
     C 464,710 464,674 466,640
     C 468,608 472,582 480,568
     L 498,562 Z`,
    // Right leg
    `M 565,560 C 570,588 574,622 576,662
     C 578,700 576,738 572,772
     C 568,802 562,828 554,846
     C 546,860 538,864 530,860
     C 522,856 518,842 515,822
     C 512,798 512,766 514,732
     C 516,698 518,662 520,630
     C 522,600 525,578 530,566
     L 505,560 Z`,
  ],
};

const FEMALE_PARTS: BodyPartDef[] = [
  { id: "arms", label: "Arms", position: { top: "22%", left: "0" } },
  { id: "chest", label: "Chest", position: { top: "22%", right: "0" } },
  { id: "back", label: "Back", position: { top: "36%", left: "0" } },
  { id: "belly", label: "Belly", position: { top: "36%", right: "0" } },
  { id: "butt", label: "Butt", position: { top: "50%", left: "0" } },
  { id: "legs", label: "Legs", position: { top: "58%", right: "0" } },
];

const MALE_PARTS: BodyPartDef[] = [
  { id: "arms", label: "Arms", position: { top: "22%", left: "0" } },
  { id: "chest", label: "Chest", position: { top: "22%", right: "0" } },
  { id: "back", label: "Back", position: { top: "36%", left: "0" } },
  { id: "belly", label: "Belly", position: { top: "36%", right: "0" } },
  { id: "butt", label: "Butt", position: { top: "50%", left: "0" } },
  { id: "legs", label: "Legs", position: { top: "58%", right: "0" } },
];

interface BodyMapSelectorProps {
  gender: Gender;
  selected: string[];
  onChange: (id: string) => void;
}

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${gender} body`}
            className="absolute inset-0 w-full h-full object-contain"
          />

          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ pointerEvents: "none" }}
          >
            {Object.entries(svgPaths).map(([partId, paths]) => {
              const isActive = safeSelected.includes(partId);
              return paths.map((d, i) => (
                <path
                  key={`${partId}-${i}`}
                  d={d}
                  fill={isActive ? "rgba(70, 70, 70, 0.6)" : "transparent"}
                  stroke="none"
                  style={{
                    pointerEvents: "auto",
                    cursor: "pointer",
                    transition: "fill 0.3s ease",
                  }}
                  onClick={() => onChange(partId)}
                />
              ));
            })}
          </svg>
        </div>
      </div>

      {bodyParts.map((part) => {
        const isSelected = safeSelected.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onChange(part.id)}
            className="absolute flex items-center gap-2 rounded-lg text-[14px] font-semibold z-10
                       px-3.5 py-2 bg-white border shadow-sm select-none"
            style={{
              top: part.position.top,
              left: part.position.left,
              right: part.position.right,
              borderColor: isSelected ? "#1f2937" : "#e5e7eb",
              transition: "border-color 0.2s ease",
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: isSelected ? "#1a3a36" : "white",
                border: isSelected ? "none" : "2px solid #d1d5db",
                transition: "all 0.2s ease",
              }}
            >
              {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className="text-[#1a1a1a]">{part.label}</span>
          </button>
        );
      })}
    </div>
  );
}
