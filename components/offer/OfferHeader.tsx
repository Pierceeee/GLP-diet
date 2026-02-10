"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface OfferHeaderProps {
  title?: string;
}

export function OfferHeader({ title = "Your Plan is Ready" }: OfferHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Title */}
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            {title}
          </h1>

          {/* Spacer */}
          <div className="w-9" />
        </div>
      </div>
    </header>
  );
}
