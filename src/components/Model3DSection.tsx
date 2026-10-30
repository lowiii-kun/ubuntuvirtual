import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Modal from "./Modal";
import VirtualMemory3D, { modelInfo, type ObjectId } from "./model3d/VirtualMemory3D";

export default function Model3DSection() {
  const [selected, setSelected] = useState<ObjectId | null>(null);
  const active = selected ? modelInfo[selected] : null;

  return (
    <section id="model-3d" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          accent="cyan"
          eyebrow="Module 5 · Interactive 3D Model"
          title="The Virtual Memory Pipeline in 3D"
          description="Explore an interactive 3D reconstruction of how a memory access actually travels through the system: from the CPU core, through the MMU and its TLB cache, down the multi-level page tables, into physical RAM frames, and out to swap storage and zswap. Drag to rotate, scroll to zoom, and click directly on any of the seven components — the glowing orbs simulate live address-translation and paging traffic flowing between them."
        />
        <VirtualMemory3D onSelect={setSelected} />
      </div>

      <Modal open={!!active} onClose={() => setSelected(null)} title={active?.name ?? ""} tag="3D Component">
        {active && (
          <>
            <p className="leading-relaxed">{active.description}</p>
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-cyan-300">Key Facts</h4>
              <ul className="space-y-2">
                {active.facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
