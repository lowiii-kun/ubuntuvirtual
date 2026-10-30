import { FlaskIcon } from "../Icons";

export default function FloatingLabButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-full border border-emerald-400/50 bg-slate-900/90 py-3 pl-3 pr-5 shadow-[0_0_35px_-8px_rgba(52,211,153,0.9)] backdrop-blur transition hover:scale-105"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
        <FlaskIcon className="relative h-5 w-5" />
      </span>
      <span className="text-sm font-bold text-emerald-300">Virtual Laboratory</span>
    </button>
  );
}
