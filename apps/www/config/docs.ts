import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components",
    },
    {
      title: "Blocks",
      href: "/docs/blocks",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      href: "/docs",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "MCP Server",
          href: "/docs/mcp-server",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      href: "/docs/components",
      items: [
        {
          title: "Status & Health",
          href: "/docs/components/status-honeycomb",
          items: [
            {
              title: "StatusHoneycomb",
              href: "/docs/components/status-honeycomb",
              items: [],
            },
            {
              title: "HealthGauge",
              href: "/docs/components/health-gauge",
              items: [],
            },
          ],
        },
        {
          title: "Tracing",
          href: "/docs/components/trace-breadcrumb",
          items: [
            {
              title: "TraceBreadcrumb",
              href: "/docs/components/trace-breadcrumb",
              items: [],
            },
            {
              title: "LatencyFlameCompact",
              href: "/docs/components/latency-flame-compact",
              items: [],
            },
          ],
        },
      ],
    },
  ],
}
