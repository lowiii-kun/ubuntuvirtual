import { useMemo, useState } from "react";

export default function AddressTranslator() {
  const [hugePages, setHugePages] = useState(false);
  const [address, setAddress] = useState("0x7ffddead2048");
  const [samples, setSamples] = useState<boolean[]>([]);

  const parsed = useMemo(() => {
    const clean = address.replace(/^0x/i, "").replace(/[^0-9a-fA-F]/g, "") || "0";
    const value = BigInt("0x" + clean);
    return value;
  }, [address]);

  const pageSizeBits = hugePages ? 21 : 12; // 2MB vs 4KB
  const offsetMask = (1n << BigInt(pageSizeBits)) - 1n;
  const offset = parsed & offsetMask;
  const vpn = parsed >> BigInt(pageSizeBits);

  const levels = hugePages
    ? [
        { name: "PGD", bits: 9 },
        { name: "PUD", bits: 9 },
        { name: "PMD (maps 2MB)", bits: 9 },
      ]
    : [
        { name: "PGD", bits: 9 },
        { name: "PUD", bits: 9 },
        { name: "PMD", bits: 9 },
        { name: "PTE", bits: 9 },
      ];

  const translationSteps = levels.length + 1; // + TLB check
  const hitRateBase = hugePages ? 0.94 : 0.74;

  const runTranslation = () => {
    const results: boolean[] = [];
    for (let i = 0; i < 12; i++) {
      results.push(Math.random() < hitRateBase);
    }
    setSamples(results);
  };

  const hits = samples.filter(Boolean).length;
  const hitRate = samples.length ? Math.round((hits / samples.length) * 100) : null;

  let shift = BigInt(pageSizeBits);
  const indices = levels
    .slice()
    .reverse()
    .map((lv) => {
      const idx = (parsed >> shift) & 0x1ffn;
      shift += BigInt(lv.bits);
      return { ...lv, idx: idx.toString(10) };
    })
    .reverse();

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-400">
        Enter a virtual address and toggle the page size to see how many page-table levels must be walked, and how
        the simulated Translation Lookaside Buffer (TLB) hit-rate changes. Huge Pages (2 MB) collapse the last
        page-table level, covering far more memory per entry and dramatically boosting TLB efficiency.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 p-1">
          <button
            onClick={() => setHugePages(false)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${!hugePages ? "bg-cyan-500 text-slate-950" : "text-slate-400"}`}
          >
            4 KB Pages
          </button>
          <button
            onClick={() => setHugePages(true)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${hugePages ? "bg-emerald-500 text-slate-950" : "text-slate-400"}`}
          >
            2 MB Huge Pages
          </button>
        </div>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          spellCheck={false}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono-term text-sm text-cyan-300 outline-none focus:border-cyan-400"
        />
        <button
          onClick={runTranslation}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs font-bold text-slate-950"
        >
          Translate Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="glass-panel rounded-xl border border-slate-700/50 p-4">
          <h4 className="chip mb-3 text-cyan-300">Address Breakdown</h4>
          <div className="flex flex-wrap gap-2">
            {indices.map((lv) => (
              <div key={lv.name} className="rounded-md border border-cyan-400/30 bg-cyan-400/5 px-2.5 py-1.5 text-center">
                <p className="chip text-cyan-300">{lv.name}</p>
                <p className="font-mono-term text-sm text-white">{lv.idx}</p>
              </div>
            ))}
            <div className="rounded-md border border-amber-400/30 bg-amber-400/5 px-2.5 py-1.5 text-center">
              <p className="chip text-amber-300">Offset</p>
              <p className="font-mono-term text-sm text-white">{offset.toString(16)}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            VPN: <span className="font-mono-term text-slate-300">0x{vpn.toString(16)}</span> · Page-table walk requires{" "}
            <span className="text-emerald-300">{translationSteps}</span> steps (TLB check + {levels.length} levels) on a miss.
          </p>
        </div>

        <div className="glass-panel rounded-xl border border-slate-700/50 p-4">
          <h4 className="chip mb-3 text-emerald-300">Simulated TLB Access Pattern (12 accesses)</h4>
          <div className="flex flex-wrap gap-1.5">
            {samples.length === 0 && <p className="text-xs text-slate-500">Click “Translate Address” to simulate TLB lookups.</p>}
            {samples.map((hit, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold ${
                  hit ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50" : "bg-red-500/20 text-red-300 border border-red-400/50"
                }`}
              >
                {hit ? "H" : "M"}
              </span>
            ))}
          </div>
          {hitRate !== null && (
            <p className="mt-3 text-sm">
              Hit rate: <span className="font-mono-term font-bold text-emerald-300">{hitRate}%</span>{" "}
              <span className="text-xs text-slate-500">({hugePages ? "huge pages reduce entries needed to cover memory" : "standard 4KB pages need far more TLB entries"})</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
