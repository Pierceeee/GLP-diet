"use client";

import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";

interface OptionButtonProps {
  label: string;
  description?: string;
  emoji?: string;
  image?: string;
  selected: boolean;
  onClick: () => void;
  type: "single" | "multi";
  disabled?: boolean;
}

export function OptionButton({
  label, description, emoji, image, selected, onClick, type, disabled = false,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-between px-5 py-4
        rounded-2xl border transition-all duration-150
        ${selected
          ? "border-[var(--brand)] bg-[var(--brand-light)] shadow-sm"
          : "border-gray-100 bg-[var(--bg-card)] hover:border-gray-200 hover:bg-gray-50"
        }
        ${disabled ? "opacity-40 pointer-events-none" : "cursor-pointer active:scale-[0.98]"}
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        {type === "multi" && (
          <div className={`
            w-[18px] h-[18px] rounded flex-shrink-0 border-[1.5px] flex items-center justify-center transition-all
            ${selected ? "bg-[var(--brand)] border-[var(--brand)]" : "border-gray-300 bg-white"}
          `}>
            {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        )}
        <div className="min-w-0">
          <span className="text-[15px] font-medium text-[var(--text)] block">{label}</span>
          {description && (
            <span className="text-[13px] text-[var(--text-muted)] block mt-0.5">{description}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        {emoji && <span className="text-[24px] leading-none">{emoji}</span>}
        {image && (
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image src={image} alt={label} width={64} height={64} className="w-full h-full object-cover" />
          </div>
        )}
        {type === "single" && !image && !emoji && (
          <ChevronRight className="w-5 h-5 text-gray-300" strokeWidth={2} />
        )}
      </div>
    </button>
  );
}
