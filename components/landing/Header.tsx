"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-white">
      <div className="w-full max-w-[660px] mx-auto px-6 flex items-center justify-between h-14">
        <span
          className="text-[18px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          GLP Coaching Program
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className="h-px bg-gray-200" />
      {open && (
        <nav className="absolute inset-x-0 top-full bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="w-full max-w-[660px] mx-auto px-6 py-4 flex flex-col gap-3">
            {["Help Center", "Contact Us", "Terms & Conditions", "Privacy Policy"].map((l) => (
              <a key={l} href="#" className="text-sm text-gray-600 hover:text-[var(--brand)] transition-colors">{l}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
