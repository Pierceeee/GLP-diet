# **Project Context: Linear Funnel Quiz (Landing \-\> Quiz \-\> Offer)**

## **1\. The Core User Flow (Visual Map)**

This project follows a strict 3-stage linear funnel based on the **screenshots provided by the user**:

**Stage 1: The Hook (Landing Page)**

* **Goal:** Convince the user to start the diagnosis/quiz.  
* **Design Source:** User will provide a screenshot of the reference Landing Page.  
* **Route:** / (Home)

**Stage 2: The Diagnosis (Quiz Steps 1-N)**

* **Goal:** Collect user data to personalize the offer.  
* **Design Source:** User will provide a screenshot of the Question Card/Input UI.  
* **Elements:** \* Progress bar (visual feedback).  
  * One question per screen (focused attention).  
  * Smooth transitions between steps.  
* **Route:** /quiz (Managed via internal state or search params ?step=1)

**Stage 3: The Close (Offer Page)**

* **Goal:** Convert the lead (Payment or Email).  
* **Design Source:** User will provide a screenshot of the Results/Offer Page.  
* **Elements:** \* **AI Analysis:** "Based on your answers..." (Dynamic Copy).  
  * **The Solution:** The product/course/service being sold.  
  * **Checkout:** Stripe payment button or Email Opt-in form.  
* **Route:** /offer or /result/\[submissionId\]

## **2\. Technical Stack & Implementation Rules**

### **Framework: Next.js 16 (App Router)**

* **Language:** TypeScript  
* **Styling:** Tailwind CSS \+ shadcn/ui.  
* **Database:** Supabase (PostgreSQL).  
* **AI:** OpenAI GPT-4o / Google Gemini 1.5 Pro (for generating the "Analysis" on the Offer page).

### **Navigation Logic**

* **No Header/Footer Leakage:** The quiz flow should be immersive. Remove standard navigation links on /quiz to prevent drop-off.  
* **State Persistence:** Use URL Search Params (e.g., /quiz?step=2) so users can refresh without losing place, OR use nuqs (Next.js URL Query States).

## **3\. Component Architecture (Based on Image Layout)**

### **A. Landing Page (app/page.tsx)**

* HeroSection: Replicate the layout from the **Landing Page Screenshot**.  
* ValueProps: Grid layout matching the screenshot reference.  
* StartButton: Links to /quiz.

### **B. Quiz Interface (app/quiz/page.tsx)**

* **Container:** Centered layout, max-width-md.  
* **Components:**  
  * ProgressBar: Match style from **Quiz Screenshot**.  
  * QuestionCard: Renders dynamic inputs based on question type (Single Select, Multi Select, Text).  
  * Navigation: "Back" (secondary) and "Next" (primary) buttons.  
  * LoadingScreen: A "fake" analyzing state between the last question and the Offer page.

### **C. Offer Page (app/offer/page.tsx)**

* **Header:** "Your Results are Ready."  
* **AI\_Insight\_Block:** Dynamic text generated from the user's quiz answers.  
* **CTA\_Block:** Match the **Offer Screenshot** (Stripe Checkout Button or Email Form).

## **4\. Database Schema (Supabase)**

**Table: funnel\_submissions**

* id (uuid, primary key)  
* created\_at (timestamp)  
* answers (jsonb) \- Stores the array of answers from Stage 2\.  
* ai\_analysis (text) \- The generated copy for Stage 3\.  
* status (enum: 'started', 'completed', 'purchased')  
* email (text, optional)

## **5\. Development Prompts for Cursor (Screenshot Workflow)**

**To Scaffold the Landing Page:**

\[Attach Landing Page Screenshot\]

"Use this image as the design source. Build the Hero section using Tailwind CSS. Pay close attention to the font weights, spacing, and button roundedness."

**To Scaffold the Quiz:**

\[Attach Quiz UI Screenshot\]

"Create a QuizContainer component that looks exactly like this screenshot. Use framer-motion for slide transitions. The 'Next' button should be disabled until an option is selected."

**To Generate the Offer Page:**

\[Attach Offer Page Screenshot\]

"Build the /offer page based on this layout. The text block in the middle will be dynamic content from the database (ai\_analysis). The CTA button should trigger a Stripe checkout."

**To Handle the AI:**

"Create a Server Action generateAnalysis(answers) that calls OpenAI. Pass the user's answers and a system prompt that acts as an expert consultant. Save the output to Supabase."