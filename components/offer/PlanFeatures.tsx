import { Check, Sparkles, Utensils, Activity, Brain } from "lucide-react";

export function PlanFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description:
        "Personalized nutrition insights based on your unique profile and goals.",
    },
    {
      icon: Utensils,
      title: "Custom Meal Plans",
      description:
        "Weekly meal plans tailored to your preferences and dietary needs.",
    },
    {
      icon: Activity,
      title: "Progress Tracking",
      description:
        "Monitor your journey with easy-to-use tracking tools and insights.",
    },
    {
      icon: Brain,
      title: "Behavioral Coaching",
      description:
        "Science-backed strategies to build lasting healthy habits.",
    },
  ];

  const included = [
    "Personalized GLP nutrition plan",
    "500+ healthy recipes",
    "Weekly meal prep guides",
    "Grocery shopping lists",
    "24/7 AI nutrition coach",
    "Progress tracking dashboard",
    "Community support access",
    "Lifetime updates included",
  ];

  return (
    <div className="space-y-6">
      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="w-10 h-10 bg-[#e6f0f0] rounded-lg flex items-center justify-center mb-3">
              <feature.icon className="w-5 h-5 text-[#0f4c4c]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {feature.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* What's Included */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h3 
          className="text-lg font-bold text-gray-900 mb-4 text-center"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          What&apos;s Included
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {included.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-[14px] text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
