import { useEffect, useState } from "react";

const typingStrings = [
  "cat /proc/meminfo | grep -i mem",
  "pmap -d $(pgrep gnome-shell)",
  "vmstat 1 5",
  "sysctl vm.swappiness",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = typingStrings[stringIndex];
    const speed = deleting ? 35 : 55;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) {
          setText(full.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (text.length > 0) {
          setText(full.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setStringIndex((i) => (i + 1) % typingStrings.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, stringIndex]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="chip mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            CpE 9 — Operating Systems · Interactive Module
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Virtual Memory on{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              Ubuntu
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            An interactive deep dive into how the Linux kernel transforms a small amount of physical RAM
            into vast, isolated, secure address spaces for every process — from page tables and the MMU to
            swapping, demand paging, and exploit mitigations like ASLR.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("virtual-memory")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_-8px_rgba(34,211,238,0.8)] transition hover:scale-105"
            >
              Start Learning
            </button>
            <button
              onClick={() => scrollTo("cli")}
              className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300"
            >
              Try the Diagnostic CLI
            </button>
            <button
              onClick={() => scrollTo("model-3d")}
              className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300"
            >
              Explore the 3D Model
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              ["4 KB", "Standard Page"],
              ["48 bit", "Virtual Address"],
              ["Ring 0/3", "Privilege Split"],
            ].map(([stat, label]) => (
              <div key={label} className="glass-panel rounded-xl border border-slate-700/50 p-3 text-center">
                <div className="font-mono-term text-lg font-bold text-emerald-300">{stat}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:150ms]">
          <div className="glass-panel neon-border-cyan mx-auto max-w-md overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-900/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="chip ml-3 text-slate-400">ubuntu@vm-lab: ~</span>
            </div>
            <div className="h-64 bg-[#0b1220] p-5 font-mono-term text-sm text-emerald-300">
              <p className="text-slate-500"># live kernel memory probe</p>
              <p className="mt-2">
                <span className="text-cyan-400">$</span> {text}
                <span className="animate-caret border-r-2 border-emerald-300">&nbsp;</span>
              </p>
              <div className="mt-4 space-y-1 text-xs text-slate-400">
                <p>MemTotal: <span className="text-amber-300">16220484 kB</span></p>
                <p>SwapTotal: <span className="text-amber-300">2097148 kB</span></p>
                <p>PageSize: <span className="text-amber-300">4096 B</span></p>
                <p className="text-emerald-400">[ OK ] MMU translation nominal</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 h-24 w-24 animate-float-slow rounded-full border border-amber-400/30 bg-amber-400/5 blur-xl" />
          <div className="absolute -bottom-8 -left-8 h-28 w-28 animate-float-slow rounded-full border border-cyan-400/30 bg-cyan-400/5 blur-xl [animation-delay:1.2s]" />
        </div>
      </div>
    </section>
  );
}
