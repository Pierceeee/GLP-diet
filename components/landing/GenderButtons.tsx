"use client";

import Link from "next/link";

export function GenderButtons() {
  return (
    <div className="flex gap-4">
      {/* Female Button */}
      <Link
        href="/quiz?gender=female"
        className="flex-1 group"
      >
        <div className="bg-white border-2 border-gray-200 hover:border-[#0f4c4c] 
                        rounded-2xl p-5 text-center transition-all duration-200
                        hover:shadow-md group-active:scale-[0.98]">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-100 to-pink-50 
                          rounded-full flex items-center justify-center">
            <span className="text-3xl">👩</span>
          </div>
          <span className="text-base font-semibold text-gray-900 group-hover:text-[#0f4c4c] transition-colors">
            Female
          </span>
        </div>
      </Link>

      {/* Male Button */}
      <Link
        href="/quiz?gender=male"
        className="flex-1 group"
      >
        <div className="bg-white border-2 border-gray-200 hover:border-[#0f4c4c] 
                        rounded-2xl p-5 text-center transition-all duration-200
                        hover:shadow-md group-active:scale-[0.98]">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-50 
                          rounded-full flex items-center justify-center">
            <span className="text-3xl">👨</span>
          </div>
          <span className="text-base font-semibold text-gray-900 group-hover:text-[#0f4c4c] transition-colors">
            Male
          </span>
        </div>
      </Link>
    </div>
  );
}
