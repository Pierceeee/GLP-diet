"use client";

import { Suspense } from "react";
import { QuizContent } from "./quiz-content";

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading quiz...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
