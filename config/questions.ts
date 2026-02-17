import type { Question, QuestionOption, Gender } from "@/types";

/** Steps skipped for women: 16 (weight loss multiplier info card). */
const STEPS_SKIP_FOR_FEMALE: number[] = [16];

/**
 * Total number of quiz steps (excluding loading and email)
 */
export const TOTAL_STEPS = 29;

/** For women, only these question steps are shown (in order). */
const FEMALE_VISIBLE_STEPS: number[] = (() => {
  const all = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);
  return all.filter((s) => !STEPS_SKIP_FOR_FEMALE.includes(s));
})();

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
  // Step 1: GLP-1 Medication Status
  {
    id: "glp1-medication",
    step: 1,
    type: "single-select",
    title: "Are you currently taking a GLP-1 medication for weight control?",
    options: [
      opt("yes", "Yes"),
      opt("no", "No"),
      opt("prefer-not-answer", "I would rather not answer"),
    ],
  },

  // Step 2: GLP-1 Familiarity
  {
    id: "familiarity",
    step: 2,
    type: "single-select",
    title: "How familiar are you with hunger and satiety hormones such as GLP-1?",
    options: [
      opt("beginner", "Beginner"),
      opt("heard", "Heard a bit"),
      opt("expert", "Expert"),
    ],
  },

  // Step 3: What is the Personalized GLP-1 Programme? (Info Card)
  {
    id: "glp-intro",
    step: 3,
    type: "info",
    title: "What is the Personalized GLP-1 Programme?",
    subtitle:
      "If you are often hungry soon after eating, it is not a willpower issue. It is a hunger-signal issue.\n\nThe Personalized GLP-1 Programme is built around GLP-1, the hormone that tells your brain you are full. When this signal is weak, cravings stay high and dieting feels hard.\n\nGLP-1 medications such as Ozempic proved one thing: when hunger is regulated, weight loss becomes easier.\n\nThis programme supports your body natural GLP-1 response through food and meal structure, without injections or medication.\n\nWhen hunger goes down, weight loss follows.",
  },

  // Step 4: What would you like to focus on? (Multi-select)
  {
    id: "goals",
    step: 4,
    type: "multi-select",
    title: "What would you like to focus on?",
    subtitle: "Select all that apply:",
    options: [
      opt("weight-control", "Weight control"),
      opt("body-toning", "Body toning"),
      opt("overall-health", "Overall health"),
      opt("natural-glp1", "Natural GLP-1 support"),
      opt("medication-support", "Medication support"),
      opt("metabolic-health", "Metabolic health"),
      opt("energy-levels", "Energy levels"),
      opt("gut-health", "Gut health"),
    ],
  },

  // Step 5: Current Body Type (Gender-specific)
  {
    id: "current-body-type",
    step: 5,
    type: "single-select",
    title: "Which body type best describes you?",
    options: [
      opt("slim", "Slim"),
      opt("average", "Average"),
      opt("soft-midsection", "Soft midsection"),
      opt("overweight", "Overweight"),
    ],
    genderVariant: {
      male: {
        options: [
          opt("slim", "Slim", undefined, "/images/body/male-skinny.png"),
          opt("average", "Average", undefined, "/images/body/male-regular.png"),
          opt(
            "soft-midsection",
            "Soft midsection",
            undefined,
            "/images/body/male-potbelly.png"
          ),
          opt("overweight", "Overweight", undefined, "/images/body/male-extra.png"),
        ],
      },
      female: {
        options: [
          opt("slim", "Slim", undefined, "/images/body/female-skinny.png"),
          opt(
            "average",
            "Average",
            undefined,
            "/images/body/female-regular.png"
          ),
          opt(
            "curvier",
            "Curvier",
            undefined,
            "/images/body/female-potbelly.png"
          ),
          opt("overweight", "Overweight", undefined, "/images/body/female-extra.png"),
        ],
      },
    },
  },

  // Step 6: Target Body Type (Gender-specific)
  {
    id: "target-body-type",
    step: 6,
    type: "single-select",
    title: "How would you like to look?",
    options: [
      opt("smaller", "A bit smaller"),
      opt("lean", "Lean"),
      opt("athletic", "Athletic"),
      opt("defined", "Defined"),
    ],
    genderVariant: {
      male: {
        options: [
          opt(
            "smaller",
            "A bit smaller",
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
            "defined",
            "Defined",
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
          opt("fit", "Fit", undefined, "/images/body/female-lean.png"),
          opt("toned", "Toned", undefined, "/images/body/female-toned.png"),
          opt("curvier", "Curvier", undefined, "/images/body/female-fit.png"),
        ],
      },
    },
  },

  // Step 7: Body Parts to Improve (Uses BodyMapSelector)
  {
    id: "body-parts",
    step: 7,
    type: "multi-select",
    title: "Are there any areas you would like to focus on?",
    subtitle: "If you are already happy with how you look, you can continue.",
    options: [
      opt("arms", "Arms"),
      opt("back", "Back"),
      opt("glutes", "Glutes"),
      opt("chest", "Chest"),
      opt("midsection", "Midsection"),
      opt("legs", "Legs"),
    ],
  },

  // Step 8: Social Proof Info Card (Gender-specific)
  {
    id: "social-proof",
    step: 8,
    type: "info",
    title: "Many users report visible progress within the first month.",
    subtitle: "Illustrative example: Lost 14 kg and finally seeing clear shape again.\n\n\"I had been thinking about GLP-1 medications, but the potential side effects and the idea of lifelong treatment scared me. Then I discovered a GLP-1 approach that works through the same mechanism naturally. In about 5 weeks, I lost around 14 kg and felt in control of my eating again.\"\n\n— Alex R., 39",
    genderVariant: {
      female: {
        subtitle: "Illustrative example: Lost around 16 kg and felt lighter, more energized, and less bloated.\n\n\"I had just over a month before my wedding and needed something that actually worked. I tried medication first but had to stop because of side effects. Then I switched to a GLP-1-focused eating approach and finally made real progress without medication.\"\n\n— Laura M., 42",
      },
    },
  },

  // Step 9: Day-to-Day Activity
  {
    id: "daily-activity",
    step: 9,
    type: "single-select",
    title: "What best describes your daily routine?",
    options: [
      opt("desk-based", "Desk-based"),
      opt("very-active", "Very active"),
      opt("train-often", "Train often"),
      opt("home-focused", "Home-focused"),
    ],
  },

  // Step 10: Energy Level
  {
    id: "energy-level",
    step: 10,
    type: "single-select",
    title: "How do your energy levels feel during the day?",
    options: [
      opt("low-all-day", "Low all day"),
      opt("post-lunch-slump", "Post-lunch slump"),
      opt("tired-before-meals", "Tired before meals"),
      opt("stable-high", "Stable and high"),
    ],
  },

  // Step 11: Exercise Frequency
  {
    id: "exercise-frequency",
    step: 11,
    type: "single-select",
    title: "How active are you?",
    options: [
      opt("never", "Never"),
      opt("few-times-month", "A few times per month"),
      opt("few-times-week", "A few times per week"),
      opt("most-days", "Most days"),
    ],
  },

  // Step 12: Weight Change Pattern
  {
    id: "weight-change",
    step: 12,
    type: "single-select",
    title: "Describe your typical weight pattern.",
    options: [
      opt("gain-easy-lose-slow", "Gain easily and lose slowly"),
      opt("gain-lose-easy", "Gain and lose easily"),
      opt("struggle-gain", "Struggle to gain weight or muscle"),
    ],
  },

  // Step 13: Last Ideal Weight
  {
    id: "last-ideal-weight",
    step: 13,
    type: "single-select",
    title: "When did you last feel at your ideal weight?",
    options: [
      opt("within-year", "Within the past year"),
      opt("1-3-years", "1-3 years ago"),
      opt("more-3-years", "More than 3 years ago"),
      opt("never", "Never"),
    ],
  },

  // Step 14: Expert Backing Info Card
  {
    id: "glp-benefits",
    step: 14,
    type: "info",
    title: "Designed by endocrinologists and nutrition experts.",
    subtitle:
      "The Personalized GLP-1 Programme helps your body send stronger fullness signals using food and meal timing, so eating less feels natural, not forced.\n\nPowered by AI, your plan adapts based on how your hunger actually responds.\n\nYou may feel full sooner and crave less, with more stable energy and blood sugar.",
  },

  // Step 15: Previous Diet Attempts
  {
    id: "previous-attempts",
    step: 15,
    type: "multi-select",
    title: "Which diets have you tried recently?",
    subtitle: "Select all that apply:",
    options: [
      opt("keto", "Keto diet"),
      opt("intermittent-fasting", "Intermittent fasting"),
      opt("vegetarian", "Vegetarian diet"),
      opt("vegan", "Vegan diet"),
      opt("low-carb", "Low-carb diet"),
      opt("gluten-free", "Gluten-free diet"),
      opt("other", "Other"),
      opt("none", "None of the above"),
    ],
  },

  // Step 16: Weight Loss Multiplier Info Card
  {
    id: "weight-loss-multiplier",
    step: 16,
    type: "info",
    title: "Lose up to 3x more weight with a personalized programme compared to standard meal plans.",
  },

  // Step 17: Motivation (Gender-specific)
  {
    id: "motivation",
    step: 17,
    type: "single-select",
    title: "What is your primary motivation for losing weight and getting healthier?",
    options: [
      opt("confidence", "Feel more confident"),
      opt("attractiveness", "Increase attractiveness"),
      opt("energy-health", "Boost energy and health"),
      opt("mental-wellbeing", "Improve mental well-being"),
      opt("clothes", "Fit clothes better"),
      opt("medication-support", "Support GLP-1 medication results"),
      opt("other", "Other"),
    ],
    genderVariant: {
      female: {
        options: [
          opt("confidence", "Feel more confident"),
          opt("attractiveness", "Increase attractiveness"),
          opt("energy-health", "Boost energy and health"),
          opt("mental-wellbeing", "Improve mental well-being"),
          opt("clothes", "Fit clothes better"),
          opt("post-pregnancy", "Return to shape after pregnancy"),
          opt("other", "Other"),
        ],
      },
    },
  },

  // Step 18: Height
  {
    id: "height",
    step: 18,
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

  // Step 19: Current Weight
  {
    id: "weight",
    step: 19,
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

  // Step 20: Target Weight
  {
    id: "target-weight",
    step: 20,
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

  // Step 21: Age
  {
    id: "age",
    step: 21,
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

  // Step 22: Personal Summary (Dynamic Display)
  {
    id: "personal-summary",
    step: 22,
    type: "info",
    title: "Your Personal Summary",
    subtitle: "Based on your answers, here's what we know about you.",
  },

  // Step 23: Weight Prediction (target date + graph + good news)
  {
    id: "weight-prediction",
    step: 23,
    type: "info",
    title: "Your weight prediction",
    subtitle: "Based on similar users, we estimate when you could reach your goal.",
  },

  // Step 24: Meals Per Day
  {
    id: "meals-per-day",
    step: 24,
    type: "single-select",
    title: "How many meals per day do you prefer?",
    options: [
      opt("3", "Three meals (breakfast, lunch, dinner)"),
      opt("4", "Four meals (with one snack)"),
      opt("5", "Five meals (with two snacks)"),
    ],
  },

  // Step 25: Exclude Proteins/Dairy
  {
    id: "exclude-proteins",
    step: 25,
    type: "multi-select",
    title: "Would you like to exclude any proteins or dairy?",
    subtitle: "Proteins and dairy:",
    options: [
      opt("none", "I eat them all"),
      opt("chicken", "Chicken"),
      opt("turkey", "Turkey"),
      opt("red-meat", "Red meat"),
      opt("eggs", "Eggs"),
      opt("greek-yogurt", "Greek yogurt"),
      opt("cheese", "Cheese"),
      opt("tuna", "Tuna"),
      opt("salmon", "Salmon"),
      opt("shrimp", "Shrimp"),
      opt("lentils", "Lentils"),
      opt("tofu", "Tofu"),
      opt("edamame", "Edamame"),
      opt("kidney-beans", "Kidney beans"),
    ],
  },

  // Step 26: Exclude Fruits and Vegetables
  {
    id: "exclude-vegetables",
    step: 26,
    type: "multi-select",
    title: "Would you like to exclude any fruits or vegetables?",
    subtitle: "Fruits and vegetables:",
    options: [
      opt("none", "I eat them all"),
      opt("olives", "Olives"),
      opt("avocados", "Avocados"),
      opt("tomatoes", "Tomatoes"),
      opt("cucumber", "Cucumber"),
      opt("broccoli", "Broccoli"),
      opt("spinach", "Spinach"),
      opt("zucchini", "Zucchini"),
      opt("peppers", "Bell peppers"),
      opt("mushrooms", "Mushrooms"),
      opt("onions", "Onions"),
      opt("potatoes", "Potatoes"),
    ],
  },

  // Step 27: Exclude Nuts and Grains
  {
    id: "exclude-fruits",
    step: 27,
    type: "multi-select",
    title: "Would you like to exclude any nuts or grains?",
    subtitle: "Nuts and grains:",
    options: [
      opt("none", "I eat them all"),
      opt("almonds", "Almonds"),
      opt("walnuts", "Walnuts"),
      opt("peanuts", "Peanuts"),
      opt("pasta", "Pasta"),
      opt("rice", "Rice"),
      opt("couscous", "Couscous"),
      opt("quinoa", "Quinoa"),
      opt("oats", "Oats"),
      opt("buckwheat", "Buckwheat"),
      opt("corn", "Corn"),
      opt("bread", "Bread"),
    ],
  },

  // Step 28: Loading/Calculating (Special Type)
  {
    id: "calculating",
    step: 28,
    type: "loading",
    title: "Generating...",
    subtitle: "Creating your personalized GLP diet plan",
  },

  // Step 29: Meal combinations summary (after generating)
  {
    id: "meal-combinations",
    step: 29,
    type: "info",
    title: "Your personalized meal plan",
    subtitle: "We've created over 1000 meal combinations just for you.",
  },
];

/**
 * Get question by step number.
 * Gender-specific content is handled via genderVariant on each question.
 */
export function getQuestionByStep(
  step: number,
  gender?: Gender
): Question | undefined {
  const isFemale = gender?.toLowerCase() === "female";
  const effectiveStep = isFemale
    ? FEMALE_VISIBLE_STEPS[step - 1] ?? step
    : step;
  return questions.find((q) => q.step === effectiveStep);
}

/**
 * Total steps for a given gender.
 */
export function getTotalSteps(gender?: Gender): number {
  return gender === "female" ? TOTAL_STEPS - STEPS_SKIP_FOR_FEMALE.length : TOTAL_STEPS;
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
 * Loading screen messages for step 28
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
  title: "Enter your email to receive your Personalized GLP-1 Programme.",
  highlight: "Personalized GLP-1 Programme",
  placeholder: "Email",
  buttonText: "Get my plan",
  disclaimer:
    "By continuing, you agree to our Privacy Policy. We respect your privacy and will never sell, rent, or share your email address.",
};
