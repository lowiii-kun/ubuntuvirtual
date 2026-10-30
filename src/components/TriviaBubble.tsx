import { useCallback, useEffect, useRef, useState } from "react";
import { triviaFacts } from "../data/vmContent";

export default function TriviaBubble() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [pos, setPos] = useState({ top: "20%", left: "85%" });
  const [fact, setFact] = useState(triviaFacts[0]);
  const timeoutRef = useRef<number | null>(null);
  const currentTopicRef = useRef<string | null>(null);

  // Track which VM concept card is currently most visible on screen, so the
  // trivia shown stays relevant to whatever the user is looking at.
  useEffect(() => {
    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        let bestTopic: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestTopic = (el as HTMLElement).dataset.triviaTopic ?? null;
          }
        });
        if (bestRatio > 0.15) currentTopicRef.current = bestTopic;
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    const observeCards = () => {
      document.querySelectorAll<HTMLElement>("[data-trivia-topic]").forEach((el) => observer.observe(el));
    };
    observeCards();
    // Cards may mount slightly after this effect on first load; retry once.
    const retry = window.setTimeout(observeCards, 500);

    return () => {
      observer.disconnect();
      window.clearTimeout(retry);
    };
  }, []);

  const randomize = useCallback(() => {
    // Bubble itself stays docked to the side, never dead-center.
    const top = 15 + Math.random() * 65;
    const side = Math.random() < 0.5 ? 4 + Math.random() * 10 : 82 + Math.random() * 10;
    setPos({ top: `${top}%`, left: `${side}%` });

    const topic = currentTopicRef.current;
    const relevant = topic ? triviaFacts.filter((f) => f.topic === topic) : [];
    const pool = relevant.length > 0 ? relevant : triviaFacts;
    setFact(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  const scheduleNext = useCallback(() => {
    const delay = 14000 + Math.random() * 12000;
    timeoutRef.current = window.setTimeout(() => {
      randomize();
      setVisible(true);
    }, delay);
  }, [randomize]);

  useEffect(() => {
    scheduleNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scheduleNext]);

  const handleOpen = () => setOpened(true);

  const handleDismiss = () => {
    setOpened(false);
    setVisible(false);
    scheduleNext();
  };

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  if (!visible) return null;

  return (
    <>
      {!opened && (
        <div className="fixed z-[90]" style={{ top: pos.top, left: pos.left }}>
          <button
            onClick={handleOpen}
            aria-label="Reveal trivia"
            className="animate-bubble-pop relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/50 bg-amber-400/10 text-amber-300 shadow-[0_0_30px_-5px_rgba(251,191,36,0.7)] transition hover:scale-110"
          >
            <span className="absolute inset-0 animate-ping rounded-full border border-amber-400/40" />
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9.2a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.7v.4" strokeLinecap="round" />
              <circle cx="12" cy="16.6" r="0.6" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}

      {opened && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-in glass-panel w-full max-w-sm rounded-2xl border border-amber-400/40 p-5 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)]"
          >
            <p className="chip mb-2 text-amber-300">Did you know?</p>
            <p className="text-sm leading-relaxed text-slate-200">{fact.text}</p>
            <button
              onClick={handleDismiss}
              className="mt-3 w-full rounded-lg border border-amber-400/40 bg-amber-400/10 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
