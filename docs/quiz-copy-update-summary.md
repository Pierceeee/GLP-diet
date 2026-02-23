# Quiz Copy Update Summary

**Date:** 2026-02-17  
**Source:** `docs/EN GLP1 Funnel Copy.pdf`

## Files Updated

### 1. `docs/en-glp1-funnel-quiz-copy.json` ✅ NEW
- Complete structured JSON extraction from the PDF
- Includes all quiz questions with gender variants
- All info blocks with insertion points
- Email capture copy

### 2. `config/questions.ts` ✅ UPDATED
All question copy has been updated to match the PDF funnel copy exactly.

## Key Changes

### Step 1: Familiarity
- **Before:** "How familiar are you with the GLP diet?"
- **After:** "How familiar are you with hunger & satiety hormones such as GLP-1?"
- Options updated: "I've heard a thing or two" → "Heard a bit"

### Step 2: GLP Introduction (Info Block)
- **Before:** Generic GLP diet description
- **After:** Full "What is the Personalized GLP-1 program?" copy with hormone education, Ozempic context, and natural approach positioning

### Step 3: Goals
- **Before:** "What are your goals?" with emojis
- **After:** "What would you like to focus on?" 
- Updated options to match PDF exactly (Weight control, Natural GLP-1 support, Medication support, etc.)
- Removed emojis

### Step 4: Current Body Type
- **Before:** "Choose your current body type:" with options like "Skinny", "Regular", "Pot belly", "Extra"
- **After:** "Which body type best describes you?"
- **Men:** Slim, Average, Soft midsection, Overweight
- **Women:** Slim, Average, Curvier, Overweight

### Step 5: Target Body Type
- **Before:** "Choose the body you want:"
- **After:** "How would you like to look?"
- **Men:** A bit smaller, Lean, Athletic, Defined
- **Women:** A few sizes smaller, Fit, Toned, Curvier

### Step 6: Body Parts
- **Before:** "Any areas you'd like to improve?" / "If you're happy with your appearance, then press Continue"
- **After:** "Are there any areas you'd like to focus on?" / "If you're already happy with how you look, you can continue"
- Updated options: "Belly" → "Midsection", "Butt" → "Glutes"

### Step 7: Daily Activity
- **Before:** "What does your day-to-day look like?" with descriptive options + emojis
- **After:** "What best describes your daily routine?" with simple labels
- Options: Desk-based, Very active, Train often, Home-focused
- Removed gender-specific emojis

### Step 8: Energy Levels
- **Before:** "How would you describe your energy levels throughout the day?" with emojis
- **After:** "How do your energy levels feel during the day?"
- Updated options to match PDF exactly (Low all day, Post-lunch slump, Tired before meals, Stable and high)

### Step 9: Exercise Frequency
- **Before:** "How often do you exercise?" (Rarely or never, 1-2 times per week, etc.)
- **After:** "How active are you?" (Never, A few times per month, A few times per week, Most days)

### Step 10: Weight Pattern
- **Before:** "How does your weight typically change?"
- **After:** "Describe your typical weight pattern"
- Simplified options to match PDF

### Step 11: Last Ideal Weight
- **Before:** "When was the last time you were at your ideal body weight?" (5 options including "3-5 years")
- **After:** "When did you last feel at your ideal weight?" (4 options, removed 3-5 year bracket)

### Step 12: High-Intent Pivot (Info Block)
- **Before:** Generic "GLP diet is designed to boost your GLP levels naturally"
- **After:** "Designed by endocrinologists and nutrition experts" with full benefits breakdown:
  - Natural fullness signals explanation
  - AI-powered adaptation messaging
  - 3 key benefits (feel full sooner, stable energy, easier weight loss)

### Step 13: Previous Diet Attempts
- **Before:** "Have you tried any of these in the last 3 years?" (Calorie counting, Gym membership, Supplements, Meal plans)
- **After:** "Which diets have you tried recently?" (Keto, Intermittent fasting, Vegetarian, Vegan, Low-carb, Gluten-free)
- Removed emojis

### Step 14: Motivation
- **Before:** "What is the main reason you want to get in shape?"
- **After:** "What's your primary motivation for losing weight and getting healthier?"
- **Men:** Added "Support GLP-1 medication results" option
- **Women:** Changed "Look better in clothes" to "Fit clothes better", added "Return to shape after pregnancy"
- Removed emojis

### Step 20: Meals Per Day
- **Before:** 4 options (2, 3, 4, 5+ meals) with emojis
- **After:** 3 options matching PDF exactly
  - "Three meals (breakfast, lunch, dinner)"
  - "Four meals (with one snack)"
  - "Five meals (with two snacks)"

### Step 21: Exclude Proteins/Dairy
- **Before:** "Would you like to exclude any of these products from your plan?"
- **After:** "Would you like to exclude any proteins or dairy?"
- Subtitle: "Proteins and dairy:"
- Removed emojis from all options

### Step 22: Exclude Vegetables → Fruits & Vegetables
- **Before:** "Vegetables:" only (Broccoli, Spinach, Kale, Carrots, etc.)
- **After:** "Fruits and vegetables:" combined (Olives, Avocados, Tomatoes, Cucumber, Broccoli, Spinach, Zucchini, Bell peppers, Mushrooms, Onions, Potatoes)
- Matches PDF structure exactly

### Step 23: Exclude Fruits → Nuts & Grains
- **Before:** "Fruits:" (Apples, Bananas, Oranges, etc.)
- **After:** "Nuts and grains:" (Almonds, Walnuts, Peanuts, Pasta, Rice, Couscous, Quinoa, Oats, Buckwheat, Corn, Bread)
- Complete restructure to match PDF

### Email Capture
- **Before:** "Enter your email to get your **Personalized GLP Diet Plan**" / "Claim my plan"
- **After:** "Enter your email to receive your **Personalized GLP-1 program**" / "Get my plan"
- Updated privacy disclaimer wording

## Gender Variants Preserved

All existing gender-specific functionality remains intact:
- Body type images (male/female paths)
- Target body options (men vs women)
- Motivation options (pregnancy option for women, medication support for men)

## Validation

- ✅ TypeScript types check
- ✅ No linter errors
- ✅ JSON structure valid
- ✅ Gender variants properly applied

## Next Steps

To fully integrate the PDF copy, you may want to:

1. Review info blocks and consider adding them as intermediate steps
2. Add social proof testimonials (Alex R., Laura M. from PDF)
3. Update loading screen messages to match PDF tone
4. Consider adding BMI feedback templates from the JSON
5. Add timeline projection messaging ("reach XX kg by April 14, 2026")

## Notes

- Removed most emojis to match PDF's cleaner, more professional tone
- Simplified language throughout (e.g., "you're" → "you are" in formal blocks)
- Emphasized "GLP-1 program" branding consistently
- Maintained existing step numbering and IDs for backward compatibility
