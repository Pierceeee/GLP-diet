import type { QuizAnswers, Gender, AIProvider } from "@/types";
import { buildAnalysisPrompt } from "./prompts";
import { openaiGenerate } from "./openai";
import { geminiGenerate } from "./gemini";

/**
 * Default fallback analysis when AI is not configured
 */
function getFallbackAnalysis(answers: QuizAnswers, gender: Gender): string {
  const weight = answers.weight as number;
  const targetWeight = answers["target-weight"] as number;
  const weightLoss = weight - targetWeight;
  const goals = (answers.goals as string[]) || [];

  return `
## Your Personal Analysis

Based on your quiz responses, we've created a personalized GLP diet plan designed specifically for you.

### Your Goals
You're looking to ${goals.length > 0 ? goals.join(", ").replace("manage-weight", "manage your weight") : "improve your overall health"}, and with a target of losing ${weightLoss} kg, you're setting yourself up for meaningful, achievable results.

### Why GLP Diet Works for You

The GLP diet is designed to naturally boost your GLP-1 hormone levels, which:
- Reduces hunger and cravings
- Improves metabolic function
- Supports sustainable weight loss
- Enhances energy levels throughout the day

### Your Customized Approach

Based on your preferences and lifestyle, your plan will include:
1. **Balanced macronutrients** tailored to your activity level
2. **Meal timing** optimized for your daily schedule
3. **Food choices** that respect your preferences and restrictions

### Expected Benefits

With consistent adherence to your personalized plan, you can expect:
- Gradual, sustainable weight loss
- Improved energy and mood
- Reduced cravings and better appetite control
- Better sleep quality

### First Steps

1. **Start with breakfast** - Include protein and healthy fats to stabilize blood sugar
2. **Stay hydrated** - Aim for 8 glasses of water daily
3. **Plan your meals** - Preparation is key to success

Your personalized plan is ready! Let's begin your transformation journey.
  `.trim();
}

/**
 * Generate personalized analysis using the configured AI provider
 */
export async function generateAnalysis(
  answers: QuizAnswers,
  gender: Gender,
  provider?: AIProvider
): Promise<string> {
  // Determine which provider to use
  const selectedProvider = provider || (process.env.AI_PROVIDER as AIProvider) || "openai";

  // Build the prompt
  const prompt = buildAnalysisPrompt(answers, gender);

  try {
    // Check if API keys are configured
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasGemini = !!process.env.GOOGLE_AI_API_KEY;

    if (!hasOpenAI && !hasGemini) {
      console.warn("No AI API keys configured, using fallback analysis");
      return getFallbackAnalysis(answers, gender);
    }

    // Use the selected provider
    if (selectedProvider === "openai" && hasOpenAI) {
      return await openaiGenerate(prompt);
    } else if (selectedProvider === "gemini" && hasGemini) {
      return await geminiGenerate(prompt);
    } else if (hasOpenAI) {
      // Fallback to OpenAI if preferred provider not available
      return await openaiGenerate(prompt);
    } else if (hasGemini) {
      // Fallback to Gemini if OpenAI not available
      return await geminiGenerate(prompt);
    }

    // If nothing works, use fallback
    return getFallbackAnalysis(answers, gender);
  } catch (error) {
    console.error("AI generation failed, using fallback:", error);
    return getFallbackAnalysis(answers, gender);
  }
}
