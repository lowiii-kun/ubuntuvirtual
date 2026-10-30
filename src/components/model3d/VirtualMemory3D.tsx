import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { modelInfo } from "./sceneData";

type ObjectId = keyof typeof modelInfo;
type SelectHandler = (id: ObjectId) => void;
type HoverProps = { hovered: string | null; setHovered: (v: string | null) => void };

function CpuCore({ onSelect, hovered, setHovered }: { onSelect: SelectHandler } & HoverProps) {
  const isHover = hovered === "cpu";
  const cores = useMemo(() => {
    const arr: [number, number][] = [];
    for (let x = -0.45; x <= 0.45; x += 0.9) {
      for (let z = -0.45; z <= 0.45; z += 0.9) arr.push([x, z]);
    }
    return arr;
  }, []);
  const pins = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = -0.9; i <= 0.9; i += 0.6) {
      arr.push([i, -0.3, 0.75]);
      arr.push([i, -0.3, -0.75]);
    }
    return arr;
  }, []);

  return (
    <group
      position={[0, 3.4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect("cpu");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("cpu");
      }}
      onPointerOut={() => setHovered(null)}
    >
      <mesh castShadow>
        <boxGeometry args={[2.1, 0.35, 2.1]} />
        <meshStandardMaterial color={isHover ? "#c4b5fd" : "#8b5cf6"} emissive="#7c3aed" emissiveIntensity={isHover ? 0.9 : 0.4} metalness={0.55} roughness={0.3} />
      </mesh>
      {cores.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.26, z]} castShadow>
          <boxGeometry args={[0.6, 0.14, 0.6]} />
          <meshStandardMaterial color="#1e1b4b" emissive={isHover ? "#a78bfa" : "#4c1d95"} emissiveIntensity={0.6} metalness={0.6} roughness={0.25} />
        </mesh>
      ))}
      {pins.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.22, 0.1]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <Html distanceFactor={9} position={[0, -0.7, 0]}>
        <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-violet-300 font-mono-term whitespace-nowrap">
          CPU Core
        </div>
      </Html>
    </group>
  );
}

function Mmu({ onSelect, hovered, setHovered }: { onSelect: SelectHandler } & HoverProps) {
  const isHover = hovered === "mmu";
  const isTlbHover = hovered === "tlb";
  const pins = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = -1.5; i <= 1.5; i += 1) {
      arr.push([i, -0.55, 1.1]);
      arr.push([i, -0.55, -1.1]);
    }
    return arr;
  }, []);

  return (
    <group position={[0, 1.6, 0]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect("mmu");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("mmu");
        }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.5, 3.2]} />
          <meshStandardMaterial color={isHover ? "#22d3ee" : "#0ea5c4"} emissive="#06b6d4" emissiveIntensity={isHover ? 0.9 : 0.4} metalness={0.6} roughness={0.3} />
        </mesh>
        {pins.map((p, i) => (
          <mesh key={i} position={p}>
            <boxGeometry args={[0.12, 0.3, 0.12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        <Html distanceFactor={9} position={[0, -1, 0]}>
          <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-cyan-300 font-mono-term whitespace-nowrap">
            MMU
          </div>
        </Html>
      </group>

      {/* TLB — small hardware cache chip seated on the MMU die, independently clickable */}
      <group
        position={[0, 0.42, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("tlb");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("tlb");
        }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.22, 1.5]} />
          <meshStandardMaterial color={isTlbHover ? "#f0abfc" : "#d946ef"} emissive="#c026d3" emissiveIntensity={isTlbHover ? 1 : 0.5} metalness={0.5} roughness={0.25} />
        </mesh>
        {[-0.5, 0, 0.5].map((x) =>
          [-0.5, 0, 0.5].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.14, z]}>
              <boxGeometry args={[0.22, 0.06, 0.22]} />
              <meshStandardMaterial color="#0b1220" />
            </mesh>
          )),
        )}
        <Html distanceFactor={9} position={[1.3, 0.1, 0]}>
          <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-fuchsia-300 font-mono-term whitespace-nowrap">
            TLB
          </div>
        </Html>
      </group>
    </group>
  );
}

