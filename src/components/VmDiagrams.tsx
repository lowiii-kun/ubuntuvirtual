// Hand-built inline SVG diagrams illustrating each Virtual Memory concept.
export function VmIntroDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full">
      <rect width="400" height="200" rx="14" fill="#0b1220" />
      <text x="20" y="28" fill="#67e8f9" fontSize="11" fontFamily="JetBrains Mono, monospace">Process A (virtual)</text>
      <text x="220" y="28" fill="#67e8f9" fontSize="11" fontFamily="JetBrains Mono, monospace">Process B (virtual)</text>
      <rect x="20" y="36" width="160" height="60" rx="8" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" />
      <rect x="220" y="36" width="160" height="60" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" />
      <path d="M60 96 C90 130 150 130 170 150" stroke="#22d3ee" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <path d="M340 96 C300 130 250 130 230 150" stroke="#34d399" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <rect x="110" y="150" width="180" height="34" rx="6" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" />
      <text x="200" y="171" fill="#fcd34d" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Physical RAM (frames)</text>
      <text x="100" y="60" fill="#e2e8f0" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">0x0000 — 0x7FFF</text>
      <text x="300" y="60" fill="#e2e8f0" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">0x0000 — 0x7FFF</text>
    </svg>
  );
}

export function AddressSpaceDiagram() {
  const segs = [
    { label: "Kernel Space", color: "#34d399" },
    { label: "Stack ↓", color: "#22d3ee" },
    { label: "Shared Libraries", color: "#a78bfa" },
    { label: "Heap ↑", color: "#fbbf24" },
    { label: "BSS", color: "#f472b6" },
    { label: "Data", color: "#f87171" },
    { label: "Text", color: "#38bdf8" },
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full">
      <rect width="320" height="220" rx="14" fill="#0b1220" />
      {segs.map((s, i) => (
        <g key={s.label}>
          <rect x="40" y={10 + i * 28} width="200" height="24" fill={s.color} fillOpacity="0.14" stroke={s.color} strokeOpacity="0.6" />
          <text x="140" y={10 + i * 28 + 16} fill={s.color} fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
            {s.label}
          </text>
        </g>
      ))}
      <text x="250" y="24" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono, monospace">high addr</text>
      <text x="250" y="212" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono, monospace">low addr</text>
    </svg>
  );
}

export function MmuDiagram() {
  const levels = ["PGD", "PUD", "PMD", "PTE"];
  return (
    <svg viewBox="0 0 420 200" className="w-full">
      <rect width="420" height="200" rx="14" fill="#0b1220" />
      <text x="20" y="26" fill="#67e8f9" fontSize="11" fontFamily="JetBrains Mono, monospace">Virtual Addr</text>
      <rect x="20" y="34" width="70" height="30" rx="6" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" />
      {levels.map((lv, i) => (
        <g key={lv}>
          <rect x={110 + i * 62} y="34" width="52" height="30" rx="6" fill="rgba(52,211,153,0.1)" stroke="#34d399" />
          <text x={110 + i * 62 + 26} y="53" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{lv}</text>
          {i < levels.length - 1 && <path d={`M${162 + i * 62} 49 L${172 + i * 62} 49`} stroke="#34d399" strokeOpacity="0.5" />}
        </g>
      ))}
      <path d="M362 49 h18" stroke="#fbbf24" />
      <rect x="380" y="34" width="22" height="30" rx="4" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" />
      <text x="391" y="85" fill="#fcd34d" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace">frame</text>
      <rect x="110" y="110" width="180" height="40" rx="8" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" />
      <text x="200" y="134" fill="#c4b5fd" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">TLB (translation cache)</text>
      <path d="M90 49 C96 90 100 110 110 128" stroke="#a78bfa" strokeDasharray="4 3" fill="none" />
      <text x="20" y="170" fill="#94a3b8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">4 KB page ⇄ 2 MB/1 GB Huge Page</text>
    </svg>
  );
}

