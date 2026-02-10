"use client";

import { useState } from "react";
import { Check, Shield, Clock } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice: number;
  perMonth: number;
  popular?: boolean;
  savings: string | null;
  billedAs: string | null;
}

export function PricingCard() {
  const [selectedPlan, setSelectedPlan] = useState("6-month");

  const plans: PricingPlan[] = [
    {
      id: "1-month",
      name: "Starter",
      duration: "1 Month",
      price: 29.99,
      originalPrice: 49.99,
      perMonth: 29.99,
      savings: null,
      billedAs: null,
    },
    {
      id: "3-month",
      name: "Popular",
      duration: "3 Months",
      price: 59.99,
      originalPrice: 149.97,
      perMonth: 19.99,
      savings: "Save 60%",
      billedAs: "Billed as one payment",
    },
    {
      id: "6-month",
      name: "Best Value",
      duration: "6 Months",
      price: 89.99,
      originalPrice: 299.94,
      perMonth: 14.99,
      popular: true,
      savings: "Save 70%",
      billedAs: "Billed as one payment",
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan);

  const handleCheckout = () => {
    // Placeholder for Stripe checkout
    console.log("Proceeding to checkout with plan:", selectedPlan);
    alert("Stripe checkout integration coming soon!");
  };

  return (
    <div className="space-y-5">
      {/* Plan Selection */}
      <div className="space-y-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`
              w-full p-4 rounded-xl border-2 transition-all duration-200 text-left relative
              ${
                selectedPlan === plan.id
                  ? "border-[#0f4c4c] bg-[#e6f0f0]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-4 px-3 py-1 bg-[#0f4c4c] text-white text-xs font-semibold rounded-full">
                Most Popular
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Radio */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
                      selectedPlan === plan.id
                        ? "border-[#0f4c4c] bg-[#0f4c4c]"
                        : "border-gray-300"
                    }
                  `}
                >
                  {selectedPlan === plan.id && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>

                {/* Plan Info */}
                <div>
                  <p className="font-semibold text-gray-900">{plan.duration}</p>
                  <p className="text-sm text-gray-500">
                    ${plan.perMonth.toFixed(2)}/month
                    {plan.savings && (
                      <span className="ml-2 text-[#0f4c4c] font-medium">
                        {plan.savings}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">
                  ${plan.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ${plan.originalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full py-4 bg-[#0f4c4c] hover:bg-[#0a3a3a] text-white 
                   font-semibold rounded-full transition-all duration-200
                   active:scale-[0.99] focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-[#0f4c4c]/50"
      >
        Get My Plan - ${currentPlan?.price.toFixed(2)}
      </button>

      {/* Billing info */}
      {currentPlan?.billedAs && (
        <p className="text-center text-sm text-gray-500">
          {currentPlan.billedAs}
        </p>
      )}

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2 text-gray-500">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Secure Payment</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">30-Day Guarantee</span>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-[#fffbeb] rounded-xl p-4 text-center">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">100% Money-Back Guarantee</span>
          <br />
          <span className="text-amber-700">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </span>
        </p>
      </div>
    </div>
  );
}