function PageTables({ onSelect, hovered, setHovered }: { onSelect: SelectHandler } & HoverProps) {
  const isHover = hovered === "pagetables";
  const levels = ["PGD", "PUD", "PMD", "PTE"];
  const corners: [number, number][] = [
    [-0.9, -0.55],
    [0.9, -0.55],
    [-0.9, 0.55],
    [0.9, 0.55],
  ];

  return (
    <group
      position={[-4, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect("pagetables");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("pagetables");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {levels.map((lv, i) => (
        <group key={lv} position={[0, i * 0.55, 0]}>
          <mesh>
            <boxGeometry args={[2.2, 0.22, 1.4]} />
            <meshStandardMaterial color={isHover ? "#34d399" : "#10b981"} emissive="#10b981" emissiveIntensity={isHover ? 0.8 : 0.35} metalness={0.4} roughness={0.4} />
          </mesh>
          {[-0.8, -0.3, 0.2, 0.7].map((x, j) => (
            <mesh key={j} position={[x, 0.16, 0]}>
              <boxGeometry args={[0.3, 0.1, 1.1]} />
              <meshStandardMaterial color="#064e3b" />
            </mesh>
          ))}
          {/* Connector pillars linking this level down to the one below it, visualizing the pointer-chase walk */}
          {i > 0 &&
            corners.map(([cx, cz], j) => (
              <mesh key={j} position={[cx, -0.17, cz]}>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                <meshStandardMaterial color="#6ee7b7" emissive="#34d399" emissiveIntensity={0.6} />
              </mesh>
            ))}
        </group>
      ))}
      <Html distanceFactor={9} position={[0, -0.6, 0]}>
        <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-emerald-300 font-mono-term whitespace-nowrap">
          Page Tables
        </div>
      </Html>
    </group>
  );
}

const FRAME_STATES = [
  { label: "Free", color: "#1e293b", glow: false },
  { label: "Active / anon", color: "#f59e0b", glow: true },
  { label: "Shared / cache", color: "#22d3ee", glow: true },
  { label: "Dirty", color: "#ef4444", glow: true },
] as const;

function RamFrames({ onSelect, hovered, setHovered }: { onSelect: SelectHandler } & HoverProps) {
  const isHover = hovered === "ram";
  const grid = useMemo(() => {
    const arr: [number, number][] = [];
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 4; y++) {
        arr.push([x * 0.5 - 1.25, y * 0.55 - 0.825]);
      }
    }
    return arr;
  }, []);

  return (
    <group
      position={[4, 0.4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect("ram");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("ram");
      }}
      onPointerOut={() => setHovered(null)}
    >
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[3.2, 2.4, 0.15]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
      {grid.map(([x, y], i) => {
        const state = FRAME_STATES[i % FRAME_STATES.length];
        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.22]} />
            <meshStandardMaterial
              color={isHover ? "#fbbf24" : state.color}
              emissive={state.glow ? state.color : "#000000"}
              emissiveIntensity={state.glow ? 0.5 : 0}
              metalness={0.5}
              roughness={0.35}
            />
          </mesh>
        );
      })}
      <Html distanceFactor={9} position={[0, -1.55, 0]}>
        <div className="pointer-events-none select-none flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded bg-slate-950/80 px-2.5 py-1.5 text-[9px] font-semibold text-slate-300 font-mono-term whitespace-nowrap">
          {FRAME_STATES.map((s) => (
            <span key={s.label} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </Html>
    </group>
  );
}

function SwapStorage({ onSelect, hovered, setHovered }: { onSelect: SelectHandler } & HoverProps) {
  const isHover = hovered === "swap";
  const isZswapHover = hovered === "zswap";
  const grooves = [0.3, 0.5, 0.7, 0.9];

  return (
    <group position={[0, -1.9, 2.4]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect("swap");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("swap");
        }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.3, 48]} />
          <meshStandardMaterial color={isHover ? "#f87171" : "#dc2626"} emissive="#ef4444" emissiveIntensity={isHover ? 0.7 : 0.3} metalness={0.6} roughness={0.3} />
        </mesh>
        {grooves.map((r) => (
          <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
            <torusGeometry args={[r, 0.006, 8, 48]} />
            <meshStandardMaterial color="#7f1d1d" />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <Html distanceFactor={9} position={[0, -1, 0]}>
          <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-red-300 font-mono-term whitespace-nowrap">
            Swap Storage
          </div>
        </Html>
      </group>

      {/* zswap — translucent compressed cache hovering above the disk, intercepting pages before they land on it */}
      <group
        position={[0, 0.65, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("zswap");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("zswap");
        }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh>
          <boxGeometry args={[1.5, 0.3, 1.5]} />
          <meshStandardMaterial
            color={isZswapHover ? "#fda4af" : "#fb7185"}
            emissive="#fb7185"
            emissiveIntensity={isZswapHover ? 0.8 : 0.45}
            transparent
            opacity={0.55}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
        <Html distanceFactor={9} position={[0, 0.45, 0]}>
          <div className="pointer-events-none select-none rounded bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-rose-300 font-mono-term whitespace-nowrap">
            zswap
          </div>
        </Html>
      </group>
    </group>
  );
}

function DataStream({ from, to, color, speed = 0.4, offset = 0 }: { from: [number, number, number]; to: [number, number, number]; color: string; speed?: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.LineCurve3(new THREE.Vector3(...from), new THREE.Vector3(...to)), [from, to]);
  const points = useMemo(() => curve.getPoints(2), [curve]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const p = curve.getPoint(t);
    ref.current.position.copy(p);
  });

  return (
    <>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} opacity={0.35} transparent />
      </line>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
      </mesh>
    </>
  );
}

function Scene({ onSelect }: { onSelect: SelectHandler }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 8, 6]} intensity={60} color="#22d3ee" />
      <pointLight position={[-6, -4, -6]} intensity={40} color="#34d399" />
      <pointLight position={[0, 5, -6]} intensity={30} color="#a78bfa" />
      <hemisphereLight args={["#0ea5e9", "#0f172a", 0.4]} />

      <CpuCore onSelect={onSelect} hovered={hovered} setHovered={setHovered} />
      <Mmu onSelect={onSelect} hovered={hovered} setHovered={setHovered} />
      <PageTables onSelect={onSelect} hovered={hovered} setHovered={setHovered} />
      <RamFrames onSelect={onSelect} hovered={hovered} setHovered={setHovered} />
      <SwapStorage onSelect={onSelect} hovered={hovered} setHovered={setHovered} />

      <DataStream from={[0, 3.2, 0]} to={[0, 1.95, 0]} color="#c4b5fd" speed={0.6} />
      <DataStream from={[-2.9, 1.2, 0]} to={[-1.3, 1.6, 0]} color="#67e8f9" speed={0.5} />
      <DataStream from={[1.5, 1.6, 0]} to={[2.9, 1.2, 0]} color="#67e8f9" speed={0.5} offset={0.5} />
      <DataStream from={[4, -0.8, 0]} to={[1, -1.8, 2]} color="#fca5a5" speed={0.3} />
      <DataStream from={[1, -1.8, 2]} to={[4, -0.8, 0]} color="#fca5a5" speed={0.3} offset={0.5} />
      <DataStream from={[0, 1.3, 0]} to={[0, -1.5, 2.2]} color="#fde68a" speed={0.35} />
      <DataStream from={[0, -1.6, 2.4]} to={[0, -1.25, 2.4]} color="#fda4af" speed={0.8} offset={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
        <circleGeometry args={[7.5, 48]} />
        <meshStandardMaterial color="#0b1220" transparent opacity={0.5} />
      </mesh>
      <gridHelper args={[16, 24, "#164e63", "#0f2436"]} position={[0, -2.59, 0]} />

      <OrbitControls enablePan={false} minDistance={4} maxDistance={18} />
    </>
  );
}

export default function VirtualMemory3D({ onSelect }: { onSelect: SelectHandler }) {
  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#060b16]">
      <Canvas shadows camera={{ position: [7, 5, 10], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene onSelect={onSelect} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-slate-950/70 px-3 py-2 text-[11px] text-slate-400">
        Drag to rotate · Scroll to zoom · Click any component — CPU, TLB, MMU, page tables, RAM, swap, zswap — for details
      </div>
    </div>
  );
}

export type { ObjectId };
export { modelInfo };
