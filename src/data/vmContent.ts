export interface VideoRef {
  youtubeId: string;
  title: string;
}

export interface VmSection {
  id: string;
  tag: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  kernelPaths: string[];
  syscalls: string[];
  video?: VideoRef;
}

export const vmSections: VmSection[] = [
  {
    id: "vm-intro",
    tag: "3.0",
    title: "Introduction to Virtual Memory",
    icon: "memory",
    summary:
      "Virtual memory is an abstraction that gives every process the illusion of a large, private, contiguous address space, decoupled from the physical RAM actually installed. The kernel and MMU cooperate to translate these virtual addresses into real physical frames on demand. This enables isolation, overcommitment, and efficient multitasking on systems like Ubuntu.",
    details: [
      "Virtual memory abstracts physical RAM into a per-process address space, so programs never touch raw physical addresses directly.",
      "It allows the total memory used by all processes to exceed physical RAM by paging infrequently used data out to disk (swap).",
      "Provides strong process isolation — one process cannot read or corrupt another process's memory because each has an independent page table.",
      "Enables features such as memory-mapped files, shared libraries, lazy loading, and Copy-on-Write duplication.",
      "Managed cooperatively by the Linux kernel's memory manager (mm subsystem) and the CPU's Memory Management Unit (MMU) hardware.",
    ],
    kernelPaths: ["mm/memory.c", "mm/mmap.c", "mm/page_alloc.c", "include/linux/mm.h"],
    syscalls: ["mmap()", "brk()", "munmap()", "mprotect()"],
    video: { youtubeId: "4e18yybPo1E", title: "What is Virtual Memory? MMU, Page Tables, and more!" },
  },
  {
    id: "address-space",
    tag: "3.1",
    title: "The Process Address Space",
    icon: "address",
    summary:
      "Every Ubuntu process receives its own private virtual address space, laid out in well-defined segments: Text (code), Data, BSS, Heap, memory-mapped Shared Libraries, Stack, and a reserved region for Kernel space. This layout lets the OS manage permissions and growth independently per segment while keeping processes isolated from one another.",
    details: [
      "Text segment: read-only, executable machine code of the program, often shared between multiple instances of the same binary.",
      "Data & BSS segments: Data holds initialized global/static variables; BSS holds uninitialized ones, zero-filled at load time.",
      "Heap: grows upward via brk()/sbrk() or anonymous mmap() calls, used for dynamic allocation (malloc/new).",
      "Memory-mapped region: shared libraries (.so files), mmap'd files, and anonymous mappings live here, placed via mmap().",
      "Stack: grows downward automatically, stores function frames, local variables, and return addresses; protected by guard pages.",
      "Kernel space: the top portion of the virtual address range reserved for the kernel, inaccessible from user mode (Ring 3).",
    ],
    kernelPaths: ["mm/mmap.c", "arch/x86/mm/init.c", "fs/binfmt_elf.c"],
    syscalls: ["mmap()", "brk()", "execve()"],
    video: { youtubeId: "m75_zMw8w3g", title: "C Program Memory Layout Explained" },
  },
  {
    id: "mmu-paging",
    tag: "3.2",
    title: "Address Translation & the MMU",
    icon: "mmu",
    summary:
      "Virtual addresses are split into page-table indices and an offset, then translated into physical frame addresses by the CPU's Memory Management Unit, consulting multi-level page tables (PGD → PUD → PMD → PTE). Ubuntu defaults to 4 KB pages but can leverage Transparent Huge Pages (2 MB/1 GB) to shrink table sizes and raise TLB hit rates for large workloads.",
    details: [
      "Standard x86-64 pages are 4 KB; Transparent Huge Pages (THP) can use 2 MB or 1 GB pages to cut page-table overhead for big memory regions.",
      "Four/five-level page tables: PGD (Page Global Directory) → PUD → PMD → PTE (Page Table Entry) → physical frame + offset.",
      "Each PTE stores the physical frame number plus flags: present, read/write, user/supervisor, NX (no-execute), accessed, dirty.",
      "The Translation Lookaside Buffer (TLB) is a hardware cache of recent virtual-to-physical translations, avoiding slow page-table walks.",
      "Huge pages reduce the number of TLB entries needed to cover the same memory region, significantly improving TLB hit rate for large datasets (e.g., databases, JVMs).",
    ],
    kernelPaths: ["arch/x86/mm/fault.c", "mm/huge_memory.c", "mm/pgtable-generic.c"],
    syscalls: ["mmap(MAP_HUGETLB)", "madvise(MADV_HUGEPAGE)"],
    video: { youtubeId: "MqJMvLJtzaI", title: "Page Tables (Multi-level Paging Explained)" },
  },
  {
    id: "page-faults",
    tag: "3.3",
    title: "Page Faults & Demand Paging",
    icon: "fault",
    summary:
      "Linux uses demand paging: pages are not loaded into RAM until actually accessed, triggering a page fault trap handled by the kernel. Minor faults just wire up an already-cached physical page (e.g., shared library pages or CoW pages); major faults require a slow disk read. Lazy allocation and Copy-on-Write both exploit this mechanism to save memory and time.",
    details: [
      "Minor page fault: the data already exists in memory (e.g., shared page, page cache) — the kernel just updates the page table. Fast.",
      "Major page fault: the data must be read from disk/swap, causing I/O latency — much slower than minor faults.",
      "Lazy allocation: mmap()/brk() reserve virtual address ranges without committing physical frames until first touch.",
      "Copy-on-Write (CoW): after fork(), parent and child share the same physical pages marked read-only; a write triggers a fault that duplicates only that page.",
      "The page fault handler (do_page_fault / handle_mm_fault) inspects the vm_area_struct to decide how to resolve the fault.",
    ],
    kernelPaths: ["mm/memory.c", "arch/x86/mm/fault.c", "mm/filemap.c"],
    syscalls: ["mmap()", "fork()", "madvise()"],
    video: { youtubeId: "Z7trhEUkIY8", title: "Copy-On-Write (COW) Explained" },
  },
  {
    id: "swapping-caching",
    tag: "3.4",
    title: "Swapping, Caching & Memory Pressure",
    icon: "swap",
    summary:
      "Ubuntu keeps frequently used disk blocks in the Page Cache to accelerate file I/O, and under memory pressure reclaims or swaps out less-used anonymous pages to a swapfile or compressed zswap pool. The swappiness tunable controls how aggressively the kernel prefers swapping vs reclaiming cache, while systemd-oomd and the kernel OOM Killer step in as a last resort when memory is critically exhausted.",
    details: [
      "Page Cache transparently caches file-backed pages in RAM, dramatically speeding up repeated reads/writes, reclaimed first under pressure.",
      "Modern Ubuntu (22.04+) defaults to a swapfile (instead of a dedicated swap partition) created at install time, resizable on demand.",
      "zswap compresses pages in RAM before writing them to the swap device (or avoids writing altogether), reducing disk I/O and improving latency.",
      "vm.swappiness (0–200) tunes the kernel's preference: low values favor reclaiming page cache, high values favor swapping anonymous memory sooner.",
      "When memory is critically low, systemd-oomd (userspace, pressure-aware) or the kernel's OOM Killer (oom_score based) terminate processes to recover memory and keep the system responsive.",
    ],
    kernelPaths: ["mm/vmscan.c", "mm/zswap.c", "mm/swapfile.c", "mm/oom_kill.c"],
    syscalls: ["swapon()", "swapoff()", "madvise(MADV_PAGEOUT)"],
    video: { youtubeId: "pU082OwoDik", title: "Swappiness in Linux Explained" },
  },
  {
    id: "security",
    tag: "3.5",
    title: "Memory Security Mechanics",
    icon: "shield",
    summary:
      "Virtual memory is the foundation of modern exploit mitigations. Address Space Layout Randomization (ASLR) randomizes the base addresses of the stack, heap, libraries, and executable on every run, making it far harder for attackers to predict memory locations. The NX/XD (No-eXecute) bit in page table entries marks data regions like the stack and heap as non-executable, blocking classic buffer-overflow shellcode injection attacks.",
    details: [
      "ASLR randomizes virtual addresses of the stack, heap, mmap base, and PIE executables at process start, controlled via /proc/sys/kernel/randomize_va_space.",
      "Without ASLR, attackers can reliably predict return addresses and gadget locations for Return-Oriented Programming (ROP) attacks.",
      "The NX/XD bit is a flag in the PTE that marks a memory page as non-executable, so even if an attacker injects shellcode into the stack/heap, the CPU refuses to execute it.",
      "Combining ASLR + NX/DEP + stack canaries forms the core of modern Linux exploit mitigation (also enhanced by PIE binaries and RELRO in Ubuntu toolchains).",
      "Ubuntu enables these protections by default system-wide, compiled into binaries via GCC flags (-fstack-protector, -pie, -D_FORTIFY_SOURCE).",
    ],
    kernelPaths: ["mm/mmap.c (arch_mmap_rnd)", "arch/x86/mm/mmap.c", "security/", "arch/x86/include/asm/pgtable_types.h"],
    syscalls: ["personality(ADDR_NO_RANDOMIZE)", "mprotect(PROT_EXEC)"],
    video: { youtubeId: "_PuMQuhInJ8", title: "Understanding ASLR and Its Bypass (Binary Exploitation)" },
  },
];

