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
]
