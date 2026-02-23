"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center px-6 pb-16 w-full max-w-[660px] mx-auto">
      {/* Hero bowl image — cropped naturally, no circle frame */}
      <div className="relative w-[380px] h-[300px] md:w-[440px] md:h-[340px] mb-6 overflow-hidden">
        <Image
          src="/images/hero-bowl.png"
          alt="Healthy grilled chicken quinoa bowl"
          width={560}
          height={560}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] w-full max-w-none h-auto"
          priority
        />
      </div>

      <p className="text-[15px] font-semibold text-[var(--text-primary)] text-center mb-3 leading-relaxed max-w-[400px]">
        Your hunger hormones don&apos;t respond the same way as others. Let&apos;s see how yours work.
      </p>

      <h2
        className="text-[28px] md:text-[36px] font-bold text-center leading-[1.2] mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Lose Weight More Easily with a Personalized{" "}
        <span className="text-[#0097b2]">GLP-1</span> program
      </h2>

      <p className="text-[15px] text-[var(--text-secondary)] mb-5">
        Select the <span className="text-[#0097b2] font-semibold">GLP</span> diet type:
      </p>

      <div className="flex gap-4 w-full max-w-[380px]">
        <Link
          href="/quiz?gender=male"
          className="flex-1 py-3.5 text-center text-[15px] font-semibold rounded-full
                     bg-[#0097b2] text-white hover:bg-[#007f96]
                     transition-all active:scale-[0.97] shadow-sm"
        >
          Diet for men
        </Link>
        <Link
          href="/quiz?gender=female"
          className="flex-1 py-3.5 text-center text-[15px] font-semibold rounded-full
                     bg-[#f6faff] text-[#0097b2] border border-[#0097b2]
                     hover:bg-[#eaf3fc] hover:text-[#007f96]
                     transition-all active:scale-[0.97]"
        >
          Diet for women
        </Link>
      </div>
    </section>
  );
}
