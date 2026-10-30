import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { TerminalIcon } from "./Icons";
import { cliCommands, type CliCommand } from "../data/vmContent";

interface HistoryEntry {
  command: string;
  output: string;
  done: boolean;
}

export default function DiagnosticCLI() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: "", output: "Welcome to the Ubuntu Virtual Memory diagnostic shell.\nClick any command on the left to run it.", done: true },
  ]);
  const [typing, setTyping] = useState(false);
  const [selected, setSelected] = useState<CliCommand | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, typing]);

  useEffect(() => () => timeouts.current.forEach((t) => clearTimeout(t)), []);

  const runCommand = (cmd: CliCommand) => {
    if (typing) return;
    setSelected(cmd);
    setTyping(true);
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];

    const entryIndex = history.length;
    setHistory((h) => [...h, { command: "", output: "", done: false }]);

    let i = 0;
    const typeNext = () => {
      i++;
      setHistory((h) => {
        const next = [...h];
        next[entryIndex] = { ...next[entryIndex], command: cmd.command.slice(0, i) };
        return next;
      });
      if (i < cmd.command.length) {
        const t = window.setTimeout(typeNext, 28 + Math.random() * 35);
        timeouts.current.push(t);
      } else {
        const t = window.setTimeout(() => {
          setHistory((h) => {
            const next = [...h];
            next[entryIndex] = { command: cmd.command, output: cmd.output, done: true };
            return next;
          });
          setTyping(false);
        }, 380);
        timeouts.current.push(t);
      }
    };
    const t = window.setTimeout(typeNext, 150);
    timeouts.current.push(t);
  };

  const clear = () => {
    timeouts.current.forEach((tm) => clearTimeout(tm));
    setTyping(false);
    setSelected(null);
    setHistory([{ command: "", output: "Shell cleared. Select a command to continue.", done: true }]);
  };

  return (
    <section id="cli" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Module 4 · Hands-On"
          title="Real-World Diagnostic Tools CLI"
          description="Explore genuine Ubuntu memory-diagnostic commands in a simulated terminal. Click a command to watch it type itself out live, then see realistic sample output annotated with what each field means — just like running it over SSH on a real Ubuntu box."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="glass-panel col-span-1 space-y-2 rounded-2xl border border-slate-700/50 p-4 lg:col-span-2">
            <h4 className="chip mb-2 px-1 text-slate-400">AVAILABLE COMMANDS</h4>
            {cliCommands.map((c) => (
              <button
                key={c.id}
                onClick={() => runCommand(c)}
                disabled={typing}
                className={`w-full rounded-lg border px-3 py-2.5 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  selected?.id === c.id
                    ? "border-cyan-400/60 bg-cyan-400/10"
                    : "border-slate-700/60 bg-slate-900/40 hover:border-cyan-400/40 hover:bg-cyan-400/5"
                }`}
              >
                <p className="font-mono-term text-xs font-semibold text-emerald-300">$ {c.command}</p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">{c.description}</p>
              </button>
            ))}
            <button
              onClick={clear}
              className="mt-2 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-red-400/50 hover:text-red-300"
            >
              clear shell
            </button>
          </div>

          <div className="glass-panel neon-border-cyan col-span-1 overflow-hidden rounded-2xl lg:col-span-3">
            <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-900/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <TerminalIcon className="ml-2 h-4 w-4 text-slate-400" />
              <span className="chip text-slate-400">ubuntu@vm-lab:~$</span>
            </div>
            <div ref={scrollRef} className="h-[420px] overflow-y-auto bg-[#080e1a] p-5 font-mono-term text-[13px] leading-relaxed scrollbar-thin">
              {history.map((h, idx) => (
                <div key={idx} className="mb-3">
                  {h.command !== "" && (
                    <p className="text-emerald-300">
                      <span className="text-cyan-400">$</span> {h.command}
                      {!h.done && <span className="animate-caret border-r-2 border-emerald-300">&nbsp;</span>}
                    </p>
                  )}
                  {h.output && (
                    <pre className="mt-1 whitespace-pre-wrap text-slate-400">{h.output}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
