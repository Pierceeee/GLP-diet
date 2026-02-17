"use client";

import type { Question, QuizAnswers, Gender, AnswerValue } from "@/types";
import { OptionButton } from "./OptionButton";
import { NumberInput } from "./NumberInput";
import { InfoCard } from "./InfoCard";
import { ContinueButton } from "./ContinueButton";
import { PersonalSummary } from "./PersonalSummary";
import { WeightPrediction } from "./WeightPrediction";
import { MealCombinationsSummary } from "./MealCombinationsSummary";
import { BodyMapSelector } from "./BodyMapSelector";
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
    if (q.type === "multi-select") return Array.isArray(currentAnswer) && currentAnswer.length > 0;
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
        <div className="space-y-6">
          <BodyMapSelector
            gender={gender}
            selected={Array.isArray(currentAnswer) ? currentAnswer : []}
            onChange={handleMulti}
          />
          <ContinueButton onClick={onContinue} disabled={!canContinue()} />
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {q.options?.map((o) => (
          <OptionButton key={o.id} label={o.label} emoji={o.emoji} image={o.image}
            selected={Array.isArray(currentAnswer) && currentAnswer.includes(o.id)}
            onClick={() => handleMulti(o.id)} type="multi" />
        ))}
        <div className="pt-3">
          <ContinueButton onClick={onContinue} disabled={!canContinue()} />
        </div>
      </div>
    );
  };

  const renderNumber = () => (
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
            <span className="mr-1.5">👆</span>
            <span className="font-semibold text-[var(--info-text)]">Calculating your body mass index</span>
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-relaxed">
            The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy.
          </p>
        </div>
      )}
      <ContinueButton onClick={onContinue} disabled={!canContinue()} />
    </div>
  );

  const renderInfo = () => {
    if (q.id === "personal-summary") {
      return (
        <div className="space-y-6">
          <PersonalSummary answers={allAnswers} gender={gender} />
          <ContinueButton onClick={onContinue}>Continue</ContinueButton>
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
    return (
      <div className="space-y-6">
        <InfoCard title={q.title} subtitle={q.subtitle} />
        <ContinueButton onClick={onContinue}>Continue</ContinueButton>
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
            <p className="text-[14px] text-[var(--text-muted)]">{q.subtitle}</p>
          )}
        </div>
      )}
      {content()}
    </div>
  );
}
