/**
 * Gender type for personalized content
 */
export type Gender = "male" | "female";

/**
 * Question types supported in the quiz
 */
export type QuestionType =
  | "single-select"
  | "multi-select"
  | "text"
  | "number"
  | "slider"
  | "info"
  | "loading";

/**
 * Option for select-type questions
 */
export interface QuestionOption {
  id: string;
  label: string;
  emoji?: string;
  image?: string;
  description?: string;
}

/**
 * Validation rules for questions
 */
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
}

/**
 * Question definition with optional gender variants
 */
export interface Question {
  id: string;
  step: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  validation?: ValidationRule;
  placeholder?: string;
  unit?: string;
  genderVariant?: {
    male?: Partial<Omit<Question, "id" | "step" | "type">>;
    female?: Partial<Omit<Question, "id" | "step" | "type">>;
  };
  showIf?: (answers: QuizAnswers) => boolean;
  computeDisplay?: (answers: QuizAnswers) => string;
}

/**
 * Answer value types
 */
export type AnswerValue = string | string[] | number | boolean | null;

/**
 * Quiz answers stored by question ID
 */
export type QuizAnswers = Record<string, AnswerValue>;

/**
 * Submission status
 */
export type SubmissionStatus = "started" | "completed" | "purchased";

/**
 * Funnel submission record stored in database
 */
export interface FunnelSubmission {
  id: string;
  created_at: string;
  updated_at: string;
  gender: Gender | null;
  current_step: number;
  answers: QuizAnswers;
  ai_analysis: string | null;
  status: SubmissionStatus;
  email: string | null;
  metadata: Record<string, unknown>;
}

/**
 * AI Provider type
 */
export type AIProvider = "openai" | "gemini";

/**
 * AI Analysis request
 */
export interface AnalysisRequest {
  answers: QuizAnswers;
  gender: Gender;
  submissionId: string;
}

/**
 * AI Analysis response
 */
export interface AnalysisResponse {
  success?: boolean;
  summary: string;
  keyInsights?: string[];
  recommendations?: string[];
  timeline?: string;
  confidence?: number;
  error?: string;
}
