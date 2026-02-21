"use client";

import { Search, Sparkles, Zap, Sprout, Brain } from "lucide-react";
import { ContinueButton } from "./ContinueButton";

interface PlanIncludesScreenProps {
  onContinue: () => void;
}

const features = [
  {
    icon: Search,
    title: "1,000+ GLP-1–Aligned Recipes",
    description:
      "A fully personalized meal plan built around your preferences, designed to make weight management easier and genuinely enjoyable.",
  },
  {
    icon: Sparkles,
    title: "100+ Movement & Exercise Options",
    description:
      "A mix of simple workouts, yoga sessions, guided movement, and relaxation practices to support progress without overwhelm.",
  },
  {
    icon: Zap,
    title: "Personalized Motivation Challenges",
    description:
      "Light, achievable challenges matched to your quiz answers — focused on consistency, ease, and great-tasting meals.",
  },
  {
    icon: Sprout,
    title: "Nutrition & Wellness Resources",
    description:
      "Clear, practical guides covering nutrition, movement, lifestyle habits, and mental well-being, created by experienced nutrition professionals, trainers, and health specialists.",
  },
  {
    icon: Brain,
    title: "AI-Powered Personalization & Continuous Improvement",
    description:
      "Your plan uses AI-driven analysis of your progress and feedback to continuously refine meal choices, recommendations, and structure — improving your plan over time as your body and needs change.",
  },
];

export function PlanIncludesScreen({ onContinue }: PlanIncludesScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center px-6 py-8 pb-12">
        <div className="w-full max-w-[520px]">
          <h2
            className="text-[22px] sm:text-[26px] font-bold text-center mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What does your{" "}
            <span className="text-[var(--brand)]">Personalized GLP-1 Programme</span> include?
          </h2>

          <div className="space-y-4 mb-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-4 flex gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--brand)]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold mb-1">{title}</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {description}
                  </p>
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
