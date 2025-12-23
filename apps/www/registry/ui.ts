import type { Registry } from "./schema"

export const ui: Registry["items"] = [
  {
    name: "status-honeycomb",
    type: "registry:ui",
    description:
      "Dense microservice health visualization with 100+ cells showing instance/pod status in a compact honeycomb grid",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/default/ui/status-honeycomb.tsx",
        type: "registry:ui",
      },
    ],
    category: "Status & Health Visualization",
    subcategory: "Monitoring",
  },
  {
    name: "trace-breadcrumb",
    type: "registry:ui",
    description:
      "Horizontal trace timeline showing request flow through microservices with time spent in each service",
    dependencies: [],
    files: [
      {
        path: "registry/default/ui/trace-breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
    category: "Tracing & Observability",
    subcategory: "Distributed Tracing",
  },
  {
    name: "latency-flame-compact",
    type: "registry:ui",
    description:
      "Horizontal flame graph strip for trace spans with stacked bars by duration and depth coloring",
    dependencies: [],
    files: [
      {
        path: "registry/default/ui/latency-flame-compact.tsx",
        type: "registry:ui",
      },
    ],
    category: "Tracing & Observability",
    subcategory: "Flame Graphs",
  },
  {
    name: "health-gauge",
    type: "registry:ui",
    description:
      "Vertical segmented rack light gauge for CPU/MEM/Disk/Load with signal glow on thresholds",
    dependencies: [],
    files: [
      {
        path: "registry/default/ui/health-gauge.tsx",
        type: "registry:ui",
      },
    ],
    category: "Status & Health Visualization",
    subcategory: "Monitoring",
  },
]
