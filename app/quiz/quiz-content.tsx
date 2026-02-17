"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizState } from "@/lib/quiz";
import {
  QuizHeader,
  QuestionCard,
  LoadingScreen,
  EmailCapture,
  SummaryAfterEmail,
  FatBurningRateScreen,
  PlanReadyScreen,
  PlanIncludesScreen,
  TestimonialsScreen,
  AnimatedContainer,
} from "@/components/quiz";

export function QuizContent() {
  const router = useRouter();
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [postEmailStep, setPostEmailStep] = useState(0);
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
    totalSteps,
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

  // Handle email submission: show summary after email, then offer on Continue
  const handleEmailSubmit = useCallback((email: string) => {
    // In production, save to Supabase and call AI analysis
    console.log("Email submitted:", email);
    setEmailSubmitted(true);
  }, []);

  const handlePostEmailContinue = useCallback(() => {
    if (postEmailStep < 4) {
      setPostEmailStep((s) => s + 1);
    } else {
      router.push("/offer");
    }
  }, [postEmailStep, router]);

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

  // If we're past the last question: email capture, then post-email screens
  if (step > totalSteps) {
    if (emailSubmitted) {
      const header = (
        <QuizHeader
          currentStep={step}
          showBack={false}
          showStepCount={false}
          totalSteps={totalSteps}
        />
      );
      if (postEmailStep === 0) {
        return (
          <div className="min-h-screen bg-white">
            {header}
            <SummaryAfterEmail
              answers={answers}
              onContinue={handlePostEmailContinue}
            />
          </div>
        );
      }
      if (postEmailStep === 1) {
        return (
          <div className="min-h-screen bg-white">
            {header}
            <FatBurningRateScreen
              answers={answers}
              onContinue={handlePostEmailContinue}
            />
          </div>
        );
      }
      if (postEmailStep === 2) {
        return (
          <div className="min-h-screen bg-white">
            {header}
            <PlanReadyScreen
              answers={answers}
              onContinue={handlePostEmailContinue}
            />
          </div>
        );
      }
      if (postEmailStep === 3) {
        return (
          <div className="min-h-screen bg-white">
            {header}
            <PlanIncludesScreen onContinue={handlePostEmailContinue} />
          </div>
        );
      }
      return (
        <div className="min-h-screen bg-white">
          {header}
          <TestimonialsScreen onContinue={handlePostEmailContinue} />
        </div>
      );
    }
    return <EmailCapture onSubmit={handleEmailSubmit} />;
  }

  // Loading step (step 28); step 29 = meal combinations summary
  if (isLoadingStep) {
    return (
      <div className="min-h-screen bg-white">
        <QuizHeader currentStep={step} showBack={false} showStepCount={false} totalSteps={totalSteps} />
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
        totalSteps={totalSteps}
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
