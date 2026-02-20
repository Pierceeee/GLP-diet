import { Check } from "lucide-react";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  benefits?: string[];
}

export function InfoCard({ title, subtitle, image, benefits }: InfoCardProps) {
  const defaultBenefits = [
    "Effective weight management",
    "Faster metabolism and increased GLP levels",
    "Reduced hunger and cravings",
    "Improved sleep, mood, and energy levels",
  ];
  const items = benefits || defaultBenefits;

  const hl = (text: string) => {
    const parts = text.split(/(GLP)/gi);
    return parts.map((p, i) =>
      p.toLowerCase() === "glp"
        ? <span key={i} className="text-[var(--brand)] font-semibold">{p}</span>
        : <span key={i}>{p}</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm max-w-lg mx-auto">
      {/* Image area */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={title}
            className="w-full h-auto"
          />
        ) : (
          <div className="h-48 flex items-center justify-center">
            <Image
              src="/images/info-card-bowl.png"
              alt="Healthy food bowl"
              width={160}
              height={112}
              className="rounded-xl shadow-lg transform rotate-2"
            />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="px-6 py-5">
        <h3 className="text-[20px] font-bold mb-2 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {hl(title)}
        </h3>
        {subtitle && (
          <div className="text-[15px] font-semibold text-[var(--text-primary)] leading-relaxed mb-4 whitespace-pre-line">{hl(subtitle)}</div>
        )}
        {!image && (
          <>
            <p className="text-[13px] font-semibold mb-3">Benefits of the GLP diet:</p>
            <div className="space-y-2.5">
              {items.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[var(--success)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-[var(--text-secondary)] leading-snug">{hl(b)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
