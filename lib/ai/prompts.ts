import type { QuizAnswers, Gender } from "@/types";
import { calculateBMI, getBMICategory, calculateWeightLossPercentage } from "@/lib/utils";

/**
 * System prompt for the AI analysis
 */
export const SYSTEM_PROMPT = `You are an expert GLP-1 diet consultant and nutritionist with deep knowledge in:
- Weight management and metabolism optimization
- GLP-1 hormone regulation through diet
- Personalized nutrition planning
- Behavioral nutrition psychology

Your role is to analyze quiz answers and provide a personalized, encouraging, and actionable diet analysis.

Guidelines:
1. Be warm, supportive, and professional
2. Use the user's specific data to personalize recommendations
3. Focus on achievable, sustainable changes
4. Highlight the benefits of the GLP diet approach
5. Keep the analysis concise but impactful (300-500 words)
6. Structure your response with clear sections
7. Include specific food recommendations based on their preferences
8. Address their stated goals directly`;

/**
 * Build the analysis prompt from quiz answers
 */
export function buildAnalysisPrompt(answers: QuizAnswers, gender: Gender): string {
  const height = answers.height as number;
  const weight = answers.weight as number;
  const targetWeight = answers["target-weight"] as number;
  const age = answers.age as number;
  const goals = (answers.goals as string[]) || [];
  const energyLevel = answers["energy-level"] as string;
  const exerciseFrequency = answers["exercise-frequency"] as string;
  const motivation = answers.motivation as string;
  const mealsPerDay = answers["meals-per-day"] as string;
  const excludedProteins = (answers["exclude-proteins"] as string[]) || [];
  const excludedVegetables = (answers["exclude-vegetables"] as string[]) || [];
  const excludedFruits = (answers["exclude-fruits"] as string[]) || [];

  // Calculate BMI
  const bmi = height && weight ? calculateBMI(height, weight) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : "Unknown";
  const weightLossPercent = weight && targetWeight 
    ? calculateWeightLossPercentage(weight, targetWeight) 
    : 0;

  // Format goals
  const goalLabels: Record<string, string> = {
    "manage-weight": "weight management",
    "tone-body": "body toning",
    "get-fit": "getting fit and healthy",
    "boost-metabolism": "boosting metabolism",
    "improve-energy": "improving energy levels",
    "gut-health": "improving gut health",
  };
  const formattedGoals = goals.map(g => goalLabels[g] || g).join(", ");

  // Format energy level
  const energyLabels: Record<string, string> = {
    low: "often feeling tired",
    moderate: "having moderate energy with ups and downs",
    high: "having consistent high energy",
    variable: "experiencing variable energy throughout the day",
  };
  const energyDescription = energyLabels[energyLevel] || "unknown energy levels";

  // Format exercise frequency
  const exerciseLabels: Record<string, string> = {
    never: "rarely or never exercising",
    occasional: "exercising 1-2 times per week",
    regular: "exercising 3-4 times per week",
    frequent: "exercising 5+ times per week",
  };
  const exerciseDescription = exerciseLabels[exerciseFrequency] || "unknown exercise habits";

  // Build food restrictions
  const restrictions = [
    ...excludedProteins.filter(p => p !== "none"),
    ...excludedVegetables.filter(v => v !== "none"),
    ...excludedFruits.filter(f => f !== "none"),
  ];
  const hasRestrictions = restrictions.length > 0;
  const restrictionText = hasRestrictions 
    ? `They want to exclude: ${restrictions.join(", ")}.`
    : "They have no specific food restrictions.";

  return `Please analyze the following quiz responses and create a personalized GLP diet analysis:

## User Profile
- **Gender:** ${gender}
- **Age:** ${age} years old
- **Current Weight:** ${weight} kg
- **Target Weight:** ${targetWeight} kg (${weightLossPercent}% weight loss goal)
- **Height:** ${height} cm
- **BMI:** ${bmi?.toFixed(1)} (${bmiCategory})

## Goals & Lifestyle
- **Primary Goals:** ${formattedGoals || "Not specified"}
- **Main Motivation:** ${motivation || "Not specified"}
- **Energy Levels:** ${energyDescription}
- **Exercise Habits:** ${exerciseDescription}
- **Preferred Meals per Day:** ${mealsPerDay || "3"} meals

## Dietary Preferences
${restrictionText}

---

Please provide:
1. **Your Personal Analysis** - A brief assessment of their current situation and goals
2. **Why GLP Diet Works for You** - Explain how the GLP diet addresses their specific needs
3. **Your Customized Approach** - Key dietary changes tailored to their preferences
4. **Expected Benefits** - What they can expect to achieve
5. **First Steps** - 3 actionable items they can start today

Make the response personal, encouraging, and specific to their data.`;
}
