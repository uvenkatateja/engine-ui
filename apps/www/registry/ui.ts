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
]
