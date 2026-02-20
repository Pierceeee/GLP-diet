"use client";

import Image from "next/image";
import { ContinueButton } from "./ContinueButton";
import type { Gender } from "@/types";

interface SocialProofIntroProps {
  gender: Gender;
  onContinue: () => void;
}

export function SocialProofIntro({ gender, onContinue }: SocialProofIntroProps) {
  const isFemale = gender === "female";
  const imageSrc = isFemale
    ? "/images/social-proof-women-v2.png"
    : "/images/social-proof-men-v2.png";
  const imageAlt = isFemale
    ? "Four women in athletic wear"
    : "Four men in casual wear";

  return (
    <div className="w-full max-w-[660px] mx-auto px-6 py-8 flex flex-col items-center">
      {/* Image */}
      <div className="w-full flex justify-center mb-8">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      {/* Text */}
      <p className="text-[15px] md:text-[17px] font-semibold text-[var(--text-primary)] text-center leading-relaxed mb-10 max-w-[440px]">
        {isFemale
          ? "Trusted by over 1.5 million women looking for a calmer, more manageable approach to weight loss"
          : "Trusted by over 1.2 million men looking for a more manageable approach to weight loss"}
      </p>

      {/* Continue Button */}
      <ContinueButton onClick={onContinue}>Continue</ContinueButton>
    </div>
  );
}
