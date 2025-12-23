import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Activity, GitBranch } from "lucide-react"

export default function ComponentsPage() {
  const components = [
    {
      name: "StatusHoneycomb",
      description: "Dense microservice health visualization with 100+ cells showing instance/pod status",
      category: "Status & Health Visualization",
      href: "/docs/components/status-honeycomb",
      icon: Activity,
      features: ["High Density", "Real-time", "Interactive", "Performant"],
    },
    {
      name: "TraceBreadcrumb",
      description: "Horizontal trace timeline showing request flow through microservices with time spent in each service",
      category: "Tracing",
      href: "/docs/components/trace-breadcrumb",
      icon: GitBranch,
      features: ["Request Flow", "Time Visualization", "Service Mapping", "Status Colors"],
    },
  ]

  return (
    <div
      data-slot="docs"
      className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-[var(--top-spacing)] shrink-0" />
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-6 lg:py-8 dark:text-neutral-300">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                  Components
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs/mcp-server">
                      <ArrowLeft className="size-4" />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs/components/status-honeycomb">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
                Information-First components for operational interfaces. Dense, precise, and functional.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full flex-1 space-y-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold tracking-tight">Component Library</h2>
              <p className="text-base leading-7">
                Ungine UI components are designed for <strong>operational interfaces</strong> - dashboards, 
                admin panels, monitoring tools, and data-heavy applications. Each component prioritizes 
                information density, scanning speed, and functional aesthetics.
              </p>

              <h3 className="text-xl font-semibold tracking-tight mt-6">Philosophy</h3>
              <ul className="space-y-2">
                <li><strong>Information-First</strong>: Maximum data in minimum space</li>
                <li><strong>Operational Focus</strong>: Built for engineers, not marketers</li>
                <li><strong>Performance</strong>: Optimized for 100+ elements</li>
                <li><strong>Copy & Paste</strong>: You own the code</li>
              </ul>
            </div>

            {/* Component Cards */}
            <div className="space-y-4 not-prose">
              {components.map((component) => {
                const Icon = component.icon
                return (
                  <Link
                    key={component.name}
                    href={component.href}
                    className="block group"
                  >
                    <Card className="hover:border-primary/50 transition-all hover:shadow-md">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon className="size-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                {component.name}
                              </CardTitle>
                              <Badge variant="secondary" className="mt-1.5">
                                {component.category}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-base leading-relaxed">
                          {component.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {component.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="font-normal">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Coming Soon */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Coming Soon</h2>
              <p className="text-base leading-7">More operational components are in development:</p>
              <ul className="space-y-2">
                <li><strong>StatusTimeline</strong>: Time-series health visualization</li>
                <li><strong>MetricGrid</strong>: Dense metric display with sparklines</li>
                <li><strong>AlertPanel</strong>: Critical status aggregation</li>
                <li><strong>LogViewer</strong>: High-performance log streaming</li>
                <li><strong>DataTable</strong>: Dense, sortable, filterable tables</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mx-auto hidden h-16 w-full max-w-4xl items-center gap-2 px-4 sm:flex md:px-6">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/mcp-server">
              <ArrowLeft className="size-4" /> MCP Server
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto shadow-none"
            asChild
          >
            <Link href="/docs/components/status-honeycomb">
              StatusHoneycomb <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
