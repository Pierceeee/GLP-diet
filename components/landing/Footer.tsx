import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  const links = ["Help Center", "Contact Us", "Terms & Conditions", "Privacy Policy"];
  return (
    <footer className="bg-[#f5f5f5] py-8">
      <div className="w-full max-w-[660px] mx-auto px-6 flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-[15px] font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            GLP Diet
          </span>
          {links.map((l) => (
            <a key={l} href="#" className="text-[13px] text-gray-500 hover:text-[var(--brand)] transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          {[Facebook, Instagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-[var(--brand)] transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <p className="text-[12px] text-gray-400">© 2026 GLP Diet. All rights reserved.</p>
      </div>
    </footer>
  );
}
