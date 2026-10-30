import { useState } from "react";

interface Frame {
  id: string;
  owner: "shared" | "parent" | "child";
  content: string;
}

const initialFrames: Frame[] = [
  { id: "F1", owner: "shared", content: "code (text)" },
  { id: "F2", owner: "shared", content: "heap data" },
  { id: "F3", owner: "shared", content: "stack page" },
];

export default function CoWVisualizer() {
  const [forked, setForked] = useState(false);
  const [frames, setFrames] = useState<Frame[]>(initialFrames);
  const [childWrote, setChildWrote] = useState(false);

  const doFork = () => {
    setForked(true);
    setChildWrote(false);
    setFrames(initialFrames);
  };

  const doWrite = () => {
    if (!forked || childWrote) return;
    setChildWrote(true);
    setFrames((fr) => fr.map((f) => (f.id === "F2" ? { ...f, owner: "child" } : f)));
  };

  const reset = () => {
    setForked(false);
    setChildWrote(false);
    setFrames(initialFrames);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-400">
        When a process calls <span className="font-mono-term text-cyan-300">fork()</span>, Linux does NOT
        immediately duplicate memory. Instead, the child's page table points to the exact same physical frames as
        the parent, all marked <span className="text-amber-300">read-only</span>. Only when either process tries to{" "}
        <span className="text-amber-300">write</span> to a shared page does the kernel trap the write, allocate a
        fresh private frame, and copy the data — this is Copy-on-Write (CoW).
      </p>

      <div className="flex flex-wrap gap-3">
        <button onClick={doFork} className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs font-bold text-slate-950">
          fork()
        </button>
        <button
          onClick={doWrite}
          disabled={!forked || childWrote}
          className="rounded-lg border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 disabled:opacity-30"
        >
          child writes to heap page (F2)
        </button>
        <button onClick={reset} className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400">
          reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="glass-panel rounded-xl border border-cyan-400/30 p-4">
          <h4 className="chip mb-3 text-cyan-300">Parent Process Page Table</h4>
          <div className="space-y-2">
            {frames.map((f) => (
              <div key={f.id} className="flex items-center justify-between rounded-md border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs">
                <span className="font-mono-term text-slate-300">{f.content}</span>
                <span className="font-mono-term text-cyan-300">→ {f.id}{f.owner === "child" ? " (orig, RW)" : forked ? " (RO, shared)" : " (RW)"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`glass-panel rounded-xl border p-4 transition ${forked ? "border-emerald-400/30 opacity-100" : "border-slate-700/40 opacity-40"}`}>
          <h4 className="chip mb-3 text-emerald-300">Child Process Page Table {!forked && "(not yet forked)"}</h4>
          <div className="space-y-2">
            {frames.map((f) => (
              <div key={f.id} className="flex items-center justify-between rounded-md border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-xs">
                <span className="font-mono-term text-slate-300">{f.content}</span>
                <span className="font-mono-term text-emerald-300">
                  → {f.owner === "child" ? "F2' (new copy, RW)" : forked ? `${f.id} (RO, shared)` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {childWrote && (
        <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-200">
          <strong>CoW triggered:</strong> the child's write to frame F2 caused a protection fault. The kernel
          allocated a brand-new physical frame (F2'), copied the heap data into it, remapped only the child's PTE to
          point at F2' with write permission, and left the parent's PTE untouched at F2. The code (F1) and stack (F3)
          frames remain shared and read-only since neither process wrote to them.
        </div>
      )}
    </div>
  );
}
