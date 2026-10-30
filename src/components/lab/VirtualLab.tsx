import { useEffect, useState } from "react";
import AddressTranslator from "./AddressTranslator";
import PageFaultSimulator from "./PageFaultSimulator";
import CoWVisualizer from "./CoWVisualizer";
import OomSandbox from "./OomSandbox";
import AddressBreakdown from "./AddressBreakdown";
import { FlaskIcon } from "../Icons";

interface VirtualLabProps {
  open: boolean;
  onClose: () => void;
}

const tools = [
  { id: "translator", label: "Address Translator & Page Size", component: AddressTranslator },
  { id: "faults", label: "Page Fault Pipeline", component: PageFaultSimulator },
  { id: "cow", label: "Fork & Copy-on-Write", component: CoWVisualizer },
  { id: "oom", label: "Memory Pressure & OOM Killer", component: OomSandbox },
  { id: "breakdown", label: "Virtual Address Breakdown", component: AddressBreakdown },
];

export default function VirtualLab({ open, onClose }: VirtualLabProps) {
  const [tab, setTab] = useState(tools[0].id);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const Active = tools.find((t) => t.id === tab)?.component ?? AddressTranslator;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-slate-950/95 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-emerald-400/20 bg-slate-900/60 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
            <FlaskIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white sm:text-xl">Virtual Laboratory</h2>
            <p className="text-xs text-slate-400">Interactive memory-management simulators</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition hover:border-red-400/50 hover:text-red-300"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="scrollbar-thin flex gap-2 overflow-x-auto border-b border-slate-800 bg-slate-900/40 p-3 lg:w-72 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-lg border px-4 py-3 text-left text-xs font-semibold transition lg:w-full ${
                tab === t.id ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300" : "border-slate-700/60 text-slate-400 hover:border-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="mx-auto max-w-4xl">
            <Active />
          </div>
        </div>
      </div>
    </div>
  );
}
