"use client";

import { Search, Sparkles, Zap, Sprout, BarChart3 } from "lucide-react";
import { ContinueButton } from "./ContinueButton";

interface PlanIncludesScreenProps {
  onContinue: () => void;
}

const features = [
  {
    icon: Search,
    title: "Over 1000 GLP-1 Diet Recipes",
    description:
      "Personalized plan that is the perfect fit for you and will help you boost your GLP-1 levels and lose weight in the most enjoyable way.",
  },
  {
    icon: Sparkles,
    title: "100+ Workouts & Exercises",
    description:
      "Simple workouts, yoga exercises, meditation guides, and much more to help you lose weight faster and see results sooner.",
  },
  {
    icon: Zap,
    title: "Motivating Challenges",
    description:
      "Tailored to your quiz answers and preferences, easy to cook, and incredibly delicious.",
  },
  {
    icon: Sprout,
    title: "Nutrition & Health Guides",
    description:
      "In depth guides on GLP-1 weight loss drugs, nutrition, workouts, healthy lifestyle, and other useful tips written by the top nutrition experts, personal trainers, and psychologists.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking & Visualization",
    description:
      "All the tools in your pocket to track and visualize your incredible progress and reach your weight goals on time.",
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
            <span className="text-[var(--brand)]">GLP Diet</span> plan include?
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
