"use client";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ContinueButton({ onClick, disabled = false, children = "Continue" }: ContinueButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 rounded-full text-[15px] font-semibold transition-all duration-150
        bg-[var(--brand)] text-white
        ${disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-[var(--brand-hover)] active:scale-[0.98] cursor-pointer"
        }
      `}
    >
      {children}
    </button>
  );
}
