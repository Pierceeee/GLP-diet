import type { Question, QuestionOption } from "@/types";

/**
 * Total number of quiz steps (excluding loading and email)
 */
export const TOTAL_STEPS = 24;

/**
 * Helper to create options with optional emoji/image
 */
function opt(
  id: string,
  label: string,
  emoji?: string,
  image?: string
): QuestionOption {
  return { id, label, emoji, image };
}

/**
 * All quiz questions configuration
 */
export const questions: Question[] = [
  // Step 1: GLP Diet Familiarity
  {
    id: "familiarity",
    step: 1,
    type: "single-select",
    title: "How familiar are you with the GLP diet?",
    options: [
      opt("beginner", "Beginner"),
      opt("heard", "I've heard a thing or two"),
      opt("expert", "Expert"),
    ],
  },

  // Step 2: GLP Diet Introduction (Info Card)
  {
    id: "glp-intro",
    step: 2,
    type: "info",
    title: "What is GLP diet?",
    subtitle:
      "The GLP diet is a balanced, nutrient-rich diet designed to naturally increase GLP levels and achieve best results by eliminating cravings.",
  },

  // Step 3: Goals (Multi-select)
  {
    id: "goals",
    step: 3,
    type: "multi-select",
    title: "What are your goals?",
    subtitle: "Select all that apply:",
    options: [
      opt("manage-weight", "Manage weight", "🔥"),
      opt("tone-body", "Tone my body", "💪"),
      opt("get-fit", "Get fit and healthy", "🏃"),
      opt("boost-metabolism", "Boost metabolism", "⚡"),
      opt("improve-energy", "Improve energy levels", "☀️"),
      opt("gut-health", "Improve gut health", "💚"),
    ],
  },

  // Step 4: Current Body Type (Gender-specific images)
  {
    id: "current-body-type",
    step: 4,
    type: "single-select",
    title: "Choose your current body type:",
    options: [
      opt("skinny", "Skinny"),
      opt("regular", "Regular"),
      opt("pot-belly", "Pot belly"),
      opt("extra", "Extra"),
    ],
    genderVariant: {
      male: {
        options: [
          opt("skinny", "Skinny", undefined, "/images/body/male-skinny.png"),
          opt("regular", "Regular", undefined, "/images/body/male-regular.png"),
          opt(
            "pot-belly",
            "Pot belly",
            undefined,
            "/images/body/male-potbelly.png"
          ),
          opt("extra", "Extra", undefined, "/images/body/male-extra.png"),
        ],
      },
      female: {
        options: [
          opt("skinny", "Skinny", undefined, "/images/body/female-skinny.png"),
          opt(
            "regular",
            "Regular",
            undefined,
            "/images/body/female-regular.png"
          ),
          opt(
            "pot-belly",
            "Pot belly",
            undefined,
            "/images/body/female-potbelly.png"
          ),
          opt("extra", "Extra", undefined, "/images/body/female-extra.png"),
        ],
      },
    },
  },

  // Step 5: Target Body Type (Gender-specific images)
  {
    id: "target-body-type",
    step: 5,
    type: "single-select",
    title: "Choose the body you want:",
    options: [
      opt("smaller", "A few sizes smaller"),
      opt("lean", "Lean"),
      opt("athletic", "Athletic"),
      opt("shredded", "Shredded"),
    ],
    genderVariant: {
      male: {
        options: [
          opt(
            "smaller",
            "A few sizes smaller",
            undefined,
            "/images/body/male-smaller.png"
          ),
          opt("lean", "Lean", undefined, "/images/body/male-lean.png"),
          opt(
            "athletic",
            "Athletic",
            undefined,
            "/images/body/male-athletic.png"
          ),
          opt(
            "shredded",
            "Shredded",
            undefined,
            "/images/body/male-shredded.png"
          ),
        ],
      },
      female: {
        options: [
          opt(
            "smaller",
            "A few sizes smaller",
            undefined,
            "/images/body/female-smaller.png"
          ),
          opt("lean", "Lean", undefined, "/images/body/female-lean.png"),
          opt("toned", "Toned", undefined, "/images/body/female-toned.png"),
          opt("fit", "Fit", undefined, "/images/body/female-fit.png"),
        ],
      },
    },
  },

  // Step 6: Body Parts to Improve (Uses BodyMapSelector)
  {
    id: "body-parts",
    step: 6,
    type: "multi-select",
    title: "Any areas you'd like to improve?",
    subtitle: "If you're happy with your appearance, then press Continue",
    options: [
      opt("arms", "Arms"),
      opt("chest", "Chest"),
      opt("back", "Back"),
      opt("belly", "Belly"),
      opt("butt", "Butt"),
      opt("legs", "Legs"),
    ],
  },

  // Step 7: Day-to-Day Activity (Gender-specific emoji)
  {
    id: "daily-activity",
    step: 7,
    type: "single-select",
    title: "What does your day-to-day look like?",
    options: [
      opt("sedentary", "I spend most of my day sitting", "🪑"),
      opt("light", "I walk around occasionally", "🚶"),
      opt("moderate", "I'm on my feet most of the day", "🧍"),
      opt("active", "I'm constantly moving", "🏃"),
    ],
    genderVariant: {
      female: {
        options: [
          opt("sedentary", "I spend most of my day sitting", "🪑"),
          opt("light", "I walk around occasionally", "🚶‍♀️"),
          opt("moderate", "I'm on my feet most of the day", "🧍‍♀️"),
          opt("active", "I'm constantly moving", "🏃‍♀️"),
        ],
      },
    },
  },

  // Step 8: Energy Level
  {
    id: "energy-level",
    step: 8,
    type: "single-select",
    title: "How would you describe your energy levels throughout the day?",
    options: [
      opt("low", "Low - I often feel tired", "😴"),
      opt("moderate", "Moderate - I have good and bad moments", "😐"),
      opt("high", "High - I have consistent energy", "⚡"),
      opt("variable", "It varies a lot", "🔄"),
    ],
  },

  // Step 9: Exercise Frequency
  {
    id: "exercise-frequency",
    step: 9,
    type: "single-select",
    title: "How often do you exercise?",
    options: [
      opt("never", "Rarely or never", "🚫"),
      opt("occasional", "1-2 times per week", "🏋️"),
      opt("regular", "3-4 times per week", "💪"),
      opt("frequent", "5+ times per week", "🔥"),
    ],
  },

  // Step 10: Weight Change Pattern
  {
    id: "weight-change",
    step: 10,
    type: "single-select",
    title: "How does your weight typically change?",
    options: [
      opt("stable", "It stays relatively stable"),
      opt("fluctuates", "It fluctuates up and down"),
      opt("gaining", "I've been slowly gaining weight"),
      opt("losing", "I've been slowly losing weight"),
    ],
  },

  // Step 11: Last Ideal Weight
  {
    id: "last-ideal-weight",
    step: 11,
    type: "single-select",
    title: "When was the last time you were at your ideal body weight?",
    options: [
      opt("less-1-year", "Less than 1 year ago"),
      opt("1-3-years", "1-3 years ago"),
      opt("3-5-years", "3-5 years ago"),
      opt("more-5-years", "More than 5 years ago"),
      opt("never", "I've never been at my ideal weight"),
    ],
  },

  // Step 12: High-Intent Pivot (Info Card)
  {
    id: "glp-benefits",
    step: 12,
    type: "info",
    title: "GLP diet is designed to boost your GLP levels naturally",
    subtitle:
      "With a plan created by top nutritionists and endocrinologists, you will naturally boost GLP levels, reduce cravings and make weight management easier.",
  },

  // Step 13: Previous Attempts
  {
    id: "previous-attempts",
    step: 13,
    type: "multi-select",
    title: "Have you tried any of these in the last 3 years?",
    subtitle: "Select all that apply:",
    options: [
      opt("calorie-counting", "Calorie counting", "📊"),
      opt("keto", "Keto diet", "🥑"),
      opt("intermittent-fasting", "Intermittent fasting", "⏰"),
      opt("gym", "Gym membership", "🏋️"),
      opt("supplements", "Weight loss supplements", "💊"),
      opt("meal-plans", "Meal delivery/plans", "🍱"),
      opt("none", "None of the above", "❌"),
    ],
  },

  // Step 14: Motivation (Gender-specific)
  {
    id: "motivation",
    step: 14,
    type: "single-select",
    title: "What is the main reason you want to get in shape?",
    options: [
      opt("health", "Improve my health", "❤️"),
      opt("confidence", "Feel more confident", "💪"),
      opt("energy", "Have more energy", "⚡"),
      opt("appearance", "Look better", "✨"),
      opt("event", "Special event coming up", "🎉"),
      opt("doctor", "Doctor's recommendation", "🩺"),
    ],
    genderVariant: {
      female: {
        options: [
          opt("health", "Improve my health", "❤️"),
          opt("confidence", "Feel more confident", "💃"),
          opt("energy", "Have more energy", "⚡"),
          opt("appearance", "Look better in clothes", "👗"),
          opt("event", "Special event coming up", "🎉"),
          opt("doctor", "Doctor's recommendation", "🩺"),
        ],
      },
    },
  },

  // Step 15: Height
  {
    id: "height",
    step: 15,
    type: "number",
    title: "What is your height?",
    subtitle: "Calculating your body mass index",
    placeholder: "170",
    unit: "cm",
    validation: {
      required: true,
      min: 120,
      max: 220,
      message: "Height should be between 120 and 220 cm",
    },
  },

  // Step 16: Current Weight
  {
    id: "weight",
    step: 16,
    type: "number",
    title: "What is your current weight?",
    placeholder: "70",
    unit: "kg",
    validation: {
      required: true,
      min: 40,
      max: 200,
      message: "Weight should be between 40 and 200 kg",
    },
  },

  // Step 17: Target Weight
  {
    id: "target-weight",
    step: 17,
    type: "number",
    title: "What is your target weight?",
    placeholder: "65",
    unit: "kg",
    validation: {
      required: true,
      min: 40,
      max: 200,
      message: "Target weight should be between 40 and 200 kg",
    },
  },

  // Step 18: Age
  {
    id: "age",
    step: 18,
    type: "number",
    title: "How old are you?",
    placeholder: "30",
    unit: "years",
    validation: {
      required: true,
      min: 18,
      max: 100,
      message: "Age should be between 18 and 100 years",
    },
  },

  // Step 19: Personal Summary (Dynamic Display)
  {
    id: "personal-summary",
    step: 19,
    type: "info",
    title: "Your personal summary",
    subtitle: "Based on your answers, here's what we know about you.",
  },

  // Step 20: Meals Per Day
  {
    id: "meals-per-day",
    step: 20,
    type: "single-select",
    title: "How many meals a day would you like to have?",
    options: [
      opt("2", "2 meals", "🍽️"),
      opt("3", "3 meals", "🍽️🍽️"),
      opt("4", "4 meals", "🍽️🍽️🍽️"),
      opt("5+", "5 or more meals", "🍽️🍽️🍽️🍽️"),
    ],
  },

  // Step 21: Exclude Proteins/Dairy
  {
    id: "exclude-proteins",
    step: 21,
    type: "multi-select",
    title: "Would you like to exclude any of these products from your plan?",
    subtitle: "Proteins and dairy:",
    options: [
      opt("none", "I eat them all"),
      opt("chicken", "Chicken", "🍗"),
      opt("turkey", "Turkey", "🦃"),
      opt("red-meat", "Red meat", "🥩"),
      opt("eggs", "Eggs", "🥚"),
      opt("greek-yogurt", "Greek yogurt", "🥛"),
      opt("cheese", "Cheese", "🧀"),
      opt("tuna", "Tuna", "🐟"),
      opt("salmon", "Salmon", "🐟"),
      opt("shrimp", "Shrimp", "🦐"),
      opt("lentils", "Lentils", "🫘"),
      opt("tofu", "Tofu", "🧈"),
      opt("edamame", "Edamame", "🌱"),
      opt("kidney-beans", "Kidney beans", "🫘"),
    ],
  },

  // Step 22: Exclude Vegetables
  {
    id: "exclude-vegetables",
    step: 22,
    type: "multi-select",
    title: "Would you like to exclude any of these products from your plan?",
    subtitle: "Vegetables:",
    options: [
      opt("none", "I eat them all"),
      opt("broccoli", "Broccoli", "🥦"),
      opt("spinach", "Spinach", "🥬"),
      opt("kale", "Kale", "🥬"),
      opt("carrots", "Carrots", "🥕"),
      opt("peppers", "Bell peppers", "🫑"),
      opt("tomatoes", "Tomatoes", "🍅"),
      opt("cucumber", "Cucumber", "🥒"),
      opt("zucchini", "Zucchini", "🥒"),
      opt("asparagus", "Asparagus", "🌿"),
      opt("mushrooms", "Mushrooms", "🍄"),
    ],
  },

  // Step 23: Exclude Fruits
  {
    id: "exclude-fruits",
    step: 23,
    type: "multi-select",
    title: "Would you like to exclude any of these products from your plan?",
    subtitle: "Fruits:",
    options: [
      opt("none", "I eat them all"),
      opt("apples", "Apples", "🍎"),
      opt("bananas", "Bananas", "🍌"),
      opt("oranges", "Oranges", "🍊"),
      opt("berries", "Berries", "🫐"),
      opt("grapes", "Grapes", "🍇"),
      opt("mango", "Mango", "🥭"),
      opt("pineapple", "Pineapple", "🍍"),
      opt("watermelon", "Watermelon", "🍉"),
      opt("avocado", "Avocado", "🥑"),
    ],
  },

  // Step 24: Loading/Calculating (Special Type)
  {
    id: "calculating",
    step: 24,
    type: "loading",
    title: "Generating...",
    subtitle: "Creating your personalized GLP diet plan",
  },
];

/**
 * Get question by step number
 */
export function getQuestionByStep(step: number): Question | undefined {
  return questions.find((q) => q.step === step);
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

/**
 * Get question with gender-specific content applied
 */
export function getQuestionWithGender(
  question: Question,
  gender: "male" | "female"
): Question {
  if (!question.genderVariant || !question.genderVariant[gender]) {
    return question;
  }

  return {
    ...question,
    ...question.genderVariant[gender],
  };
}

/**
 * Loading screen messages for step 24
 */
export const loadingMessages = [
  { text: "Reviewing your answers...", delay: 0 },
  { text: "Analyzing your preferences...", delay: 2000 },
  { text: "Adjusting the timeline...", delay: 4000 },
  { text: "Finalizing your personalized plan...", delay: 6000 },
];

/**
 * Email capture step config
 */
export const emailStep = {
  id: "email",
  title: "Enter your email to get your",
  highlight: "Personalized GLP Diet Plan",
  placeholder: "Your email",
  buttonText: "Claim my plan",
  disclaimer:
    "By continuing this, you agree to our Privacy policy. We respect your privacy. We will never sell, rent or share your email address. That's more than a policy, it's our personal guarantee!",
};
