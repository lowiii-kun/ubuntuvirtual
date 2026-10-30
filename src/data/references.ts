export interface Reference {
  label: string;
  url: string;
  note: string;
}

export const officialReferences: Reference[] = [
  { label: "Ubuntu Server Documentation — Memory", url: "https://ubuntu.com/server/docs", note: "Official Ubuntu Server administration documentation." },
  { label: "Linux Kernel Documentation — mm (Memory Management)", url: "https://www.kernel.org/doc/html/latest/admin-guide/mm/index.html", note: "Kernel.org administrator guide to the memory management subsystem." },
  { label: "LWN.net — Memory Management Archives", url: "https://lwn.net/Kernel/Index/#Memory_management", note: "In-depth engineering articles on Linux kernel memory internals." },
  { label: "Elixir Bootlin Cross Referencer — mm/memory.c", url: "https://elixir.bootlin.com/linux/latest/source/mm/memory.c", note: "Browsable, cross-referenced Linux kernel source code." },
  { label: "man7.org — proc(5), mmap(2), pmap(1), vmstat(8)", url: "https://man7.org/linux/man-pages/", note: "Canonical Linux man pages for diagnostic tools and system calls referenced in this project." },
  { label: "Arch Wiki — Swap", url: "https://wiki.archlinux.org/title/Swap", note: "Community-maintained technical reference on swap, zswap, and swappiness." },
  { label: "Red Hat Documentation — Virtual Memory Manager", url: "https://access.redhat.com/documentation", note: "Enterprise Linux documentation on VM subsystem tuning." },
];

export const academicReferences: Reference[] = [
  { label: "Silberschatz, Galvin & Gagne — Operating System Concepts, 10th Ed.", url: "https://www.os-book.com/", note: "Core textbook reference for process, memory, and virtual memory theory." },
  { label: "Bryant & O'Hallaron — Computer Systems: A Programmer's Perspective, 3rd Ed.", url: "https://csapp.cs.cmu.edu/", note: "Reference for address space layout, linking, and virtual memory mechanics." },
  { label: "Love, Robert — Linux Kernel Development, 3rd Ed.", url: "https://www.pearson.com/", note: "Reference for Linux-specific kernel internals including mm_struct and page faults." },
];

export interface AssetReference {
  asset: string;
  source: string;
  url: string;
}

export const assetReferences: AssetReference[] = [
  { asset: "Video — \"What is Virtual Memory? MMU, Page Tables, and more!\"", source: "YouTube", url: "https://www.youtube.com/watch?v=4e18yybPo1E" },
  { asset: "Video — \"C Program Memory Layout Explained\"", source: "YouTube", url: "https://www.youtube.com/watch?v=m75_zMw8w3g" },
  { asset: "Video — \"Page Tables (Multi-level Paging Explained)\"", source: "YouTube", url: "https://www.youtube.com/watch?v=MqJMvLJtzaI" },
  { asset: "Video — \"Copy-On-Write (COW) Explained\"", source: "YouTube", url: "https://www.youtube.com/watch?v=Z7trhEUkIY8" },
  { asset: "Video — \"Swappiness in Linux Explained\"", source: "YouTube", url: "https://www.youtube.com/watch?v=pU082OwoDik" },
  { asset: "Video — \"Understanding ASLR and Its Bypass\"", source: "YouTube", url: "https://www.youtube.com/watch?v=_PuMQuhInJ8" },
  { asset: "YouTube thumbnail artwork", source: "img.youtube.com thumbnail CDN", url: "https://img.youtube.com/" },
  { asset: "Ubuntu wordmark & brand color palette inspiration", source: "Ubuntu Design / Canonical Brand Guide", url: "https://design.ubuntu.com/brand/colour-palette/" },
  { asset: "Terminal UI & monospace typography inspiration", source: "JetBrains Mono (Google Fonts)", url: "https://fonts.google.com/specimen/JetBrains+Mono" },
  { asset: "Icons & diagrams", source: "Hand-built custom inline SVG, original work for this project", url: "#" },
  { asset: "3D model geometry & materials", source: "Built with Three.js / @react-three/fiber primitives, original scene composition", url: "https://threejs.org/" },
];
