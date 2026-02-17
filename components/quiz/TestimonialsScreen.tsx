"use client";

import { ContinueButton } from "./ContinueButton";
import { Check } from "lucide-react";

interface TestimonialsScreenProps {
  onContinue: () => void;
}

const testimonials = [
  {
    name: "Sarah P.",
    quote:
      "Only 15 days in and already 12 kg down. I love what I see in the mirror, and I feel more energized and confident every day!",
    initial: "S",
  },
  {
    name: "Emma W.",
    quote:
      "Started Ozempic 2 months ago, but it didn't work until I added the GLP-1 diet. I lost 25 kg in 6 weeks. I feel and look better, and finally feel good in my own skin.",
    initial: "E",
  },
  {
    name: "Jake S.",
    quote:
      "My doctor warned me I was pre-diabetic and needed a change. I followed this plan and lost 34 kg in 2 months. It literally saved my life.",
    initial: "J",
  },
  {
    name: "Olivia J.",
    quote:
      "Lost 24 kg in 7 weeks. The food is delicious, I stopped craving snacks, and my extra pounds are gone. I look and feel great!",
    initial: "O",
  },
];

export function TestimonialsScreen({ onContinue }: TestimonialsScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px]">
          <h2
            className="text-[20px] sm:text-[24px] font-bold text-center mb-2 text-[var(--brand)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            But don&apos;t just take our word for it. Hear what others are saying
            about GLP Diet
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] text-center mb-8">
            We have already <strong>helped millions of people</strong> reach their
            body goals. We can help you too.
          </p>

          <div className="space-y-4 mb-8">
            {testimonials.map(({ name, quote, initial }) => (
              <div
                key={name}
                className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4 flex gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] flex items-center justify-center flex-shrink-0 text-[var(--brand)] font-bold text-lg">
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[var(--text)] leading-relaxed mb-2">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">{name}</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--brand-light)] text-[11px] font-medium text-[var(--brand)]">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          </div>
        </div>
      </main>
    </div>
  );
}
