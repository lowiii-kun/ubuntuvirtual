import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  tag?: string;
  children: ReactNode;
  widthClass?: string;
}

export default function Modal({ open, onClose, title, tag, children, widthClass }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 py-10 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`animate-modal-in glass-panel relative w-full ${widthClass ?? "max-w-3xl"} rounded-2xl border border-cyan-400/20 p-6 shadow-[0_0_60px_-15px_rgba(34,211,238,0.35)] sm:p-8`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/50 bg-slate-800/70 text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {tag && (
          <span className="chip mb-3 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-amber-300">
            {tag}
          </span>
        )}
        <h3 className="mb-4 pr-10 text-2xl font-bold text-white sm:text-3xl">{title}</h3>
        <div className="space-y-5 text-slate-300">{children}</div>
      </div>
    </div>
  );
}
