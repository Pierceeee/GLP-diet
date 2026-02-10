# GLP Diet - Personalized Quiz Funnel

A modern, high-converting quiz funnel for GLP-1 diet lead generation built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **3-Stage Funnel**: Landing Page → 24-Step Quiz → Personalized Offer
- **Personalized Experience**: Gender-specific content and imagery
- **AI-Powered Analysis**: Switchable between OpenAI GPT-4o and Google Gemini
- **Real-time Calculations**: BMI, weight loss percentage, and body metrics
- **Smooth Animations**: Framer Motion page transitions
- **URL State Persistence**: Quiz progress saved in URL (refresh-safe)
- **Mobile-First Design**: Responsive across all devices

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| State | nuqs (URL query state) |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| AI | OpenAI / Google Gemini |
| Payments | Stripe (placeholder) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for database)
- OpenAI and/or Google AI API key (for AI analysis)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Glp-diet
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your `.env.local` with your API keys:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Providers
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-key
GOOGLE_AI_API_KEY=your-google-ai-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Set up the database:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the schema from `lib/supabase/schema.sql`

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Glp-diet/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/
│   │   ├── page.tsx          # Quiz wrapper
│   │   └── quiz-content.tsx  # Quiz logic
│   ├── offer/
│   │   └── page.tsx          # Offer/results page
│   ├── actions/
│   │   └── analyze.ts        # AI analysis server action
│   └── layout.tsx
├── components/
│   ├── landing/              # Landing page components
│   ├── quiz/                 # Quiz components
│   └── offer/                # Offer page components
├── config/
│   └── questions.ts          # Quiz configuration (24 questions)
├── lib/
│   ├── ai/                   # AI provider integration
│   ├── supabase/             # Database client & operations
│   ├── quiz/                 # Quiz state management
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript definitions
├── docs/
│   └── screenshots/          # Design reference images
└── public/
    └── images/               # Static assets
```

## Quiz Flow

1. **Landing Page** (`/`) - Gender selection (Male/Female)
2. **Quiz Steps 1-23** (`/quiz?step=N`) - Personalized questions
3. **Loading Screen** (`/quiz?step=24`) - Fake calculation animation
4. **Email Capture** - Lead collection
5. **Offer Page** (`/offer`) - AI analysis & pricing

## Key Components

### Quiz Questions (`config/questions.ts`)

All 24 quiz steps are configured with:
- Question type (single-select, multi-select, number, info, loading)
- Gender-specific variants
- Validation rules
- Computed values (BMI, weight loss %)

### AI Integration (`lib/ai/`)

Switchable between providers:
```typescript
// Uses AI_PROVIDER env variable
const analysis = await generateAnalysis(answers, gender);

// Or specify provider explicitly
const analysis = await generateAnalysis(answers, gender, "gemini");
```

### State Management (`lib/quiz/`)

URL-based state with nuqs:
```typescript
const { step, gender, answers, nextStep, prevStep } = useQuizState();
// URL: /quiz?step=5&gender=female&id=abc123
```

## Customization

### Adding New Questions

Edit `config/questions.ts`:
```typescript
{
  id: "new-question",
  step: 25,
  type: "single-select",
  title: "Your question?",
  options: [
    { id: "opt1", label: "Option 1", emoji: "👍" },
    { id: "opt2", label: "Option 2", emoji: "👎" },
  ],
}
```

### Gender Variants

Add gender-specific content:
```typescript
{
  id: "body-type",
  title: "Choose your body type:",
  genderVariant: {
    male: { options: [...maleOptions] },
    female: { options: [...femaleOptions] },
  },
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

```bash
npm run build  # Test production build locally
```

### Environment Variables for Production

Required in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` or `GOOGLE_AI_API_KEY`
- `AI_PROVIDER`
- `NEXT_PUBLIC_APP_URL`

## Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Private - All rights reserved.