export interface CliCommand {
  id: string;
  command: string;
  description: string;
  output: string;
}

export const cliCommands: CliCommand[] = [
  {
    id: "meminfo",
    command: "cat /proc/meminfo",
    description: "Dump detailed kernel memory accounting: total/free RAM, cache, swap, and huge page stats.",
    output: `MemTotal:       16220484 kB
MemFree:         2143820 kB
MemAvailable:    9876120 kB
Buffers:          312044 kB
Cached:          6504212 kB
SwapCached:        14300 kB
Active:          7820112 kB
Inactive:        4213300 kB
SwapTotal:       2097148 kB
SwapFree:        1986552 kB
Dirty:              4120 kB
AnonPages:       5120332 kB
Mapped:           623140 kB
Shmem:            184220 kB
Slab:             412660 kB
PageTables:        48220 kB
VmallocTotal:   34359738367 kB
AnonHugePages:   2048000 kB
HugePages_Total:       0
HugePages_Free:        0
Hugepagesize:       2048 kB`,
  },
  {
    id: "pmap",
    command: "pmap -d 4821",
    description: "Show the per-mapping virtual memory layout of process 4821: address, size, permissions, and backing file.",
    output: `4821:   /usr/bin/gnome-shell
Address           Kbytes Mode  Offset           Device    Mapping
0000560a12e00000    1024 r-x-- 0000000000000000 103:02    gnome-shell
0000560a12f10000     128 r---- 0000000000110000 103:02    gnome-shell
0000560a12f30000      64 rw--- 0000000000130000 103:02    gnome-shell
00007f2a4c000000   65536 rw--- 0000000000000000 000:00    [ anon ]
00007f2a50000000    4096 r-x-- 0000000000000000 103:02    libglib-2.0.so.0
00007f2a50400000    2048 rw--- 0000000000000000 000:00    [ anon ]
00007ffee3b00000     132 rw--- 0000000000000000 000:00    [ stack ]
mapped: 72928K    writeable/private: 67328K    shared: 0K`,
  },
  {
    id: "vmstat",
    command: "vmstat 1",
    description: "Live sampling of process, memory, swap, IO, and CPU statistics once per second — great for spotting memory pressure.",
    output: `procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0  110596 2143820 312044 6504212    0    0     2    14  512  980  6  2 91  1  0
 1  0  110596 2098120 312044 6512880    0    0     0    96  601 1104  8  3 88  1  0
 3  1  112204 1987340 312100 6524010   12    4    64   110  733 1320 11  4 82  3  0
 1  0  112204 2041220 312100 6519440    0    0     0    20  548  990  5  2 92  1  0`,
  },
  {
    id: "free",
    command: "free -h",
    description: "Human-readable summary of total, used, free, shared, buffer/cache, and available memory plus swap.",
    output: `               total        used        free      shared  buff/cache   available
Mem:            15Gi       6.1Gi       2.0Gi       180Mi       7.1Gi        9.4Gi
Swap:          2.0Gi       104Mi       1.9Gi`,
  },
  {
    id: "smaps",
    command: "cat /proc/4821/smaps | head -20",
    description: "Granular per-mapping memory stats (RSS, PSS, shared/private clean & dirty pages) for a single process.",
    output: `0000560a12e00000-0000560a12f00000 r-xp 00000000 103:02 gnome-shell
Size:               1024 kB
Rss:                 980 kB
Pss:                 210 kB
Shared_Clean:        980 kB
Shared_Dirty:          0 kB
Private_Clean:         0 kB
Private_Dirty:         0 kB
Referenced:          980 kB
Anonymous:             0 kB
AnonHugePages:         0 kB
Swap:                  0 kB`,
  },
  {
    id: "sysctl",
    command: "sysctl vm.swappiness vm.overcommit_memory",
    description: "Read key virtual-memory kernel tunables controlling swap aggressiveness and memory overcommit policy.",
    output: `vm.swappiness = 60
vm.overcommit_memory = 0`,
  },
];

