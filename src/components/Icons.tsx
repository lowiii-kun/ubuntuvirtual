import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="8" width="32" height="8" rx="2" stroke="currentColor" />
      <rect x="8" y="20" width="32" height="8" rx="2" stroke="currentColor" />
      <rect x="8" y="32" width="32" height="8" rx="2" stroke="currentColor" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6 L42 16 L24 26 L6 16 Z" stroke="currentColor" />
      <path d="M6 24 L24 34 L42 24" stroke="currentColor" />
      <path d="M6 32 L24 42 L42 32" stroke="currentColor" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="15" height="15" rx="2" stroke="currentColor" />
      <rect x="27" y="6" width="15" height="15" rx="2" stroke="currentColor" />
      <rect x="6" y="27" width="15" height="15" rx="2" stroke="currentColor" />
      <rect x="27" y="27" width="15" height="15" rx="2" stroke="currentColor" />
    </svg>
  );
}

export function CpuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="14" y="14" width="20" height="20" rx="2" stroke="currentColor" />
      <rect x="20" y="20" width="8" height="8" rx="1" stroke="currentColor" />
      <path d="M20 4v8M28 4v8M20 36v8M28 36v8M4 20h8M4 28h8M36 20h8M36 28h8" stroke="currentColor" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="17" cy="16" r="6" stroke="currentColor" />
      <path d="M6 40c1-8 7-12 11-12s10 4 11 12" stroke="currentColor" />
      <circle cx="33" cy="14" r="5" stroke="currentColor" />
      <path d="M28 24c2-1 4-1 6-1 5 0 9 4 10 11" stroke="currentColor" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" />
      <path d="M24 13v11l8 6" stroke="currentColor" />
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="10" r="5" stroke="currentColor" />
      <circle cx="10" cy="36" r="5" stroke="currentColor" />
      <circle cx="38" cy="36" r="5" stroke="currentColor" />
      <path d="M24 15v8M20 27l-7 5M28 27l7 5" stroke="currentColor" />
    </svg>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="8" width="32" height="12" rx="2" stroke="currentColor" />
      <rect x="8" y="28" width="32" height="12" rx="2" stroke="currentColor" />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
      <circle cx="14" cy="34" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="16" y="16" width="16" height="16" rx="2" stroke="currentColor" />
      <path d="M20 16v-6M28 16v-6M20 38v-6M28 38v-6M16 20h-6M16 28h-6M38 20h-6M38 28h-6" stroke="currentColor" />
    </svg>
  );
}

export function MobileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="14" y="5" width="20" height="38" rx="3" stroke="currentColor" />
      <path d="M21 39h6" stroke="currentColor" />
    </svg>
  );
}

export function KernelIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="10" stroke="currentColor" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeDasharray="3 4" />
      <path d="M24 14v-6M24 40v-6M14 24h-6M40 24h-6" stroke="currentColor" />
    </svg>
  );
}

export function MemoryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="16" width="36" height="16" rx="2" stroke="currentColor" />
      <path d="M12 16v-5M18 16v-5M24 16v-5M30 16v-5M36 16v-5" stroke="currentColor" />
      <path d="M12 32v5M18 32v5M24 32v5M30 32v5M36 32v5" stroke="currentColor" />
    </svg>
  );
}

export function AddressSpaceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="12" y="4" width="24" height="40" rx="2" stroke="currentColor" />
      <path d="M12 12h24M12 20h24M12 26h24M12 34h24" stroke="currentColor" />
    </svg>
  );
}

export function MmuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="18" width="12" height="12" rx="2" stroke="currentColor" />
      <rect x="32" y="18" width="12" height="12" rx="2" stroke="currentColor" />
      <path d="M16 24h16" stroke="currentColor" />
      <path d="M24 24v-10a4 4 0 0 1 4-4h4" stroke="currentColor" />
      <circle cx="24" cy="24" r="3" stroke="currentColor" />
    </svg>
  );
}

export function FaultIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 4 44 40H4Z" stroke="currentColor" />
      <path d="M24 18v10" stroke="currentColor" />
      <circle cx="24" cy="33" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function SwapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 16h24l-6-6" stroke="currentColor" />
      <path d="M40 32H16l6 6" stroke="currentColor" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 4 40 10v12c0 12-8 18-16 22-8-4-16-10-16-22V10Z" stroke="currentColor" />
      <path d="M17 24l5 5 9-11" stroke="currentColor" />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" />
      <path d="M12 18l8 6-8 6M26 30h10" stroke="currentColor" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 4h12M20 4v12l-12 20a4 4 0 0 0 4 6h24a4 4 0 0 0 4-6L28 16V4" stroke="currentColor" />
      <path d="M14 32h20" stroke="currentColor" />
    </svg>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 4 42 14v20L24 44 6 34V14Z" stroke="currentColor" />
      <path d="M24 4v20M24 24 42 14M24 24 6 14" stroke="currentColor" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 10c-4-4-12-5-18-3v28c6-2 14-1 18 3 4-4 12-5 18-3V7c-6-2-14-1-18 3Z" stroke="currentColor" />
      <path d="M24 10v28" stroke="currentColor" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="21" fill="rgba(15,23,42,0.75)" stroke="white" strokeWidth="1.5" />
      <path d="M19 15l16 9-16 9Z" fill="white" />
    </svg>
  );
}

export const iconMap: Record<string, (props: IconProps) => ReactElement> = {
  stack: StackIcon,
  layers: LayersIcon,
  grid: GridIcon,
  cpu: CpuIcon,
  users: UsersIcon,
  clock: ClockIcon,
  network: NetworkIcon,
  server: ServerIcon,
  chip: ChipIcon,
  mobile: MobileIcon,
  kernel: KernelIcon,
  memory: MemoryIcon,
  address: AddressSpaceIcon,
  mmu: MmuIcon,
  fault: FaultIcon,
  swap: SwapIcon,
  shield: ShieldIcon,
  terminal: TerminalIcon,
  flask: FlaskIcon,
  cube: CubeIcon,
  book: BookIcon,
};
