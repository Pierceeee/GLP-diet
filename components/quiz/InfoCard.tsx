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

  // Use provided benefits, or default benefits only when no image is present
  const items = benefits || (!image ? defaultBenefits : undefined);

  /**
   * Highlights "GLP" in brand colour and renders **bold** markdown syntax.
   */
  const hl = (text: string) => {
    // First split on **bold** markers, then highlight GLP within each part
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((segment, i) => {
      const isBold = segment.startsWith("**") && segment.endsWith("**");
      const clean = isBold ? segment.slice(2, -2) : segment;

      // Highlight GLP within the segment
      const glpParts = clean.split(/(GLP(?:-1)?)/gi);
      const rendered = glpParts.map((p, j) =>
        /^GLP(-1)?$/i.test(p) ? (
          <span key={j} className="text-[var(--brand)] font-semibold">
            {p}
          </span>
        ) : (
          <span key={j}>{p}</span>
        )
      );

      if (isBold) {
        return (
          <strong key={i} className="font-bold">
            {rendered}
          </strong>
        );
      }
      return <span key={i}>{rendered}</span>;
    });
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
        <h3
          className="text-[22px] font-extrabold mb-2 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {hl(title)}
        </h3>
        {subtitle && (
          <div className="text-[15px] font-semibold text-[var(--text-primary)] leading-relaxed mb-4 whitespace-pre-line">
            {hl(subtitle)}
          </div>
        )}
        {items && items.length > 0 && (
          <>
            {!benefits && (
              <p className="text-[13px] font-semibold mb-3">Benefits of the GLP diet:</p>
            )}
            <div className="space-y-2.5">
              {items.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-full bg-[var(--success)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] font-semibold text-[var(--text-secondary)] leading-snug">
                    {hl(b)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
