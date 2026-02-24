"use client";

import { useState, useEffect, useCallback, Suspense, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Check,
  Shield,
  ChevronDown,
  Clock,
  Target,
  Scale,
  Search,
  Sparkles,
  Zap,
  Sprout,
  Brain,
  ShieldCheck,
} from "lucide-react";

const ANSWERS_STORAGE_KEY = "glp-quiz-answers";

interface QuizAnswers {
  [key: string]: string | number | string[] | null | undefined;
}

function loadAnswersFromStorage(): QuizAnswers {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(ANSWERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

const goalLabels: Record<string, string> = {
  "weight-control": "Weight control",
  "body-toning": "Body toning",
  "overall-health": "Overall health",
  "natural-glp1": "Natural GLP-1 support",
  "medication-support": "Medication support",
  "metabolic-health": "Metabolic health",
  "energy-levels": "Energy levels",
  "gut-health": "Gut health",
};

// --------------- PRICING DATA ---------------
interface PlanTier {
  id: string;
  label: string;
  originalPrice: number;
  price: number;
  perDay: string;
  popular?: boolean;
}

const PLANS: PlanTier[] = [
  { id: "7d", label: "7-Day Program", originalPrice: 13.24, price: 6.49, perDay: "0.92" },
  { id: "1mo", label: "1-Month Program", originalPrice: 26.51, price: 12.99, perDay: "0.43", popular: true },
  { id: "3mo", label: "3-Month Program", originalPrice: 44.88, price: 21.99, perDay: "0.24" },
];

const DISCOUNT_LABEL = "51% discount";

const features = [
  {
    icon: Search,
    title: "1,000+ GLP-1\u2013Aligned Recipes",
    desc: "A fully personalized meal plan built around your preferences, designed to make weight management easier and genuinely enjoyable.",
  },
  {
    icon: Sparkles,
    title: "100+ Movement & Exercise Options",
    desc: "A mix of simple workouts, yoga sessions, guided movement, and relaxation practices to support progress without overwhelm.",
  },
  {
    icon: Zap,
    title: "Personalized Motivation Challenges",
    desc: "Light, achievable challenges matched to your quiz answers \u2014 focused on consistency, ease, and great-tasting meals.",
  },
  {
    icon: Sprout,
    title: "Nutrition & Wellness Resources",
    desc: "Clear, practical guides covering nutrition, movement, lifestyle habits, and mental well-being, created by experienced nutrition professionals, trainers, and health specialists.",
  },
  {
    icon: Brain,
    title: "AI-Powered Personalization & Continuous Improvement",
    desc: "Your plan uses AI-driven analysis of your progress and feedback to continuously refine meal choices, recommendations, and structure \u2014 improving your plan over time as your body and needs change.",
  },
];

const successStories = [
  {
    name: "Laura H.",
    headline: "Down 22 kg in just a few weeks",
    quote:
      "I had been slowly gaining weight for years, and it was starting to affect how I felt day to day. I decided to combine a GLP-1\u2013focused nutrition approach with my medication, and the change was dramatic. In about six weeks, I lost 22 kg and many of the symptoms I struggled with eased quickly. The program was simple to follow and didn\u2019t feel overwhelming at all.",
    image: "/images/success-laura.png",
  },
  {
    name: "Emily R.",
    headline: "Lost 17 kg \u2014 feeling better than ever",
    quote:
      "I work long hours and never thought I\u2019d find something that fit my schedule. After starting a GLP-1\u2013aligned eating approach, I lost 17 kg in around four weeks. My energy improved, my confidence went up, and I finally felt in control around food again. I still enjoy the meals I love, which made all the difference.",
    image: "/images/success-emily.png",
  },
  {
    name: "Daniel T.",
    headline: "Dropped multiple clothing sizes",
    quote:
      "Over ten weeks, I lost about 41 kg following this program. The meals were easy, satisfying, and my cravings disappeared early on. I had more energy than I\u2019d had in years. What surprised me most was realizing I didn\u2019t need injections \u2014 this approach helped my body respond naturally.",
    image: "/images/success-daniel.png",
  },
];

const faqItems = [
  {
    question: "Do I need GLP-1 medication for this to be effective?",
    answer: `No. This program is built to support the body systems that influence appetite, fullness, and blood-sugar balance \u2014 the same systems GLP-1 medications act on \u2014 by using food structure and daily habits to stimulate your body\u2019s own response.\n\nIf you\u2019re not using medication, the program helps reduce hunger and cravings naturally, without injections or drug-related side effects.\n\nIf you are using GLP-1 medication, the program fits alongside it and is designed to:\n\u2022 Help maximize your progress\n\u2022 Support consistent energy and nutrient intake\n\u2022 Ease common issues like nausea, low energy, or digestive discomfort\n\u2022 Make results feel more stable and sustainable over time\n\nIn short: it stands on its own \u2014 and it also works well as support if medication is part of your routine.`,
  },
  {
    question: "How is my experience personalized?",
    answer:
      "Your setup is shaped around how you live \u2014 your schedule, food preferences, comfort level, and goals. The idea is to remove friction, not add rules, so everything fits naturally into your day.\n\nIn addition to nutrition, your experience includes gentle movement options such as simple workouts and yoga, matched to your current fitness level. Together, these elements support appetite regulation while helping you feel lighter, stronger, and more energized.",
  },
  {
    question: "What kind of meals does this include?",
    answer:
      "The focus is on foods that are easy on digestion and help you feel satisfied longer. Meals are built using lean protein sources, fiber-rich vegetables, slow-digesting carbohydrates, and healthy fats.\n\nEverything is designed to support steadier appetite signals, smoother digestion, and gradual fat loss \u2014 without making eating feel restrictive or complicated.",
  },
  {
    question: "When should I expect changes?",
    answer:
      "Many people notice improvements in how they feel \u2014 including better energy and less food preoccupation \u2014 within the first couple of weeks. Visible changes often follow within 2 to 4 weeks, depending on starting point and consistency.\n\nThe approach prioritizes progress you can maintain, not short-term extremes.",
  },
  {
    question: "Will I need to track calories or macros?",
    answer:
      "No tracking required. The structure is designed so meals naturally support your goals without weighing, logging, or constant monitoring. You eat balanced meals and let the system handle the rest.",
  },
  {
    question: "Are the recipes complicated?",
    answer:
      "Not at all. Most meals can be prepared in 10\u201330 minutes using everyday ingredients. Whether you enjoy cooking or prefer to keep things simple, the recipes are designed to fit real life.",
  },
  {
    question: "Does the program change as I go?",
    answer:
      "Yes. As you move forward and your needs change, the recommendations are adjusted based on your progress and feedback. This helps keep things aligned with your goals instead of staying static.",
  },
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

// =============== SECTION 1 — STICKY DISCOUNT BANNER ===============
function DiscountBanner({ onGetPlan }: { onGetPlan: () => void }) {
  const countdown = useCountdown(15);

  return (
    <div className="sticky top-0 z-50 bg-[#d4edda] border-b border-[#b8dabd]">
      <div className="w-full max-w-[660px] mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[13px] text-[#0097b2]">Your {DISCOUNT_LABEL} is locked in</p>
          <p className="text-[28px] font-bold text-[#1a1a1a] leading-tight">{countdown}</p>
        </div>
        <button
          onClick={onGetPlan}
          className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-[14px] font-bold
                     px-5 py-3 rounded-lg transition-all active:scale-[0.97] uppercase tracking-wide"
        >
          ACCESS MY PLAN
        </button>
      </div>
    </div>
  );
}

// =============== SECTION 2 / 5 — PRICING SECTION ===============
function PricingSection({
  onGetPlan,
  countdown,
  answers,
}: {
  onGetPlan: (planId: string) => void;
  countdown: string;
  answers: QuizAnswers;
}) {
  const [selected, setSelected] = useState("1mo");
  const sel = PLANS.find((p) => p.id === selected)!;
  const [agreed, setAgreed] = useState(false);

  // Get goal from answers
  const goals = (answers.goals as string[]) || [];
  const primaryGoal = goals.length > 0 ? (goalLabels[goals[0]] || goals[0]) : "Support weight loss";
  
  // Get target weight from answers
  const targetWeight = (answers["target-weight"] as number) || 0;
  const targetWeightDisplay = targetWeight > 0 ? `${targetWeight} kg` : "—";

  return (
    <div>
      <h2
        className="text-[24px] font-bold text-center leading-tight mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Your personalized program is{" "}
        <span className="text-[var(--brand)]">ready!</span>
      </h2>

      {/* Goal + Target weight */}
      <div className="flex items-center justify-center gap-6 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] flex items-center justify-center">
            <Target className="w-4 h-4 text-[var(--brand)]" />
          </div>
          <div>
            <p className="text-[11px] text-[var(--text-muted)]">Goal</p>
            <p className="text-[13px] font-semibold">{primaryGoal}</p>
          </div>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] flex items-center justify-center">
            <Scale className="w-4 h-4 text-[var(--brand)]" />
          </div>
          <div>
            <p className="text-[11px] text-[var(--text-muted)]">Target weight</p>
            <p className="text-[13px] font-semibold">{targetWeightDisplay}</p>
          </div>
        </div>
      </div>

      {/* Countdown timer pill */}
      <div className="bg-[var(--brand)] text-white text-center rounded-full py-2.5 px-4 mb-6 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="text-[14px] font-semibold">This offer expires in {countdown}</span>
      </div>

      {/* Plan options */}
      <p className="text-[15px] font-semibold text-center mb-4">Choose your option</p>
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
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--brand)] text-white text-[11px] font-bold rounded-full flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3" /> MOST POPULAR &mdash; 51% OFF
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
                  <span className="text-[15px] font-semibold uppercase">{p.label}</span>
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

      {/* GET MY program button */}
      <button
        onClick={() => onGetPlan(selected)}
        className="w-full py-4 rounded-full text-[15px] font-semibold transition-all duration-150
                   bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] active:scale-[0.98] cursor-pointer mb-4"
      >
        GET MY program
      </button>

      {/* Terms checkbox */}
      <label className="flex items-start gap-3 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[var(--brand)] focus:ring-[var(--brand)] accent-[var(--brand)]"
        />
        <span className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          I agree to the{" "}
          <a href="#" className="text-[var(--brand)] font-semibold underline">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-[var(--brand)] font-semibold underline">
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Billing disclaimer */}
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-4">
        By clicking &ldquo;GET MY program&rdquo;, I agree to pay{" "}
        <strong>&euro;{sel.price.toFixed(2)}</strong> today. If I do not cancel before the end of
        the {sel.id === "7d" ? "7-day" : sel.id === "1mo" ? "1-month" : "3-month"} program
        period, my payment method will be charged the regular price of{" "}
        <strong>&euro;{sel.originalPrice.toFixed(2)}</strong> every{" "}
        {sel.id === "7d" ? "week" : sel.id === "1mo" ? "month" : "3 months"} until I cancel by
        contacting{" "}
        <a href="mailto:hello@glpdiet.app" className="text-[var(--brand)] underline">
          hello@glpdiet.app
        </a>
      </p>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
        <Shield className="w-4 h-4" />
        <span className="text-[12px]">GUARANTEED SAFE CHECKOUT</span>
      </div>

      {/* Payment icons placeholder */}
      <div className="flex items-center justify-center gap-3 mt-3">
        {["Mastercard", "Visa", "Amex", "Apple Pay", "Google Pay"].map((name) => (
          <div
            key={name}
            className="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
          >
            <span className="text-[7px] font-bold text-gray-400">{name.slice(0, 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== SECTION 3 — FEATURES / WHAT'S INCLUDED ===============
function FeaturesSection({ onGetPlan }: { onGetPlan: () => void }) {
  return (
    <div>
      <h2
        className="text-[22px] font-bold text-center leading-tight mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        What&apos;s included in your program
      </h2>
      <div className="space-y-3 mb-8">
        {features.map((f, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-gray-100 rounded-2xl px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--brand-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <f.icon className="w-5 h-5 text-[var(--brand)]" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold mb-1">{f.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onGetPlan}
        className="w-full py-4 rounded-full text-[15px] font-semibold transition-all duration-150
                   bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] active:scale-[0.98] cursor-pointer"
      >
        GET MY program
      </button>
    </div>
  );
}

// =============== SECTION 4 — SUCCESS STORIES ===============
function SuccessStoriesSection() {
  return (
    <div>
      <div className="space-y-6">
        {successStories.map((story) => (
          <div key={story.name}>
            <Image
              src={story.image}
              alt={`${story.name} — ${story.headline}`}
              width={660}
              height={660}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== SECTION 6 — FAQ ===============
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2
        className="text-[22px] font-bold text-center leading-tight mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Got questions? We&apos;ve got answers.
      </h2>

      <div className="space-y-3">
        {faqItems.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <span className="text-[14px] font-semibold pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4">
                <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== SECTION 7 — RISK-FREE GUARANTEE ===============
function GuaranteeSection() {
  return (
    <div className="bg-[var(--brand-light)] rounded-2xl p-6 text-center">
      {/* Image placeholder */}
      <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-sm">
        <div className="text-center text-gray-400">
          <ShieldCheck className="w-10 h-10 text-[var(--brand)]" />
        </div>
      </div>

      <h3
        className="text-[18px] font-bold mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Risk-free guarantee
      </h3>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
        If you decide this isn&apos;t right for you, contact our support team and you can cancel at
        any time without extra charges.
      </p>
    </div>
  );
}

// =============== NOW VS GOAL ===============
// Deurenberg Formula for body fat estimation:
// BodyFat% = (1.2 × BMI) + (0.23 × Age) - (10.8 × Sex) - 5.4
// Where Sex = 1 for male, Sex = 0 for female
function calculateBodyFat(bmi: number, age: number, isMale: boolean): number {
  const sex = isMale ? 1 : 0;
  const fat = (1.2 * bmi) + (0.23 * age) - (10.8 * sex) - 5.4;
  return Math.max(5, Math.min(55, parseFloat(fat.toFixed(1))));
}

function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

const femaleTransformationImages = [
  "/images/before-after/female-1.png",
  "/images/before-after/female-2.png",
  "/images/before-after/female-3.png",
  "/images/before-after/female-4.png",
  "/images/before-after/female-5.png",
];

const maleTransformationImages = [
  "/images/before-after/male-1.png",
  "/images/before-after/male-2.png",
];

function NowVsGoal({ answers }: { answers: QuizAnswers }) {
  const currentWeight = (answers.weight as number) || 80;
  const targetWeight = (answers["target-weight"] as number) || 65;
  const height = (answers.height as number) || 170;
  const age = (answers.age as number) || 35;
  const gender = (answers.gender as string) || "female";
  const isMale = gender === "male";

  const currentBMI = calculateBMI(height, currentWeight);
  const targetBMI = calculateBMI(height, targetWeight);

  const currentBodyFat = calculateBodyFat(currentBMI, age, isMale);
  const targetBodyFat = calculateBodyFat(targetBMI, age, isMale);

  const transformationImage = useMemo(() => {
    const images = isMale ? maleTransformationImages : femaleTransformationImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }, [isMale]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <div className="px-6 py-5">
        <h3 className="text-[18px] font-bold text-center mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Your Transformation
        </h3>
        
        {/* Before/After Image Section */}
        <div className="relative mb-6">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={transformationImage}
              alt="Transformation visualization"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            {/* Now Label */}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-4 py-1.5 bg-[#f87171] text-white text-[13px] font-bold rounded-full shadow-md">
                Now
              </span>
            </div>
            {/* Goal Label */}
            <div className="absolute top-3 right-3">
              <span className="inline-block px-4 py-1.5 bg-[#10b981] text-white text-[13px] font-bold rounded-full shadow-md">
                Goal
              </span>
            </div>
            {/* Center Arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between gap-4">
          {/* NOW Column */}
          <div className="flex-1 bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-[12px] font-bold rounded-full">
                NOW
              </span>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">Weight</p>
                <p className="text-[20px] font-bold text-gray-900">{currentWeight} kg</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">BMI</p>
                <p className="text-[20px] font-bold text-gray-900">{currentBMI.toFixed(1)}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">Body Fat</p>
                <p className="text-[20px] font-bold text-gray-900">{currentBodyFat}%</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-light)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* GOAL Column */}
          <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-green-500 text-white text-[12px] font-bold rounded-full">
                GOAL
              </span>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">Weight</p>
                <p className="text-[20px] font-bold text-gray-900">{targetWeight} kg</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">BMI</p>
                <p className="text-[20px] font-bold text-gray-900">{targetBMI.toFixed(1)}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] mb-0.5">Body Fat</p>
                <p className="text-[20px] font-bold text-gray-900">{targetBodyFat}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weight loss summary */}
        <div className="mt-5 text-center">
          <p className="text-[14px] text-[var(--text-secondary)]">
            Projected loss: <span className="font-bold text-[var(--brand)]">{(currentWeight - targetWeight).toFixed(1)} kg</span> &amp; <span className="font-bold text-[var(--brand)]">{(currentBodyFat - targetBodyFat).toFixed(1)}% body fat</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// =============== MAIN OFFER CONTENT ===============
function OfferContent() {
  const router = useRouter();
  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingRef2 = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(15);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  // Load answers from localStorage on mount
  useEffect(() => {
    const stored = loadAnswersFromStorage();
    if (Object.keys(stored).length > 0) {
      setAnswers(stored);
    }
  }, []);

  const scrollToPricing = useCallback(() => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleGetPlan = useCallback((planId: string) => {
    alert(`Proceeding to checkout with plan: ${planId}`);
  }, []);

  const handleDecline = useCallback(() => {
    router.push("/offer-nonbuyers");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Section 1 — Sticky Discount Banner */}
      <DiscountBanner onGetPlan={scrollToPricing} />

      {/* Header */}
      <header className="bg-white">
        <div className="w-full max-w-[660px] mx-auto px-6 flex items-center justify-center h-12">
          <span
            className="text-[16px] font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            GLP Coaching Program
          </span>
        </div>
        <div className="h-[3px] bg-[var(--brand)]" />
      </header>

      <main className="flex-1 w-full max-w-[660px] mx-auto px-6 py-8 space-y-12">
        {/* Now vs Goal card */}
        <NowVsGoal answers={answers} />

        {/* Section 2 — First Pricing Section */}
        <div ref={pricingRef}>
          <PricingSection onGetPlan={handleGetPlan} countdown={countdown} answers={answers} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section 3 — Features / What's included */}
        <FeaturesSection onGetPlan={scrollToPricing} />

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section 4 — Success Stories */}
        <SuccessStoriesSection />

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section 5 — Second Pricing Section */}
        <div ref={pricingRef2}>
          <PricingSection onGetPlan={handleGetPlan} countdown={countdown} answers={answers} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section 6 — FAQ */}
        <FAQSection />

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Section 7 — Risk-free Guarantee */}
        <GuaranteeSection />

        {/* Decline link */}
        <div className="text-center pb-4">
          <button
            onClick={handleDecline}
            className="text-[13px] text-[var(--text-muted)] underline hover:text-[var(--text-secondary)] transition-colors"
          >
            Not now
          </button>
        </div>
      </main>
    </div>
  );
}

// =============== PAGE EXPORT ===============
export default function OfferPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OfferContent />
    </Suspense>
  );
}
