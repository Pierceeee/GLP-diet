import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for optimal class name handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate BMI from height (cm) and weight (kg)
 */
export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Get BMI category based on BMI value
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

/**
 * Calculate weight loss percentage
 */
export function calculateWeightLossPercentage(
  currentWeight: number,
  targetWeight: number
): number {
  if (currentWeight <= 0) return 0;
  const percentage = ((currentWeight - targetWeight) / currentWeight) * 100;
  return Math.round(percentage * 10) / 10;
}

/**
 * Format a number with proper decimal places
 */
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}

/**
 * Delay execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random UUID
 */
export function generateId(): string {
  return crypto.randomUUID();
}
