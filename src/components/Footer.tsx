export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M8 20h8M12 16v4" />
            </svg>
          </div>
          <span className="font-mono-term text-sm font-bold text-white">
            virtual<span className="text-cyan-400">_memory</span>.ubuntu
          </span>
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400">
          An interactive educational website exploring Virtual Memory management on Ubuntu Linux — covering the
          process address space, the MMU and page tables, demand paging, swapping, and memory-security mechanics,
          complete with simulators, a 3D model, and a live diagnostic terminal.
        </p>
        <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <p className="text-sm font-semibold text-slate-300">Major Course Output in CpE 9 - Operating Systems</p>
        <p className="mt-1 text-sm text-slate-500">Louie Jay Pontinez, Ceryl Ann Rarugal, and Jovie Ann Pleserda.</p>
      </div>
    </footer>
  );
}
