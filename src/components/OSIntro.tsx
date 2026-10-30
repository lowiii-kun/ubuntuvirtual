import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Modal from "./Modal";
import { iconMap } from "./Icons";
import { osTypes, type OSType } from "../data/osTypes";

export default function OSIntro() {
  const [active, setActive] = useState<OSType | null>(null);

  return (
    <section id="os-intro" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Module 1 · Foundations"
          title="What Is an Operating System?"
          description="An Operating System (OS) is the essential system software that manages a computer's hardware and software resources, acting as an intermediary between the user, applications, and the underlying hardware. It provides process management, memory management, file systems, and I/O control so that multiple programs can run safely and efficiently. Click any card below to explore the ten classic types of operating systems, their key features, and real-world examples."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {osTypes.map((os, idx) => {
            const Icon = iconMap[os.icon];
            return (
              <button
                key={os.id}
                onClick={() => setActive(os)}
                className="card-hover group glass-panel animate-fade-in-up flex cursor-pointer flex-col items-start rounded-xl border border-slate-700/50 p-5 text-left"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 transition group-hover:bg-cyan-400/15">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-white">{os.name}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">{os.description}</p>
                <span className="mt-4 chip text-cyan-400 opacity-0 transition group-hover:opacity-100">
                  Click to expand →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.name ?? ""} tag="Operating System Type">
        {active && (
          <>
            <p className="leading-relaxed">{active.description}</p>
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-cyan-300">Key Features & Functions</h4>
              <ul className="space-y-2">
                {active.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
              <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-amber-300">Real-World Example</h4>
              <p className="text-sm text-slate-300">{active.example}</p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
