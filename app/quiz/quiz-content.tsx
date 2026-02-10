"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizState } from "@/lib/quiz";
import {
  QuizHeader,
  QuestionCard,
  LoadingScreen,
  EmailCapture,
  AnimatedContainer,
} from "@/components/quiz";
import { TOTAL_STEPS } from "@/config/questions";

export function QuizContent() {
  const router = useRouter();
  const [direction, setDirection] = useState<"left" | "right">("right");
  const {
    step,
    gender,
    answers,
    currentQuestion,
    currentAnswer,
    isLoadingStep,
    nextStep,
    prevStep,
    setAnswer,
    initializeSubmission,
  } = useQuizState();

  // Initialize submission on mount
  useEffect(() => {
    initializeSubmission();
  }, [initializeSubmission]);

  // Handle loading screen completion
  const handleLoadingComplete = useCallback(() => {
    // Move to email capture step (step 25, beyond the regular questions)
    nextStep();
  }, [nextStep]);

  // Handle email submission
  const handleEmailSubmit = useCallback(
    (email: string) => {
      // In production, this would save to Supabase and call AI analysis
      console.log("Email submitted:", email);
      // Navigate to offer page
      router.push("/offer");
    },
    [router]
  );

  // Handle continue (next step)
  const handleContinue = useCallback(() => {
    setDirection("right");
    nextStep();
  }, [nextStep]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    setDirection("left");
    prevStep();
  }, [prevStep]);

  // If we're past the last question, show loading or email
  if (step > TOTAL_STEPS) {
    // Email capture step
    return <EmailCapture onSubmit={handleEmailSubmit} />;
  }

  // Loading step (step 24)
  if (isLoadingStep) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader currentStep={step} showBack={false} showStepCount={false} />
        <LoadingScreen onComplete={handleLoadingComplete} />
      </div>
    );
  }

  // No question found
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Question not found</p>
      </div>
    );
  }

  // Regular question step
  return (
    <div className="min-h-screen bg-white">
      <QuizHeader
        currentStep={step}
        onBack={handleBack}
        showBack={step > 1}
        showStepCount={currentQuestion.type !== "info"}
      />

      <main className="pt-4 pb-8">
        <AnimatedContainer keyProp={step} direction={direction}>
          <QuestionCard
            question={currentQuestion}
            gender={gender}
            currentAnswer={currentAnswer}
            allAnswers={answers}
            onAnswer={setAnswer}
            onContinue={handleContinue}
          />
        </AnimatedContainer>
      </main>
    </div>
  );
}
