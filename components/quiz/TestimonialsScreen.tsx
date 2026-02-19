"use client";

import Image from "next/image";
import { ContinueButton } from "./ContinueButton";
import { Check } from "lucide-react";

interface TestimonialsScreenProps {
  onContinue: () => void;
}

const testimonials = [
  {
    name: "Megan L.",
    quote:
      "I'm just over two weeks in and already down 12 kg. I feel more energized every day, and for the first time in a long while, I actually like what I see when I look in the mirror.",
    image: "/images/testimonial-megan.png",
  },
  {
    name: "Rachel D.",
    quote:
      "I started Ozempic a couple of months ago, but the scale didn't really move until I paired it with a Personalized GLP-1 Programme. In 8 weeks, I lost 25 kg and finally started feeling comfortable in my body again.",
    image: "/images/testimonial-rachel.png",
  },
  {
    name: "Daniel K.",
    quote:
      "My doctor told me I was heading toward pre-diabetes and needed to make a change. After following this plan, I lost 34 kg in about two months. It completely changed how I feel day to day.",
    image: "/images/testimonial-sophie.png",
  },
  {
    name: "Sophie M.",
    quote:
      "I lost 24 kg in 7 weeks. The meals are satisfying, my cravings faded, and the weight finally started coming off. I feel lighter, healthier, and more confident.",
    image: "/images/testimonial-daniel.png",
  },
];

export function TestimonialsScreen({ onContinue }: TestimonialsScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px]">
          <h2
            className="text-[20px] sm:text-[24px] font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            You don&apos;t have to take our word for it.
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] text-center mb-2">
            See how people are describing their experience with the{" "}
            <strong>Personalized GLP-1 Programme</strong>
          </p>
          <p className="text-[14px] text-[var(--text-secondary)] text-center mb-8">
            We&apos;ve already supported{" "}
            <strong>millions of people</strong> in working toward their body
            goals — and you could be next.
          </p>

          <div className="space-y-4 mb-8">
            {testimonials.map(({ name, quote, image }) => (
              <div
                key={name}
                className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4 flex gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
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
