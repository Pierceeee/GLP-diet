"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Shield, ChevronRight } from "lucide-react";

// --------------- PRICING DATA ---------------
interface PlanTier {
  id: string;
  label: string;
  originalPrice: number;
  price: number;
  perDay: string;
  popular?: boolean;
}

// Order Page #2 — Standard Product Plan for Non-Buyers (51% discount)
const PLANS: PlanTier[] = [
  { id: "7d", label: "7-day plan", originalPrice: 13.24, price: 6.49, perDay: "0.92" },
  { id: "1mo", label: "1-month plan", originalPrice: 26.51, price: 12.99, perDay: "0.43", popular: true },
  { id: "3mo", label: "3-month plan", originalPrice: 44.88, price: 21.99, perDay: "0.24" },
];

const DISCOUNT_LABEL = "51% discount";

const features = [
  { emoji: "\u{1F373}", title: "Over 1000 GLP Diet Recipes", desc: "Personalized plan tailored to help you manage your weight in the most enjoyable way." },
  { emoji: "\u2728", title: "100+ Workouts & Exercises", desc: "Simple workouts, yoga, meditation guides, and more to see results sooner." },
  { emoji: "\u26A1", title: "Motivating Challenges", desc: "Tailored challenges based on your quiz answers and preferences." },
  { emoji: "\u{1F33F}", title: "Nutrition & Health Guides", desc: "In-depth guides written by top nutrition experts and personal trainers." },
  { emoji: "\u{1F50D}", title: "Progress Tracking", desc: "All the tools to track and visualize your incredible progress." },
];

