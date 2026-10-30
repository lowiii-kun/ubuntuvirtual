export interface OSType {
  id: string;
  name: string;
  description: string;
  features: string[];
  example: string;
  icon: string;
}

export const osTypes: OSType[] = [
  {
    id: "batch",
    name: "Batch Operating System",
    description:
      "Groups similar jobs into batches and executes them sequentially without manual intervention between jobs. An operator loads jobs onto a medium, and a batch monitor automatically runs them one after another. This maximizes throughput for repetitive, non-interactive workloads but offers no real-time feedback to users.",
    features: [
      "Jobs with similar needs are grouped and processed together",
      "No direct interaction between user and the running job",
      "Uses a resident monitor / scheduler to sequence jobs",
      "High CPU utilization for repetitive tasks, but higher turnaround time",
    ],
    example: "Payroll processing systems and old mainframe punch-card systems (e.g., IBM 1401).",
    icon: "stack",
  },
  {
    id: "multiprogramming",
    name: "Multiprogramming Operating System",
    description:
      "Keeps several jobs in main memory at once so the CPU always has a job to execute, switching to another job whenever the current one performs I/O. This overlapping of computation and I/O dramatically increases CPU utilization compared to batch systems. The OS must track multiple programs and manage memory allocation among them.",
    features: [
      "Multiple programs reside in memory simultaneously",
      "CPU scheduler picks a ready job when another blocks on I/O",
      "Improves CPU utilization and system throughput",
      "Requires memory protection between concurrent jobs",
    ],
    example: "Early IBM OS/360 MFT/MVT mainframe systems.",
    icon: "layers",
  },
  {
    id: "multitasking",
    name: "Multitasking Operating System",
    description:
      "Extends multiprogramming by rapidly time-slicing the CPU across tasks, giving the illusion that many applications run simultaneously. A scheduler preempts running tasks at fine-grained intervals so the user perceives smooth concurrent execution. This is the model used by virtually all modern desktop and laptop operating systems.",
    features: [
      "Time-slicing (time quantum) for apparent parallel execution",
      "Preemptive scheduling with context switching",
      "Supports interactive, responsive multitasking for users",
      "Needs strong memory & process isolation",
    ],
    example: "Ubuntu Desktop running a browser, terminal, and music player at once.",
    icon: "grid",
  },
  {
    id: "multiprocessing",
    name: "Multiprocessing Operating System",
    description:
      "Utilizes two or more physical CPUs/cores within a single system to execute multiple processes truly in parallel, not just interleaved. This increases reliability (if one processor fails, others continue) and throughput. The OS must coordinate shared memory, cache coherence, and load balancing across processors.",
    features: [
      "Two or more CPUs share memory and I/O devices",
      "True parallel execution of processes/threads",
      "Symmetric (SMP) or Asymmetric multiprocessing models",
      "Higher reliability through redundancy",
    ],
    example: "Modern Ubuntu Server running on multi-core/multi-socket hardware for data centers.",
    icon: "cpu",
  },
  {
    id: "time-sharing",
    name: "Time-Sharing Operating System",
    description:
      "A logical extension of multiprogramming that allows many users to interact with a single computer system concurrently by giving each a small time slice of CPU time. The rapid switching creates the illusion that each user has their own dedicated machine. Response time is a critical design goal.",
    features: [
      "Multiple users share one system via terminals/sessions",
      "Round-robin style CPU scheduling with short quantums",
      "Fast context switching to maintain low response time",
      "Supports concurrent interactive sessions securely",
    ],
    example: "Ubuntu Server accessed by many users simultaneously via SSH sessions.",
    icon: "users",
  },
  {
    id: "real-time",
    name: "Real-Time Operating System (RTOS)",
    description:
      "Guarantees that tasks are completed within strict, predictable time deadlines, prioritizing determinism over raw throughput. Hard real-time systems must never miss a deadline, while soft real-time systems tolerate occasional delays. These systems are vital for control and safety-critical applications.",
    features: [
      "Deterministic, deadline-driven task scheduling",
      "Hard RTOS (zero tolerance for missed deadlines) vs Soft RTOS",
      "Minimal interrupt latency and predictable response time",
      "Often used with specialized kernels (e.g., PREEMPT_RT patched Linux)",
    ],
    example: "Flight control systems, anti-lock braking systems (ABS), and industrial robotics controllers.",
    icon: "clock",
  },
  {
    id: "distributed",
    name: "Distributed Operating System",
    description:
      "Manages a collection of independent, networked computers and presents them to users as a single coherent system. Resources, processing, and storage are distributed across multiple physical machines, which communicate via message passing. This improves scalability, fault tolerance, and resource sharing across geographic locations.",
    features: [
      "Multiple autonomous computers appear as one unified system",
      "Resource and workload sharing across nodes via a network",
      "High fault tolerance and horizontal scalability",
      "Relies on network transparency and distributed coordination",
    ],
    example: "Google's internal cluster OS layers and large Kubernetes-managed Ubuntu server fleets.",
    icon: "network",
  },
  {
    id: "network",
    name: "Network Operating System (NOS)",
    description:
      "Runs on a server and provides management for data, users, groups, security, applications, and other networking functions over a local area network. Unlike distributed OSes, each machine retains its own autonomy and OS, while the NOS layer provides shared services like file sharing, printing, and authentication.",
    features: [
      "Centralized administration of users, security, and resources",
      "Provides file, print, and application sharing services",
      "Each connected machine keeps its own local autonomy",
      "Focused on connectivity, access control, and network services",
    ],
    example: "Ubuntu Server configured with Samba/NFS file sharing and centralized authentication (LDAP).",
    icon: "server",
  },
  {
    id: "embedded",
    name: "Embedded Operating System",
    description:
      "A specialized, lightweight OS designed to run on dedicated hardware with constrained resources (limited RAM/CPU), built into a larger device to perform a specific function. It typically boots directly into a single application and prioritizes efficiency, reliability, and a small footprint over general-purpose flexibility.",
    features: [
      "Minimal footprint tailored to fixed hardware & purpose",
      "Often boots directly into one dedicated application",
      "Optimized for low power consumption and reliability",
      "May include real-time guarantees depending on use case",
    ],
    example: "Ubuntu Core running IoT devices, smart appliances, and digital signage.",
    icon: "chip",
  },
  {
    id: "mobile",
    name: "Mobile Operating System",
    description:
      "Designed specifically for smartphones, tablets, and other handheld devices, balancing touch-based interaction, power efficiency, sensor integration, and app sandboxing. These systems manage constrained battery and memory resources while supporting rich multitasking and app ecosystems through curated app stores.",
    features: [
      "Touch-first UI with sensor and connectivity integration",
      "Aggressive power and background-process management",
      "Sandboxed app model for security and privacy",
      "App-store distribution and OTA update mechanisms",
    ],
    example: "Android (Linux-kernel based, conceptually related to Ubuntu) and iOS on smartphones.",
    icon: "mobile",
  },
];
