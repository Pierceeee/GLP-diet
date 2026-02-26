"use client";

import type { Question, QuizAnswers, Gender, AnswerValue } from "@/types";
import { OptionButton } from "./OptionButton";
import { NumberInput } from "./NumberInput";
import { InfoCard } from "./InfoCard";
import { ContinueButton } from "./ContinueButton";
import { PersonalSummary } from "./PersonalSummary";
import { WeightPrediction } from "./WeightPrediction";
import { MealCombinationsSummary } from "./MealCombinationsSummary";
import { WeightLossMultiplierChart } from "./WeightLossMultiplierChart";
import { BodyMapSelector } from "./BodyMapSelector";
import { SocialProofIntro } from "./SocialProofIntro";
import { getQuestionWithGender } from "@/config/questions";

interface QuestionCardProps {
  question: Question;
  gender: Gender;
  currentAnswer: AnswerValue;
  allAnswers: QuizAnswers;
  onAnswer: (value: AnswerValue) => void;
  onContinue: () => void;
}

export function QuestionCard({
  question, gender, currentAnswer, allAnswers, onAnswer, onContinue,
}: QuestionCardProps) {
  const q = getQuestionWithGender(question, gender);

  const canContinue = () => {
    if (q.type === "info") return true;
    if (q.type === "single-select") return currentAnswer !== null;
    if (q.type === "multi-select") {
      // Body parts is optional - user can continue without selecting any
      if (q.id === "body-parts") return true;
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (q.type === "number") {
      const v = currentAnswer as number;
      if (v === null || v === undefined) return false;
      if (q.validation?.min !== undefined && v < q.validation.min) return false;
      if (q.validation?.max !== undefined && v > q.validation.max) return false;
      return true;
    }
    return currentAnswer !== null && currentAnswer !== undefined;
  };

  const handleSingle = (id: string) => {
    onAnswer(id);
    // Auto-advance for all single-select questions
    setTimeout(onContinue, 200);
  };

  const handleMulti = (id: string) => {
    const arr = Array.isArray(currentAnswer) ? currentAnswer : [];
    if (id === "none") { onAnswer([id]); return; }
    const f = arr.filter((x) => x !== "none");
    onAnswer(f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  };

  // --- Renderers ---
  const renderSingle = () => (
    <div className="space-y-3">
      {q.options?.map((o) => (
        <OptionButton key={o.id} label={o.label} emoji={o.emoji} image={o.image}
          selected={currentAnswer === o.id} onClick={() => handleSingle(o.id)} type="single" />
      ))}
    </div>
  );

  const renderMulti = () => {
    // Special case: Body parts question uses BodyMapSelector
    if (q.id === "body-parts") {
      return (
        <div className="space-y-6 pb-24">
          <BodyMapSelector
            gender={gender}
            selected={Array.isArray(currentAnswer) ? currentAnswer : []}
            onChange={handleMulti}
          />
        </div>
      );
    }

    return (
      <div className="space-y-3 pb-24">
        {q.options?.map((o) => (
          <OptionButton key={o.id} label={o.label} emoji={o.emoji} image={o.image}
            selected={Array.isArray(currentAnswer) && currentAnswer.includes(o.id)}
            onClick={() => handleMulti(o.id)} type="multi" />
        ))}
      </div>
    );
  };

  const renderStickyButton = () => {
    // Only show sticky button for multi-select questions
    if (q.type !== "multi-select") return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-[660px] mx-auto">
          <ContinueButton onClick={onContinue} disabled={canContinue() ? false : true} />
        </div>
      </div>
    );
  };

  const getBmiInfo = () => {
    const height = allAnswers.height as number;
    const weight = currentAnswer as number;
    if (!height || !weight) return null;
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiVal = bmi.toFixed(1);

    if (bmi < 18.5) {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmiVal}, which falls below the typical range`,
        description: null,
      };
    } else if (bmi < 25) {
      return {
        emoji: "👌",
        title: `A good starting BMI for building a fit body`,
        description: "Research shows that a GLP-1–focused diet can support metabolism, promote weight loss, improve muscle strength, and contribute to better overall health.",
      };
    } else if (bmi < 30) {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmiVal}, which is above the typical range`,
        description: "This means your weight is slightly higher than recommended for your height.\n\nWe'll use your BMI to create a personalized weight-loss plan designed specifically for you.",
      };
    } else {
      return {
        emoji: "❗",
        title: `Your BMI is ${bmiVal}, which is well above the typical range`,
        description: "Losing some weight could bring meaningful benefits to your health and energy levels.\n\nWe'll use your BMI to build the personalized weight-loss program that best fits your needs.",
      };
    }
  };

  const getTargetWeightInfo = () => {
    const currentWeight = allAnswers.weight as number;
    const targetWeight = currentAnswer as number;
    if (!currentWeight || !targetWeight || targetWeight >= currentWeight) return null;
    const lossPct = Math.round(((currentWeight - targetWeight) / currentWeight) * 100);

    if (lossPct <= 20) {
      return {
        emoji: "☝️",
        title: `HEALTH BENEFIT TARGET: lose ${lossPct}% of your body weight`,
        description: "Research shows that losing 10% or more of your body weight can lower the risk of several weight-related health issues, including heart disease, elevated blood sugar, and inflammation in blood vessels.",
      };
    } else {
      return {
        emoji: "☝️",
        title: `MORE AMBITIOUS GOAL: lose ${lossPct}% of your body weight`,
        description: "According to studies, people with excess weight who lose more than 20% of their body weight are nearly 2.5× more likely to achieve healthy metabolic markers compared to those who lose 5–10%.",
      };
    }
  };

  const renderNumber = () => {
    const bmiInfo = q.id === "weight" ? getBmiInfo() : null;
    const targetInfo = q.id === "target-weight" ? getTargetWeightInfo() : null;
    return (
    <div className="space-y-6">
      <NumberInput
        value={currentAnswer as number | null}
        onChange={(v) => onAnswer(v)}
        placeholder={q.placeholder}
        unit={q.unit}
        min={q.validation?.min}
        max={q.validation?.max}
        showBMI={q.id === "weight"}
        height={allAnswers.height as number}
        showWeightLossPercent={q.id === "target-weight"}
        currentWeight={allAnswers.weight as number}
      />
      {q.id === "height" && (
        <div className="bg-[var(--info-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="mr-1.5">☝️</span>
            <span className="font-semibold text-[var(--info-text)]">Why we calculate BMI</span>
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">
            BMI helps us understand your weight range based on your height, so we can better tailor your plan.
          </p>
        </div>
      )}
      {q.id === "age" && (
        <div className="bg-[var(--info-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="mr-1.5">☝️</span>
            <span className="font-semibold text-[var(--info-text)]">Your age helps us tailor your program.</span>
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">
            With age, metabolism can slow and body fat levels may increase, even at the same BMI.
          </p>
        </div>
      )}
      {bmiInfo && (
        <div className="bg-[var(--info-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="mr-1.5">{bmiInfo.emoji}</span>
            <span className="font-semibold text-[var(--info-text)]">{bmiInfo.title}</span>
          </p>
          {bmiInfo.description && (
            <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed whitespace-pre-line">{bmiInfo.description}</p>
          )}
        </div>
      )}
      {targetInfo && (
        <div className="bg-[var(--info-bg)] rounded-2xl px-5 py-4">
          <p className="text-[14px]">
            <span className="mr-1.5">{targetInfo.emoji}</span>
            <span className="font-semibold text-[var(--info-text)]">{targetInfo.title}</span>
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">{targetInfo.description}</p>
        </div>
      )}
      <ContinueButton onClick={onContinue} disabled={canContinue() ? false : true} />
    </div>
    );
  };

  const renderInfo = () => {
    if (q.id === "social-proof-intro") {
      return (
        <SocialProofIntro gender={gender} onContinue={onContinue} />
      );
    }
    if (q.id === "personal-summary") {
      return (
        <div className="space-y-6 pb-24">
          <PersonalSummary answers={allAnswers} gender={gender} />
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
            <div className="max-w-[660px] mx-auto">
              <ContinueButton onClick={onContinue}>Continue</ContinueButton>
            </div>
          </div>
        </div>
      );
    }
    if (q.id === "weight-prediction") {
      return (
        <WeightPrediction answers={allAnswers} onContinue={onContinue} />
      );
    }
    if (q.id === "meal-combinations") {
      return <MealCombinationsSummary onContinue={onContinue} />;
    }
    if (q.id === "weight-loss-multiplier") {
      return <WeightLossMultiplierChart onContinue={onContinue} />;
    }
    return (
      <div className="space-y-6 pb-24">
        <InfoCard title={q.title} subtitle={q.subtitle} image={q.image} benefits={q.benefits} />
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
          <div className="max-w-[660px] mx-auto">
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          </div>
        </div>
      </div>
    );
  };

  const content = () => {
    switch (q.type) {
      case "single-select": return renderSingle();
      case "multi-select": return renderMulti();
      case "number": return renderNumber();
      case "info": return renderInfo();
      default: return null;
    }
  };

  return (
    <>
      <div className="w-full max-w-[660px] mx-auto px-6 py-6">
        {q.type !== "info" && (
          <div className="text-center mb-8">
            <h2
              className="text-[24px] font-bold leading-tight mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {q.title}
            </h2>
            {q.subtitle && (
              <p className="text-[15px] font-semibold text-[var(--text-primary)]">{q.subtitle}</p>
            )}
          </div>
        )}
        {content()}
      </div>
      {renderStickyButton()}
    </>
  );
}
