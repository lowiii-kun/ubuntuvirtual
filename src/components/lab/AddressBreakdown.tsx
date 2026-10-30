import { useMemo, useState } from "react";

const fields = [
  { name: "Sign extend", bits: 16, color: "#64748b" },
  { name: "PGD index", bits: 9, color: "#22d3ee" },
  { name: "PUD index", bits: 9, color: "#34d399" },
  { name: "PMD index", bits: 9, color: "#a78bfa" },
  { name: "PTE index", bits: 9, color: "#fbbf24" },
  { name: "Page offset", bits: 12, color: "#f87171" },
];

export default function AddressBreakdown() {
  const [address, setAddress] = useState("0x0000563412ab9000");

  const bits = useMemo(() => {
    const clean = address.replace(/^0x/i, "").replace(/[^0-9a-fA-F]/g, "") || "0";
    let value: bigint;
    try {
      value = BigInt("0x" + clean);
    } catch {
      value = 0n;
    }
    let remaining = value;
    let shift = 0n;
    const results: { name: string; bits: number; color: string; value: string }[] = [];
    // process from least significant (page offset) upward, then reverse
    const order = [...fields].reverse();
    for (const f of order) {
      const mask = (1n << BigInt(f.bits)) - 1n;
      const v = (remaining >> shift) & mask;
      results.push({ ...f, value: v.toString(10) });
      shift += BigInt(f.bits);
    }
    return results.reverse();
  }, [address]);

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-400">
        A 48-bit x86-64 virtual address is carved into six fields: a sign-extension region, four 9-bit page-table
        indices (PGD, PUD, PMD, PTE), and a 12-bit page offset. Type any hexadecimal address below to see it
        decomposed live, exactly as the MMU hardware would interpret it during a page-table walk.
      </p>

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        spellCheck={false}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 font-mono-term text-sm text-cyan-300 outline-none focus:border-cyan-400"
        placeholder="0x0000563412ab9000"
      />

      <div className="overflow-x-auto">
        <div className="flex min-w-[600px] overflow-hidden rounded-lg border border-slate-700">
          {bits.map((f) => (
            <div
              key={f.name}
              style={{ flexBasis: `${(f.bits / 64) * 100}%`, borderColor: f.color }}
              className="border-r border-slate-700 px-2 py-3 text-center last:border-r-0"
            >
              <p className="text-[10px] font-semibold" style={{ color: f.color }}>
                {f.name}
              </p>
              <p className="text-[9px] text-slate-500">{f.bits} bits</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {bits.map((f) => (
          <div key={f.name} className="rounded-lg border p-3 text-center" style={{ borderColor: `${f.color}55`, backgroundColor: `${f.color}14` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: f.color }}>
              {f.name}
            </p>
            <p className="mt-1 font-mono-term text-lg font-bold text-white">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4 text-xs leading-relaxed text-cyan-200">
        Walk order: the MMU reads <strong>PGD index</strong> first from CR3's base, follows the pointer to the PUD
        table, then PMD, then PTE, and finally adds the <strong>page offset</strong> to the resulting physical frame
        address to get the exact physical byte address.
      </div>
    </div>
  );
}
