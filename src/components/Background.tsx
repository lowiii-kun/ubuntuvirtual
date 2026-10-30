import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const addresses = ["0x7ffd", "0xC000", "PGD", "PUD", "PMD", "PTE", "0x4096", "TLB", "RAM", "0x1A2F", "swap", "mmu"];
    const particles: Particle[] = [];
    const count = Math.min(70, Math.floor((width * height) / 22000));
    const colors = [187, 160, 42]; // cyan-ish hue, emerald, amber hues

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 10 + 8,
        hue: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const labels = particles.map((_, i) => addresses[i % addresses.length]);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // grid
      ctx.strokeStyle = "rgba(34,211,238,0.035)";
      ctx.lineWidth = 1;
      const gap = 56;
      for (let x = 0; x < width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.16)`;
        ctx.fillText(labels[i], p.x, p.y);
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070d1a]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 bg-grid animate-pulse-grid opacity-20" />
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-400/5 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070d1a]/40 to-[#070d1a]" />
    </div>
  );
}
