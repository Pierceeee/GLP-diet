"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContinueButton } from "@/components/quiz/ContinueButton";

const features = [
  { emoji: "🍳", title: "Over 1000 GLP Diet Recipes", desc: "Personalized plan that is the perfect fit for you and will help you manage your weight in the most enjoyable way." },
  { emoji: "✨", title: "100+ Workouts & Exercises", desc: "Simple workouts, yoga exercises, meditation guides, and much more to help you manage weight faster and see results sooner." },
  { emoji: "⚡", title: "Motivating Challenges", desc: "Tailored to your quiz answers and preferences, easy to cook, and incredibly delicious." },
  { emoji: "🌿", title: "Nutrition & Health Guides", desc: "In depth guides on nutrition, workouts, healthy lifestyle, and other useful tips written by the top nutrition experts, personal trainers, and psychologists." },
  { emoji: "🔍", title: "Progress Tracking & Visualization", desc: "All the tools in your pocket to track and visualize your incredible progress and reach your weight goals on time." },
];

function OfferContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"plan" | "pricing">("plan");
  const id = searchParams.get("id");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="w-full max-w-[660px] mx-auto px-6 flex items-center justify-center h-12">
          <span className="text-[16px] font-bold" style={{ fontFamily: "var(--font-heading)" }}>GLP Diet</span>
        </div>
        {/* Progress - full */}
        <div className="h-[3px] bg-[var(--brand)]" />
      </header>

      <main className="flex-1 w-full max-w-[660px] mx-auto px-6 py-8">
        {tab === "plan" ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-[24px] font-bold leading-tight mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                What does your{" "}
                <span className="text-[var(--brand)]">GLP Diet</span> plan
                <br />include?
              </h1>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg-card)] border border-gray-100 rounded-2xl px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[20px] mt-0.5">{f.emoji}</span>
                    <div>
                      <h3 className="text-[15px] font-bold mb-1">{f.title}</h3>
                      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ContinueButton onClick={() => setTab("pricing")}>Continue</ContinueButton>
          </>
        ) : (
          <PricingTab />
        )}
      </main>
    </div>
  );
}

function PricingTab() {
  const [plan, setPlan] = useState("6mo");
  const plans = [
    { id: "1mo", label: "1 Month", price: 29.99, orig: 49.99, monthly: 29.99, popular: false },
    { id: "3mo", label: "3 Months", price: 59.99, orig: 149.97, monthly: 19.99, popular: false },
    { id: "6mo", label: "6 Months", price: 89.99, orig: 299.94, monthly: 14.99, popular: true },
  ];
  const sel = plans.find((p) => p.id === plan)!;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-[24px] font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Choose your plan
        </h1>
      </div>

      <div className="space-y-3 mb-8">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlan(p.id)}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-left transition-all relative ${
              plan === p.id
                ? "border-[var(--brand)] bg-[var(--brand-light)]"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-5 px-3 py-0.5 bg-[var(--brand)] text-white text-[11px] font-bold rounded-full">
                Most Popular
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  plan === p.id ? "border-[var(--brand)]" : "border-gray-300"
                }`}>
                  {plan === p.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand)]" />}
                </div>
                <div>
                  <span className="text-[15px] font-semibold">{p.label}</span>
                  <span className="text-[13px] text-[var(--text-muted)] ml-2">${p.monthly.toFixed(2)}/mo</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[17px] font-bold">${p.price.toFixed(2)}</span>
                <span className="text-[12px] text-[var(--text-muted)] line-through ml-2">${p.orig.toFixed(2)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ContinueButton onClick={() => alert("Stripe checkout coming soon!")}>
        Get My Plan - ${sel.price.toFixed(2)}
      </ContinueButton>

      <p className="text-center text-[12px] text-[var(--text-muted)] mt-4">
        100% Money-Back Guarantee · Secure payment
      </p>
    </>
  );
}

export default function OfferPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OfferContent />
    </Suspense>
  );
}