export interface TriviaFact {
  id: string;
  text: string;
  /** Matches a VmSection id in vmSections — used to show trivia relevant to the card currently on screen. */
  topic: string;
}

export const triviaFacts: TriviaFact[] = [
  { id: "t1", topic: "vm-intro", text: "Did you know? The term 'virtual memory' was coined in the 1950s-60s for the Atlas Computer at the University of Manchester — one of the first systems to implement paging." },
  { id: "t2", topic: "page-faults", text: "Fun fact: A single 'major' page fault that triggers a disk read can be over 100,000 times slower than a plain RAM access." },
  { id: "t3", topic: "swapping-caching", text: "Did you know? Ubuntu's installer, since 22.04, creates a swapfile instead of a dedicated swap partition by default, making resizing swap far easier." },
  { id: "t4", topic: "page-faults", text: "Trivia: fork() doesn't copy memory immediately — thanks to Copy-on-Write, parent and child share identical physical pages until either one writes to them." },
  { id: "t5", topic: "mmu-paging", text: "Did you know? Transparent Huge Pages can reduce TLB misses dramatically by mapping 2 MB instead of 4 KB per entry — 512x fewer table entries for the same memory." },
  { id: "t6", topic: "security", text: "Fun fact: ASLR can randomize the mmap base, stack, heap, and PIE executable base independently, giving attackers far fewer predictable addresses to target." },
  { id: "t7", topic: "swapping-caching", text: "Did you know? The Linux OOM Killer scores every process using a heuristic in oom_score to decide which one to sacrifice first when memory is critically low." },
  { id: "t8", topic: "swapping-caching", text: "Trivia: zswap compresses pages in RAM before (or instead of) writing to a swap device, often achieving 2-3x compression ratios for typical workloads." },
  { id: "t9", topic: "security", text: "Did you know? The NX (No-eXecute) bit is also called XD (eXecute Disable) by Intel and EVP (Enhanced Virus Protection) by AMD — same idea, different marketing names." },
  { id: "t10", topic: "address-space", text: "Fun fact: A 64-bit Linux process has a theoretical virtual address space of up to 128 TB (user space) on x86-64 with 4-level paging — far more than any installed physical RAM." },
  { id: "t11", topic: "vm-intro", text: "Trivia: Before virtual memory existed, programmers manually split large programs into 'overlays' that were swapped in and out of RAM by hand." },
  { id: "t12", topic: "vm-intro", text: "Did you know? IBM's System/370 added hardware virtual memory support in 1972, often credited with making practical multiprogramming mainstream." },
  { id: "t13", topic: "vm-intro", text: "Fun fact: Multics, the 1960s research OS that inspired Unix, pioneered segmented virtual memory — ideas that live on in every modern Linux process today." },
  { id: "t14", topic: "address-space", text: "Did you know? /proc/[pid]/maps lets you inspect the complete live virtual address space layout of any process you have permission to view." },
  { id: "t15", topic: "address-space", text: "Trivia: The unmapped guard page just below the stack exists specifically so a stack overflow crashes safely instead of silently corrupting the heap." },
  { id: "t16", topic: "address-space", text: "Fun fact: Multiple processes running the same shared library (like libc) all map the same physical RAM frames for its code — one copy serves everyone." },
  { id: "t17", topic: "mmu-paging", text: "Did you know? Modern Intel/AMD CPUs support 5-level paging, extending the virtual address space from 48 bits to 57 bits — up to 128 PB." },
  { id: "t18", topic: "mmu-paging", text: "Fun fact: A TLB miss can cost a full page-table walk of up to five sequential memory reads before the actual data access even happens." },
  { id: "t19", topic: "mmu-paging", text: "Trivia: PCID (Process-Context Identifiers) let the CPU tag TLB entries per-process, so a context switch doesn't have to flush the whole TLB." },
  { id: "t20", topic: "page-faults", text: "Did you know? On x86, a page fault is literally CPU interrupt #14 — the processor hands control straight to the kernel's fault handler." },
  { id: "t21", topic: "page-faults", text: "Fun fact: Freshly allocated anonymous memory is often backed by a single shared 'zero page' until you actually write to it — that's lazy allocation in action." },
  { id: "t22", topic: "page-faults", text: "Trivia: You can see a process's exact fault counts — minflt (minor) and majflt (major) — by reading /proc/[pid]/stat." },
  { id: "t23", topic: "swapping-caching", text: "Did you know? vm.swappiness ranges from 0 to 200 on modern kernels (it used to cap at 100), letting you tune swap aggressiveness more finely." },
  { id: "t24", topic: "swapping-caching", text: "Fun fact: Dropping a clean page cache entry is nearly free since the data's already safely on disk, while a dirty anonymous page must be written out first." },
  { id: "t25", topic: "swapping-caching", text: "Trivia: systemd-oomd watches Pressure Stall Information (PSI) to react to memory pressure earlier and more gracefully than the kernel's OOM Killer." },
  { id: "t26", topic: "security", text: "Did you know? KASLR randomizes where the Linux kernel itself loads in memory, not just user-space programs, defending against kernel exploits too." },
  { id: "t27", topic: "security", text: "Fun fact: Stack canaries are random values placed right before a return address; if a buffer overflow overwrites it, the corrupted canary is caught before the function returns." },
  { id: "t28", topic: "security", text: "Trivia: Before NX bits existed, the classic 1990s-2000s buffer-overflow attack worked by injecting and then executing shellcode directly on the stack." },
];
