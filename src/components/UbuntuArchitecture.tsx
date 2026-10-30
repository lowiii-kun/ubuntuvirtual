import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Modal from "./Modal";
import VideoCard from "./VideoCard";

export default function UbuntuArchitecture() {
  const [open, setOpen] = useState(false);

  return (
    <section id="ubuntu-arch" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          accent="emerald"
          eyebrow="Module 2 · Ubuntu & OS Architecture"
          title="Ubuntu: A Monolithic, Unix-Like Linux Distribution"
          description="Ubuntu is a free, open-source, Debian-based Linux distribution built around the monolithic Linux kernel. It is fully multi-tasking and multi-user, capable of running thousands of processes for many simultaneous users while enforcing a strict boundary between untrusted User Space (Ring 3) and trusted Kernel Space (Ring 0). This privilege separation — combined with mature, transparent virtual memory internals — is exactly why Ubuntu is the ideal teaching example for this module."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <button
            onClick={() => setOpen(true)}
            className="card-hover group glass-panel relative col-span-1 cursor-pointer rounded-2xl border border-slate-700/50 p-6 text-left lg:col-span-3"
          >
            <p className="chip mb-4 text-emerald-300">Click diagram to expand →</p>
            <svg viewBox="0 0 600 320" className="w-full">
              <rect x="0" y="0" width="600" height="320" rx="16" fill="#0b1220" />
              {/* Ring 3 */}
              <rect x="24" y="24" width="552" height="130" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22d3ee" strokeOpacity="0.4" />
              <text x="40" y="50" fill="#67e8f9" fontSize="14" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                USER SPACE — Ring 3 (unprivileged)
              </text>
              {["Shell / Bash", "Firefox", "GNOME Shell", "systemd (user)", "apt / snapd"].map((app, i) => (
                <g key={app}>
                  <rect x={40 + i * 108} y={66} width={96} height={64} rx="8" fill="#0f172a" stroke="#22d3ee" strokeOpacity="0.35" />
                  <text x={40 + i * 108 + 48} y={102} fill="#e2e8f0" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    {app}
                  </text>
                </g>
              ))}

              {/* Syscall arrows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1={88 * i - 44 + 40} y1="154" x2={88 * i - 44 + 40} y2="186" stroke="#fbbf24" strokeOpacity="0.5" strokeDasharray="4 3" />
              ))}
              <text x="300" y="178" fill="#fbbf24" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                system calls (open, mmap, fork, read…)
              </text>

              {/* Ring 0 */}
              <rect x="24" y="190" width="552" height="110" rx="10" fill="rgba(52,211,153,0.07)" stroke="#34d399" strokeOpacity="0.45" />
              <text x="40" y="214" fill="#6ee7b7" fontSize="14" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                KERNEL SPACE — Ring 0 (privileged)
              </text>
              {["Process Sched.", "Virtual Memory (mm)", "VFS / Filesystems", "Network Stack", "Device Drivers"].map((mod, i) => (
                <g key={mod}>
                  <rect x={40 + i * 108} y={228} width={96} height={56} rx="8" fill="#0f172a" stroke="#34d399" strokeOpacity="0.4" />
                  <text x={40 + i * 108 + 48} y={260} fill="#e2e8f0" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    {mod}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Applications in Ring 3 cannot directly touch hardware or memory tables — they must request services
              from the kernel through system calls, which transition the CPU into Ring 0.
            </p>
          </button>

          <div className="col-span-1 space-y-4 lg:col-span-2">
            {[
              {
                title: "Monolithic Kernel",
                text: "The entire Ubuntu kernel (scheduler, memory manager, filesystems, network stack, drivers) runs in a single privileged address space for speed, with loadable kernel modules for flexibility.",
              },
              {
                title: "Multi-Tasking & Multi-User",
                text: "Ubuntu runs many processes concurrently for many simultaneous local or remote (SSH) users, relying on virtual memory to isolate each process's data safely.",
              },
              {
                title: "Why Ubuntu for Virtual Memory?",
                text: "Its fully open kernel source, rich diagnostic tools (/proc, pmap, vmstat), and mainstream adoption make Ubuntu the clearest real-world lens into how virtual memory, paging, and security mechanics actually work.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel rounded-xl border border-slate-700/50 p-5">
                <h4 className="text-sm font-bold text-emerald-300">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Ubuntu's Protection-Ring Architecture" tag="Ring 0 vs Ring 3">
        <p>
          x86-64 CPUs expose four privilege rings (0–3), but Linux (and therefore Ubuntu) only uses two: Ring 0 for
          the kernel and Ring 3 for user applications. This hardware-enforced boundary means a bug or exploit in a
          Ring 3 application cannot directly corrupt kernel memory, page tables, or other processes' address spaces.
        </p>
        <div>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-cyan-300">How the boundary is crossed</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• A user program executes a trap instruction (e.g., `syscall` on x86-64) to request kernel services.</li>
            <li>• The CPU switches to Ring 0, and the kernel's syscall table dispatches to the appropriate handler (e.g., `sys_mmap`).</li>
            <li>• The kernel validates arguments, performs the privileged operation (like updating a page table), then returns to Ring 3.</li>
            <li>• Virtual memory hardware (the MMU) enforces that Ring 3 code can never read/write kernel-space pages directly.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4 text-xs font-mono-term text-cyan-200">
          kernel source: arch/x86/entry/entry_64.S · arch/x86/kernel/traps.c · include/linux/syscalls.h
        </div>
        <VideoCard youtubeId="h_xSovNStSE" title="Linux Architecture and the Kernel — User Space vs Kernel Space" />
      </Modal>
    </section>
  );
}
