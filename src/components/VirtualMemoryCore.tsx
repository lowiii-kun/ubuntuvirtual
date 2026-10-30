import { useState, type ReactElement } from "react";
import SectionHeading from "./SectionHeading";
import Modal from "./Modal";
import VideoCard from "./VideoCard";
import { iconMap } from "./Icons";
import { vmSections, type VmSection } from "../data/vmContent";
import { AddressSpaceDiagram, MmuDiagram, PageFaultDiagram, SecurityDiagram, SwapDiagram, VmIntroDiagram } from "./VmDiagrams";

const diagramMap: Record<string, () => ReactElement> = {
  "vm-intro": VmIntroDiagram,
  "address-space": AddressSpaceDiagram,
  "mmu-paging": MmuDiagram,
  "page-faults": PageFaultDiagram,
  "swapping-caching": SwapDiagram,
  security: SecurityDiagram,
};

export default function VirtualMemoryCore() {
  const [active, setActive] = useState<VmSection | null>(null);

  return (
    <section id="virtual-memory" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          accent="amber"
          eyebrow="Module 3 · Core Concept"
          title="Virtual Memory, Deconstructed"
          description="Virtual memory is the single most important abstraction underpinning modern multitasking operating systems like Ubuntu. The six panels below walk through its full lifecycle — from the concept itself, to address space layout, translation hardware, page faults, swapping, and the security guarantees it enables. Click any diagram to open a deep technical breakdown with kernel source references."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vmSections.map((s, idx) => {
            const Icon = iconMap[s.icon];
            const Diagram = diagramMap[s.id];
            return (
              <button
                key={s.id}
                data-trivia-topic={s.id}
                onClick={() => setActive(s)}
                className="card-hover group glass-panel animate-fade-in-up cursor-pointer rounded-2xl border border-slate-700/50 p-5 text-left"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="chip rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-amber-300">
                    {s.tag}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mb-3 text-base font-bold text-white">{s.title}</h3>
                <div className="mb-3 overflow-hidden rounded-lg border border-slate-700/50">
                  <Diagram />
                </div>
                <p className="line-clamp-4 text-xs leading-relaxed text-slate-400">{s.summary}</p>
                <span className="mt-3 inline-block chip text-cyan-400 opacity-0 transition group-hover:opacity-100">
                  Click for kernel deep-dive →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title ?? ""} tag={active?.tag} widthClass="max-w-4xl">
        {active && (
          <>
            <p className="leading-relaxed">{active.summary}</p>
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-cyan-300">Technical Breakdown</h4>
              <ul className="space-y-2">
                {active.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-300">Kernel Source References</h4>
                <ul className="space-y-1 font-mono-term text-xs text-emerald-200/90">
                  {active.kernelPaths.map((p) => (
                    <li key={p}>» {p}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-300">Related System Calls</h4>
                <ul className="space-y-1 font-mono-term text-xs text-amber-200/90">
                  {active.syscalls.map((p) => (
                    <li key={p}>» {p}</li>
                  ))}
                </ul>
              </div>
            </div>
            {active.video && <VideoCard youtubeId={active.video.youtubeId} title={active.video.title} />}
          </>
        )}
      </Modal>
    </section>
  );
}
