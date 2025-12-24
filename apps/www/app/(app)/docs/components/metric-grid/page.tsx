import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs-toc"
import { ComponentPreview } from "@/components/component-preview"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { InstallationTabs } from "./installation-tabs"

export default function MetricGridPage() {
  const toc = [
    { title: "Installation", url: "#installation" },
    { title: "Usage", url: "#usage" },
    { title: "API Reference", url: "#api" },
  ]

  const pageContent = `# MetricGrid

Tight grid of 50+ mini metrics with values and micro-sparklines for numerical trends in minimal space.

## Installation

\`\`\`bash
npx shadcn@latest add https://ungine.vercel.app/r/metric-grid.json
\`\`\`

## Usage

\`\`\`tsx
import { MetricGrid } from "@/components/ui/metric-grid"

<MetricGrid columns={10} />
\`\`\`
`

  return (
    <div data-slot="docs" className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-[var(--top-spacing)] shrink-0" />
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-6 lg:py-8 dark:text-neutral-300">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                  MetricGrid
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage page={pageContent} url="https://ungine.vercel.app/docs/components/metric-grid" />
                  <Button variant="secondary" size="icon" className="ml-auto size-8 shadow-none md:size-7" asChild>
                    <Link href="/docs/components/health-gauge">
                      <ArrowLeft className="size-4" />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                  <Button variant="secondary" size="icon" className="size-8 shadow-none md:size-7" asChild>
                    <Link href="/docs/components/trace-breadcrumb">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
                Tight grid of 50+ mini metrics with values and micro-sparklines. Monospace alignment with anomaly highlights.
              </p>
            </div>
          </div>

          {/* Preview */}
          <ComponentPreview name="metric-grid-demo" align="start" />

          {/* Documentation */}
          <div className="w-full flex-1 space-y-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h2:text-2xl prose-h2:tracking-tight prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h2 id="installation">Installation</h2>
              <InstallationTabs />

              <h2 id="usage">Usage</h2>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`import { MetricGrid } from "@/components/ui/metric-grid"
import type { Metric } from "@/components/ui/metric-grid"

// With default generated metrics
<MetricGrid columns={10} />

// With custom metrics
const metrics: Metric[] = [
  {
    id: "cpu-01",
    label: "CPU-01",
    value: "85%",
    secondary: "245K",
    sparkline: [30, 45, 38, 52, 48, 55, 62, 58, 70, 75, 82, 85],
    sparkColor: "cyan",
    category: "cpu",
  },
  // ... more metrics
]

<MetricGrid metrics={metrics} columns={8} />`}</code>
                </pre>
              </div>

              <h2 id="api">API Reference</h2>
              <h3>MetricGrid</h3>
            </div>

            {/* API Table */}
            <div className="not-prose overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 sm:p-3 font-semibold whitespace-nowrap">Prop</th>
                      <th className="text-left p-2 sm:p-3 font-semibold whitespace-nowrap">Type</th>
                      <th className="text-left p-2 sm:p-3 font-semibold whitespace-nowrap">Default</th>
                      <th className="text-left p-2 sm:p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>metrics</code></td>
                      <td className="p-2 sm:p-3"><code>Metric[]</code></td>
                      <td className="p-2 sm:p-3"><code>auto-generated</code></td>
                      <td className="p-2 sm:p-3">Array of metric data</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>columns</code></td>
                      <td className="p-2 sm:p-3"><code>number</code></td>
                      <td className="p-2 sm:p-3"><code>10</code></td>
                      <td className="p-2 sm:p-3">Number of columns in the grid</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>className</code></td>
                      <td className="p-2 sm:p-3"><code>string</code></td>
                      <td className="p-2 sm:p-3"><code>-</code></td>
                      <td className="p-2 sm:p-3">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h3>Metric</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`interface Metric {
  id: string
  label: string
  value: string
  secondary: string
  sparkline: number[]
  sparkColor: "cyan" | "amber" | "white" | "emerald"
  alertType?: "high-load" | "latency-spike"
  category: "cpu" | "mem" | "disk"
}`}</code>
                </pre>
              </div>

              <h3>Features</h3>
              <ul className="space-y-1">
                <li><span className="text-cyan-500">Micro-sparklines</span> - Inline trend visualization</li>
                <li><span className="text-amber-500">Alert highlighting</span> - High load and latency spike indicators</li>
                <li><span className="text-foreground">Monospace alignment</span> - Clean numerical display</li>
                <li><span className="text-foreground">Hover effects</span> - Interactive cell highlighting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mx-auto hidden h-16 w-full max-w-4xl items-center gap-2 px-4 sm:flex md:px-6">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/components/health-gauge">
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">HealthGauge</span>
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild className="ml-auto shadow-none">
            <Link href="/docs/components/trace-breadcrumb">
              <span className="hidden sm:inline">TraceBreadcrumb</span> <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Sidebar TOC */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-[var(--top-spacing)] shrink-0" />
        <div className="no-scrollbar overflow-y-auto px-8">
          <TableOfContents toc={toc} />
          <div className="h-12" />
        </div>
      </div>
    </div>
  )
}
