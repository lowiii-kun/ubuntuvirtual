import { useState } from "react";

interface SimProcess {
  name: string;
  memMb: number;
  oomScore: number;
}

const baseProcesses: SimProcess[] = [
  { name: "firefox", memMb: 1800, oomScore: 420 },
  { name: "code (VS Code)", memMb: 1200, oomScore: 350 },
  { name: "gnome-shell", memMb: 600, oomScore: 120 },
  { name: "docker-containerd", memMb: 900, oomScore: 280 },
  { name: "systemd", memMb: 40, oomScore: 5 },
];

const RAM_TOTAL = 4096; // MB simulated small machine to make pressure easy to trigger
const SWAP_TOTAL = 2048;

export default function OomSandbox() {
  const [swappiness, setSwappiness] = useState(60);
  const [load, setLoad] = useState(40); // percentage extra memory load dial
  const [killed, setKilled] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const usedByProcesses = baseProcesses.filter((p) => !killed.includes(p.name)).reduce((a, p) => a + p.memMb, 0);
  const extraLoad = (load / 100) * RAM_TOTAL * 1.4;
  const totalDemand = usedByProcesses + extraLoad;

  const ramUsed = Math.min(totalDemand, RAM_TOTAL);
  const overflow = Math.max(0, totalDemand - RAM_TOTAL);
  const swapTendency = swappiness / 200; // 0..1
  const swapUsed = Math.min(SWAP_TOTAL, overflow * (0.4 + swapTendency));
  const unresolved = Math.max(0, overflow - swapUsed);

  const ramPct = Math.min(100, (ramUsed / RAM_TOTAL) * 100);
  const swapPct = Math.min(100, (swapUsed / SWAP_TOTAL) * 100);
  const pressure = Math.min(100, (unresolved / (RAM_TOTAL * 0.6)) * 100);

  const critical = pressure > 55;

  const triggerOom = () => {
    const alive = baseProcesses.filter((p) => !killed.includes(p.name));
    if (alive.length === 0) return;
    const victim = alive.reduce((a, b) => (a.oomScore > b.oomScore ? a : b));
    setKilled((k) => [...k, victim.name]);
    setLog((l) => [
      `oom-killer: Killed process '${victim.name}' (oom_score ${victim.oomScore}) to reclaim ${victim.memMb}MB — memory pressure critical.`,
      ...l,
    ]);
  };

  const reset = () => {
    setKilled([]);
    setLog([]);
    setLoad(40);
    setSwappiness(60);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-400">
        Drag the memory-load dial to simulate opening more applications on a small 4 GB Ubuntu machine with 2 GB of
        swap. Adjust <span className="font-mono-term text-cyan-300">vm.swappiness</span> to see how aggressively the
        kernel offloads anonymous pages to swap versus keeping them in RAM. If pressure stays critical, manually
        invoke the OOM Killer to see which process gets sacrificed first based on its oom_score.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Simulated memory load</span>
            <span className="font-mono-term text-cyan-300">{load}%</span>
          </div>
          <input type="range" min={0} max={100} value={load} onChange={(e) => setLoad(Number(e.target.value))} className="w-full accent-cyan-400" />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>vm.swappiness</span>
            <span className="font-mono-term text-emerald-300">{swappiness}</span>
          </div>
          <input type="range" min={0} max={200} value={swappiness} onChange={(e) => setSwappiness(Number(e.target.value))} className="w-full accent-emerald-400" />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>RAM usage</span>
            <span className="font-mono-term">{ramPct.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all" style={{ width: `${ramPct}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Swap usage</span>
            <span className="font-mono-term">{swapPct.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all" style={{ width: `${swapPct}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Memory pressure (PSI)</span>
            <span className={`font-mono-term ${critical ? "text-red-400" : "text-slate-300"}`}>{pressure.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div className={`h-full rounded-full transition-all ${critical ? "bg-red-500" : "bg-gradient-to-r from-emerald-400 to-amber-400"}`} style={{ width: `${pressure}%` }} />
          </div>
        </div>
      </div>

      {critical && (
        <div className="flex items-center justify-between rounded-lg border border-red-400/50 bg-red-500/10 p-3">
          <p className="text-xs text-red-300">
            Critical memory pressure detected — systemd-oomd / kernel OOM Killer would normally intervene now.
          </p>
          <button onClick={triggerOom} className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
            Trigger OOM Killer
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {baseProcesses.map((p) => (
          <div
            key={p.name}
            className={`rounded-lg border p-2.5 text-center text-xs transition ${
              killed.includes(p.name) ? "border-red-500/40 bg-red-500/10 text-red-400 line-through" : "border-slate-700 bg-slate-900/40 text-slate-300"
            }`}
          >
            <p className="font-mono-term font-semibold">{p.name}</p>
            <p className="text-[10px] text-slate-500">{p.memMb}MB · score {p.oomScore}</p>
          </div>
        ))}
      </div>

      {log.length > 0 && (
        <div className="rounded-lg border border-slate-700/60 bg-slate-950/60 p-3 font-mono-term text-[11px] text-red-300">
          {log.map((l, i) => (
            <p key={i}>» {l}</p>
          ))}
        </div>
      )}

      <button onClick={reset} className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400">
        reset sandbox
      </button>
    </div>
  );
}
