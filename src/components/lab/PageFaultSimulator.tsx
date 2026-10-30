import { useState } from "react";

const minorSteps = [
  { title: "CPU issues memory access", detail: "Process touches a virtual address that is valid but not yet mapped to a physical frame." },
  { title: "MMU page-table walk", detail: "Hardware walks PGD → PUD → PMD → PTE and finds the Present bit is 0." },
  { title: "Trap into the kernel", detail: "CPU raises a page-fault exception (#PF); do_page_fault()/handle_mm_fault() runs in Ring 0." },
  { title: "VMA lookup", detail: "Kernel finds the vm_area_struct covering this address — it's a valid mapping (e.g., shared library or CoW page)." },
  { title: "Resolve without disk I/O", detail: "Minor fault: the physical page already exists in memory (page cache / shared / zero page) — kernel just updates the PTE." },
  { title: "Resume execution", detail: "Instruction that faulted is restarted; this time the TLB/page-table walk succeeds immediately." },
];

const majorSteps = [
  { title: "CPU issues memory access", detail: "Process touches a virtual address that is valid but not yet mapped to a physical frame." },
  { title: "MMU page-table walk", detail: "Hardware walks PGD → PUD → PMD → PTE and finds the Present bit is 0." },
  { title: "Trap into the kernel", detail: "CPU raises a page-fault exception (#PF); do_page_fault()/handle_mm_fault() runs in Ring 0." },
  { title: "VMA lookup", detail: "Kernel finds the vm_area_struct covering this address — backed by a file or swap." },
  { title: "Allocate a physical frame", detail: "Kernel requests a free frame from the buddy allocator (mm/page_alloc.c)." },
  { title: "Block on disk I/O (major fault)", detail: "Data must be read from the filesystem or swap device — the process sleeps while I/O completes. This is the slow path." },
  { title: "Update page table & resume", detail: "PTE is updated with the new frame + Present=1; instruction restarts transparently to the process." },
];

export default function PageFaultSimulator() {
  const [mode, setMode] = useState<"minor" | "major">("minor");
  const [step, setStep] = useState(0);
  const steps = mode === "minor" ? minorSteps : majorSteps;

  const setModeAndReset = (m: "minor" | "major") => {
    setMode(m);
    setStep(0);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-400">
        Step through exactly what happens inside the Linux kernel when a process accesses a page that isn't currently
        mapped. Compare the fast <span className="text-emerald-300">minor fault</span> path (data already in RAM)
        against the slow <span className="text-amber-300">major fault</span> path (data must be fetched from disk/swap).
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setModeAndReset("minor")}
          className={`flex-1 rounded-lg border px-4 py-2 text-xs font-bold transition ${mode === "minor" ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300" : "border-slate-700 text-slate-400"}`}
        >
          Minor Page Fault
        </button>
        <button
          onClick={() => setModeAndReset("major")}
          className={`flex-1 rounded-lg border px-4 py-2 text-xs font-bold transition ${mode === "major" ? "border-amber-400/60 bg-amber-400/10 text-amber-300" : "border-slate-700 text-slate-400"}`}
        >
          Major Page Fault
        </button>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`rounded-xl border p-4 transition-all ${
              i === step
                ? "border-cyan-400/60 bg-cyan-400/10 scale-[1.01]"
                : i < step
                ? "border-emerald-400/30 bg-emerald-400/5 opacity-70"
                : "border-slate-700/50 bg-slate-900/30 opacity-40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono-term text-xs font-bold ${
                  i <= step ? "bg-cyan-400 text-slate-950" : "bg-slate-700 text-slate-400"
                }`}
              >
                {i + 1}
              </span>
              <h4 className="text-sm font-bold text-white">{s.title}</h4>
            </div>
            {i === step && <p className="mt-2 pl-10 text-xs leading-relaxed text-slate-300">{s.detail}</p>}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-30"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