// --------------- COUNTDOWN TIMER ---------------
function useCountdown(minutes: number) {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// --------------- STICKY DISCOUNT BANNER ---------------
function DiscountBanner({
  discountLabel,
  onGetPlan,
}: {
  discountLabel: string;
  onGetPlan: () => void;
}) {
  const countdown = useCountdown(15);

  return (
    <div className="sticky top-0 z-50 bg-[#d4edda] border-b border-[#b8dabd]">
      <div className="w-full max-w-[660px] mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[13px] text-[#0f4c4c]">{discountLabel}</p>
          <p className="text-[28px] font-bold text-[#1a1a1a] leading-tight">{countdown}</p>
        </div>
        <button
          onClick={onGetPlan}
          className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-[14px] font-bold
                     px-5 py-3 rounded-lg transition-all active:scale-[0.97] uppercase tracking-wide"
        >
          GET MY PLAN
        </button>
      </div>
    </div>
  );
}

// --------------- NOW vs GOAL CARD ---------------
function NowVsGoal() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-2">
        <div className="text-center pt-5 pb-2 border-r border-gray-100">
          <p className="text-[16px] font-bold text-red-500 mb-3">Now</p>
          <div className="h-[220px] flex items-end justify-center overflow-hidden">
            <Image
              src="/images/body/now-placeholder.png"
              alt="Current body"
              width={160}
              height={220}
              className="object-contain grayscale opacity-80"
            />
          </div>
        </div>
        <div className="text-center pt-5 pb-2 relative">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
            <ChevronRight className="w-4 h-4 text-[var(--brand)]" />
          </div>
          <p className="text-[16px] font-bold text-[var(--brand)] mb-3">Goal</p>
          <div className="h-[220px] flex items-end justify-center overflow-hidden">
            <Image
              src="/images/body/goal-placeholder.png"
              alt="Goal body"
              width={160}
              height={220}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-gray-100">
        <div className="p-4 border-r border-gray-100">
          <p className="text-[13px] text-[var(--text-secondary)]">Body fat:</p>
          <p className="text-[22px] font-bold text-[#1a1a1a]">15.67%</p>
          <div className="border-t border-gray-100 mt-3 pt-3">
            <p className="text-[13px] text-[var(--text-secondary)]">BMI:</p>
            <p className="text-[22px] font-bold text-[#1a1a1a]">22.34</p>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3">
            <p className="text-[13px] text-[var(--text-secondary)] mb-2">Fitness level:</p>
            <div className="flex gap-1">
              <div className="h-2 w-8 rounded-full bg-red-500" />
              <div className="h-2 w-8 rounded-full bg-red-300" />
              <div className="h-2 w-8 rounded-full bg-red-100" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[13px] text-[var(--text-secondary)]">Body fat:</p>
          <p className="text-[22px] font-bold text-[#1a1a1a]">11.84%</p>
          <div className="border-t border-gray-100 mt-3 pt-3">
            <p className="text-[13px] text-[var(--text-secondary)]">BMI:</p>
            <p className="text-[22px] font-bold text-[#1a1a1a]">19.15</p>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3">
            <p className="text-[13px] text-[var(--text-secondary)] mb-2">Fitness level:</p>
            <div className="flex gap-1">
              <div className="h-2 w-8 rounded-full bg-green-500" />
              <div className="h-2 w-8 rounded-full bg-green-500" />
              <div className="h-2 w-8 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------- PRICING SECTION ---------------
function PricingSection({
  onGetPlan,
}: {
  onGetPlan: (planId: string) => void;
}) {
  const [selected, setSelected] = useState("1mo");
  const sel = PLANS.find((p) => p.id === selected)!;

  return (
    <div>
      <h2
        className="text-[24px] font-bold text-center leading-tight mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Your personalized weight loss
        <br />
        <span className="text-[var(--brand)]">programme is ready!</span>
      </h2>

      <div className="space-y-3 mb-6">
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full px-5 py-4 rounded-2xl border-2 text-left transition-all relative ${
              selected === p.id
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
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected === p.id ? "border-[var(--brand)] bg-[var(--brand)]" : "border-gray-300"
                  }`}
                >
                  {selected === p.id && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <div>
                  <span className="text-[15px] font-semibold">{p.label}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[12px] text-[var(--text-muted)] line-through mr-2">
                  ${p.originalPrice.toFixed(2)}
                </span>
                <span className="text-[18px] font-bold text-[#1a1a1a]">${p.price.toFixed(2)}</span>
                <p className="text-[12px] text-[var(--text-muted)]">${p.perDay} / day</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onGetPlan(selected)}
        className="w-full py-4 rounded-full text-[15px] font-semibold transition-all duration-150
                   bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] active:scale-[0.98] cursor-pointer"
      >
        GET MY PLAN &mdash; ${sel.price.toFixed(2)}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-[var(--text-muted)]">
        <Shield className="w-4 h-4" />
        <span className="text-[12px]">100% Money-Back Guarantee &middot; Secure payment</span>
      </div>
    </div>
  );
}

// --------------- DECLINE MODAL ---------------
function DeclineModal({
  onStay,
  onLeave,
}: {
  onStay: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
        <h3
          className="text-[20px] font-bold text-center mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Wait! Don&apos;t leave yet
        </h3>
        <p className="text-[14px] text-[var(--text-secondary)] text-center mb-6">
          We have a special <span className="font-bold text-[var(--brand)]">74% discount</span> offer
          just for you. Would you like to see it?
        </p>
        <div className="space-y-3">
          <button
            onClick={onStay}
            className="w-full py-3.5 rounded-full text-[15px] font-semibold
                       bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] active:scale-[0.98] transition-all"
          >
            Yes, show me the offer!
          </button>
          <button
            onClick={onLeave}
            className="w-full py-3 rounded-full text-[14px] font-medium
                       text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            No thanks, I&apos;ll pass
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------- FEATURES SECTION ---------------
function FeaturesSection() {
  return (
    <div>
      <h2
        className="text-[22px] font-bold text-center leading-tight mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        What does your <span className="text-[var(--brand)]">GLP Diet</span> plan include?
      </h2>
      <div className="space-y-3">
        {features.map((f, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-gray-100 rounded-2xl px-5 py-4">
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
    </div>
  );
}

// --------------- MAIN CONTENT ---------------
function OfferNonBuyersContent() {
  const router = useRouter();
  const [showDecline, setShowDecline] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = useCallback(() => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleGetPlan = useCallback((planId: string) => {
    alert(`Proceeding to checkout with plan: ${planId} (non-buyers standard)`);
  }, []);

  const handleDecline = useCallback(() => {
    setShowDecline(true);
  }, []);

  const handleStay = useCallback(() => {
    setShowDecline(false);
    router.push("/offer-nonbuyers-2");
  }, [router]);

  const handleLeave = useCallback(() => {
    setShowDecline(false);
    router.push("/offer-nonbuyers-2");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DiscountBanner
        discountLabel={`${DISCOUNT_LABEL} reserved for:`}
        onGetPlan={scrollToPricing}
      />

      <header className="bg-white">
        <div className="w-full max-w-[660px] mx-auto px-6 flex items-center justify-center h-12">
          <span
            className="text-[16px] font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            GLP Diet
          </span>
        </div>
        <div className="h-[3px] bg-[var(--brand)]" />
      </header>

      <main className="flex-1 w-full max-w-[660px] mx-auto px-6 py-8 space-y-10">
        <NowVsGoal />
        <FeaturesSection />

        <div ref={pricingRef}>
          <PricingSection onGetPlan={handleGetPlan} />
        </div>

        <div className="text-center pb-4">
          <button
            onClick={handleDecline}
            className="text-[13px] text-[var(--text-muted)] underline hover:text-[var(--text-secondary)] transition-colors"
          >
            Not now
          </button>
        </div>
      </main>

      {showDecline && (
        <DeclineModal
          onStay={handleStay}
          onLeave={handleLeave}
        />
      )}
    </div>
  );
}

// --------------- PAGE EXPORT ---------------
export default function OfferNonBuyersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OfferNonBuyersContent />
    </Suspense>
  );
}
