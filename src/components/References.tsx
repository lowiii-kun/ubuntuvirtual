import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Modal from "./Modal";
import { BookIcon } from "./Icons";
import { academicReferences, assetReferences, officialReferences } from "../data/references";

export default function References() {
  const [assetsOpen, setAssetsOpen] = useState(false);

  return (
    <section id="references" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          accent="emerald"
          eyebrow="References & Sources"
          title="Documentation, Standards & Academic Sources"
          description="This module was built using the following official documentation, kernel sources, and academic textbooks as the technical foundation."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-2xl border border-slate-700/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-cyan-300">
              <BookIcon className="h-5 w-5" /> Official Documentation
            </h3>
            <ul className="space-y-3">
              {officialReferences.map((r) => (
                <li key={r.url} className="text-sm">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-200 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-300">
                    {r.label}
                  </a>
                  <p className="text-xs text-slate-500">{r.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-700/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-300">
              <BookIcon className="h-5 w-5" /> Academic Textbooks
            </h3>
            <ul className="space-y-3">
              {academicReferences.map((r) => (
                <li key={r.url} className="text-sm">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-200 underline decoration-amber-400/40 underline-offset-4 hover:text-amber-300">
                    {r.label}
                  </a>
                  <p className="text-xs text-slate-500">{r.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <button
            onClick={() => setAssetsOpen(true)}
            className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_25px_-8px_rgba(34,211,238,0.8)] transition hover:bg-cyan-400/20"
          >
            Asset References
          </button>

          <div className="glass-panel max-w-2xl rounded-xl border border-amber-400/20 p-5 text-sm text-slate-300">
            <strong className="text-amber-300">AI Disclosure Note:</strong> This website was built with the
            assistance of Artificial Intelligence (AI) and other AI Agents.
          </div>
        </div>
      </div>

      <Modal open={assetsOpen} onClose={() => setAssetsOpen(false)} title="Asset References" tag="Visual & Media Sources" widthClass="max-w-2xl">
        <p className="text-sm text-slate-400">
          Sources for visual assets, diagrams, videos, and design inspiration used throughout this project.
        </p>
        <ul className="space-y-3">
          {assetReferences.map((a) => (
            <li key={a.asset + a.url} className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-3 text-sm">
              <p className="font-semibold text-slate-200">{a.asset}</p>
              <p className="text-xs text-slate-500">
                Source: {a.source}{" "}
                {a.url !== "#" && (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-2">
                    ({a.url})
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  );
}
