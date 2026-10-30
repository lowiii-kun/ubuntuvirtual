interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: "cyan" | "emerald" | "amber";
}

const accentClasses: Record<string, string> = {
  cyan: "text-cyan-300 border-cyan-400/30 bg-cyan-400/5",
  emerald: "text-emerald-300 border-emerald-400/30 bg-emerald-400/5",
  amber: "text-amber-300 border-amber-400/30 bg-amber-400/5",
};

export default function SectionHeading({ eyebrow, title, description, accent = "cyan" }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <span className={`chip inline-block rounded-full border px-3 py-1 ${accentClasses[accent]}`}>{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
    </div>
  );
}
