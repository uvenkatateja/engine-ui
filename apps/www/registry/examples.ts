import type { Registry } from "./schema"

export const examples: Registry["items"] = [
  {
    name: "status-honeycomb-demo",
    type: "registry:example",
    description:
      "Demo showcasing StatusHoneycomb with microservice health monitoring",
    registryDependencies: ["status-honeycomb"],
    files: [
      {
        path: "registry/default/example/status-honeycomb-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "trace-breadcrumb-demo",
    type: "registry:example",
    description:
      "Demo showcasing TraceBreadcrumb with multiple trace scenarios",
    registryDependencies: ["trace-breadcrumb"],
    files: [
      {
        path: "registry/default/example/trace-breadcrumb-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "latency-flame-compact-demo",
    type: "registry:example",
    description:
      "Demo showcasing LatencyFlameCompact with nested trace spans",
    registryDependencies: ["latency-flame-compact"],
    files: [
      {
        path: "registry/default/example/latency-flame-compact-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "health-gauge-demo",
    type: "registry:example",
    description:
      "Demo showcasing HealthGauge with server metrics and table integration",
    registryDependencies: ["health-gauge"],
    files: [
      {
        path: "registry/default/example/health-gauge-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
