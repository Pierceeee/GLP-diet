"use client";

import { useState } from "react";
import { emailStep } from "@/config/questions";
import { ContinueButton } from "./ContinueButton";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export function EmailCapture({ onSubmit, isLoading = false }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email) { setError("Please enter your email address"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email"); return; }
    setError("");
    onSubmit(email);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[660px] text-center">
        <h1
          className="text-[26px] md:text-[30px] font-bold leading-tight mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {emailStep.title}
        </h1>
        <p
          className="text-[22px] md:text-[26px] font-bold text-[var(--brand)] mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {emailStep.highlight}
        </p>

        <div className="mb-5">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
            placeholder={emailStep.placeholder}
            disabled={isLoading}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200
                       focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10
                       outline-none transition-all text-[15px]
                       placeholder:text-gray-300"
          />
          {error && <p className="text-red-500 text-[13px] mt-2">{error}</p>}
        </div>

        <div className="mb-6">
          <ContinueButton onClick={handleSubmit} disabled={isLoading || !email}>
            {isLoading ? "Processing..." : emailStep.buttonText}
          </ContinueButton>
        </div>

        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto">
          By continuing this, you agree to our{" "}
          <a href="#" className="text-[var(--brand)] underline">Privacy policy</a>.
          We respect your privacy. We will never sell, rent or share your email address.
          That&apos;s more than a policy, it&apos;s our personal guarantee!
        </p>
      </div>
    </div>
  );
}
