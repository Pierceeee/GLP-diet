"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-16 w-full max-w-[660px] mx-auto">
      <div className="mb-8">
        <Image
          src="/images/food-bowl.svg"
          alt="Healthy food bowl"
          width={340}
          height={290}
          className="w-[300px] md:w-[340px] h-auto"
          priority
        />
      </div>

      <h2
        className="text-[32px] md:text-[42px] font-bold text-center leading-[1.15] mb-5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Manage Weight with{" "}
        <br className="hidden sm:block" />
        Personalized GLP Diet
      </h2>

      <p className="text-[15px] text-[var(--text-secondary)] mb-8">
        Select the <span className="text-[var(--brand)] font-semibold">GLP</span> diet type:
      </p>

      <div className="flex gap-4 w-full max-w-[440px]">
        <Link
          href="/quiz?gender=male"
          className="flex-1 py-3.5 text-center text-[15px] font-semibold rounded-full
                     bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]
                     transition-colors active:scale-[0.98]"
        >
          Diet for men
        </Link>
        <Link
          href="/quiz?gender=female"
          className="flex-1 py-3.5 text-center text-[15px] font-semibold rounded-full
                     bg-white text-gray-700 border border-gray-300
                     hover:border-[var(--brand)] hover:text-[var(--brand)]
                     transition-colors active:scale-[0.98]"
        >
          Diet for women
        </Link>
      </div>
    </section>
  );
}