export function PageFaultDiagram() {
  return (
    <svg viewBox="0 0 380 200" className="w-full">
      <rect width="380" height="200" rx="14" fill="#0b1220" />
      <rect x="20" y="20" width="100" height="40" rx="8" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" />
      <text x="70" y="44" fill="#67e8f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">CPU access</text>
      <path d="M120 40 h30" stroke="#94a3b8" />
      <path d="M150 40 l-8 -5 v10 z" fill="#94a3b8" />
      <rect x="160" y="20" width="100" height="40" rx="8" fill="rgba(248,113,113,0.1)" stroke="#f87171" />
      <text x="210" y="38" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Page Fault</text>
      <text x="210" y="52" fill="#fca5a5" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">trap → kernel</text>
      <path d="M210 60 v20" stroke="#94a3b8" />
      <path d="M210 80 l-5 -8 h10 z" fill="#94a3b8" />
      <rect x="40" y="90" width="140" height="40" rx="8" fill="rgba(52,211,153,0.1)" stroke="#34d399" />
      <text x="110" y="108" fill="#6ee7b7" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Minor Fault</text>
      <text x="110" y="121" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">map existing page</text>
      <rect x="200" y="90" width="140" height="40" rx="8" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" />
      <text x="270" y="108" fill="#fcd34d" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Major Fault</text>
      <text x="270" y="121" fill="#fcd34d" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">read from disk/swap</text>
      <path d="M110 130 v20M270 130 v20" stroke="#94a3b8" />
      <rect x="90" y="155" width="200" height="30" rx="8" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" />
      <text x="190" y="175" fill="#c4b5fd" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">resume instruction, PTE updated</text>
    </svg>
  );
}

export function SwapDiagram() {
  return (
    <svg viewBox="0 0 380 210" className="w-full">
      <rect width="380" height="210" rx="14" fill="#0b1220" />
      <rect x="20" y="20" width="150" height="70" rx="8" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" />
      <text x="95" y="42" fill="#67e8f9" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">RAM</text>
      <text x="95" y="58" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Page Cache + Anon</text>
      <text x="95" y="72" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">zswap (compressed)</text>
      <rect x="210" y="20" width="150" height="70" rx="8" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" />
      <text x="285" y="42" fill="#fcd34d" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Swapfile (disk)</text>
      <text x="285" y="58" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">/swap.img</text>
      <path d="M170 45 h40" stroke="#38bdf8" markerEnd="url(#arrow)" />
      <path d="M210 65 h-40" stroke="#f87171" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
      <text x="190" y="38" fill="#38bdf8" fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">swap-out</text>
      <text x="190" y="80" fill="#f87171" fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">swap-in</text>
      <rect x="20" y="110" width="340" height="30" rx="6" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" />
      <text x="190" y="130" fill="#c4b5fd" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">vm.swappiness = 0 ────────── 60 ────────── 200</text>
      <rect x="20" y="155" width="340" height="38" rx="6" fill="rgba(248,113,113,0.08)" stroke="#f87171" />
      <text x="190" y="178" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">OOM Killer / systemd-oomd</text>
    </svg>
  );
}

export function SecurityDiagram() {
  return (
    <svg viewBox="0 0 380 200" className="w-full">
      <rect width="380" height="200" rx="14" fill="#0b1220" />
      <rect x="20" y="20" width="160" height="70" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" />
      <text x="100" y="42" fill="#6ee7b7" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">ASLR</text>
      <text x="100" y="58" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">stack/heap/lib base</text>
      <text x="100" y="72" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">randomized each run</text>
      <rect x="200" y="20" width="160" height="70" rx="8" fill="rgba(248,113,113,0.08)" stroke="#f87171" />
      <text x="280" y="42" fill="#fca5a5" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">NX / XD bit</text>
      <text x="280" y="58" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">PTE marks page</text>
      <text x="280" y="72" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">non-executable</text>
      <rect x="40" y="110" width="300" height="30" rx="20" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" />
      <text x="190" y="130" fill="#fcd34d" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">shellcode injected into stack → blocked</text>
      <path d="M100 90 v15M280 90 v15" stroke="#94a3b8" />
      <text x="190" y="170" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace">together: defense-in-depth against buffer overflows</text>
    </svg>
  );
}
