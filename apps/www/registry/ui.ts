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
]
