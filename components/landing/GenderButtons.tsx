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
        <div className="bg-[#f6faff] border-2 border-[#0097b2] hover:border-[#007f96]
                        rounded-2xl p-5 text-center transition-all duration-200
                        hover:shadow-md group-active:scale-[0.98]">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-100 to-pink-50
                          rounded-full flex items-center justify-center">
            <span className="text-3xl">👩</span>
          </div>
          <span className="text-base font-semibold text-[#0097b2] group-hover:text-[#007f96] transition-colors">
            Female
          </span>
        </div>
      </Link>

      {/* Male Button */}
      <Link
        href="/quiz?gender=male"
        className="flex-1 group"
      >
        <div className="bg-[#0097b2] border-2 border-[#0097b2] hover:border-[#007f96] hover:bg-[#007f96]
                        rounded-2xl p-5 text-center transition-all duration-200
                        hover:shadow-md group-active:scale-[0.98]">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20
                          rounded-full flex items-center justify-center">
            <span className="text-3xl">👨</span>
          </div>
          <span className="text-base font-semibold text-white transition-colors">
            Male
          </span>
        </div>
      </Link>
    </div>
  );
}
