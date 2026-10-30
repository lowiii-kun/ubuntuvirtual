import { useEffect, useState } from "react";

const links = [
  { id: "os-intro", label: "OS Basics" },
  { id: "ubuntu-arch", label: "Ubuntu" },
  { id: "virtual-memory", label: "Virtual Memory" },
  { id: "model-3d", label: "3D Model" },
  { id: "cli", label: "CLI Lab" },
  { id: "references", label: "References" },
];

export default function Navbar({ onOpenLab }: { onOpenLab: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel border-b border-cyan-400/10 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => scrollTo("top")} className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M8 20h8M12 16v4" />
            </svg>
          </div>
          <span className="font-mono-term text-sm font-bold tracking-tight text-white sm:text-base">
            virtual<span className="text-cyan-400 text-glow-cyan">_memory</span>
            <span className="text-emerald-400">.ubuntu</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLab}
            className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 shadow-[0_0_20px_-8px_rgba(52,211,153,0.8)] transition hover:bg-emerald-400/20 sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
            </svg>
            Virtual Lab
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-300 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-panel mx-4 mt-2 flex flex-col gap-1 rounded-xl border border-cyan-400/10 p-3 lg:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenLab();
            }}
            className="mt-1 rounded-md border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-left text-sm font-semibold text-emerald-300"
          >
            Open Virtual Laboratory
          </button>
        </div>
      )}
    </header>
  );
}
