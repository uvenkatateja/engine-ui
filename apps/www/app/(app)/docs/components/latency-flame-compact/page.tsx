import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs-toc"
import { ComponentPreview } from "@/components/component-preview"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { InstallationTabs } from "./installation-tabs"

export default function LatencyFlameCompactPage() {
  const toc = [
    { title: "Installation", url: "#installation" },
    { title: "Usage", url: "#usage" },
    { title: "Examples", url: "#examples" },
    { title: "API Reference", url: "#api" },
  ]

  const pageContent = `# LatencyFlameCompact

Horizontal flame graph strip for trace spans with stacked bars by duration and depth coloring.

## Installation

\`\`\`bash
npx shadcn@latest add https://ungine.vercel.app/r/latency-flame-compact.json
\`\`\`

## Usage

\`\`\`tsx
import { LatencyFlameCompact } from "@/components/ui/latency-flame-compact"
import type { TraceSpan } from "@/components/ui/latency-flame-compact"

const spans: TraceSpan[] = [
  {
    id: "1",
    name: "Processing",
    startTime: 0,
    duration: 180,
    depth: 0,
    children: [
      { id: "1a", name: "Cache Read", startTime: 5, duration: 45, depth: 1 },
    ],
  },
]

export function TraceFlame() {
  return <LatencyFlameCompact traceId="#XY77-45GH" spans={spans} totalDuration={450} />
}
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
                  LatencyFlameCompact
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage page={pageContent} url="https://ungine.vercel.app/docs/components/latency-flame-compact" />
                  <Button variant="secondary" size="icon" className="ml-auto size-8 shadow-none md:size-7" asChild>
                    <Link href="/docs/components/trace-breadcrumb">
                      <ArrowLeft className="size-4" />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                  <Button variant="secondary" size="icon" className="size-8 shadow-none md:size-7" disabled>
                    <ArrowRight className="size-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
                Horizontal flame graph strip for trace spans. Simplified flame for quick span scanning with stacked bars by duration and depth coloring.
              </p>
            </div>
          </div>

          {/* Preview */}
          <ComponentPreview name="latency-flame-compact-demo" align="start" />

          {/* Documentation */}
          <div className="w-full flex-1 space-y-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h2:text-2xl prose-h2:tracking-tight prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h2 id="installation">Installation</h2>
              <InstallationTabs />

              <h2 id="usage">Usage</h2>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`import { LatencyFlameCompact } from "@/components/ui/latency-flame-compact"
import type { TraceSpan } from "@/components/ui/latency-flame-compact"

const spans: TraceSpan[] = [
  {
    id: "1",
    name: "Processing",
    startTime: 0,
    duration: 180,
    depth: 0,
    children: [
      { id: "1a", name: "Cache Read", startTime: 5, duration: 45, depth: 1 },
      { id: "1b", name: "Auth", startTime: 55, duration: 35, depth: 1 },
    ],
  },
]

export function TraceFlame() {
  return (
    <LatencyFlameCompact
      traceId="#XY77-45GH"
      spans={spans}
      totalDuration={450}
      showSparkline
    />
  )
}`}</code>
                </pre>
              </div>

              <h2 id="examples">Examples</h2>

              <h3>With Sparkline</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`<LatencyFlameCompact
  traceId="#XY77-45GH"
  spans={spans}
  totalDuration={450}
  showSparkline
/>`}</code>
                </pre>
              </div>

              <h3>Minimal View (No Sparkline)</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`<LatencyFlameCompact
  traceId="#AB12-89KL"
  spans={spans}
  totalDuration={280}
  showSparkline={false}
/>`}</code>
                </pre>
              </div>

              <h2 id="api">API Reference</h2>
              <h3>LatencyFlameCompact</h3>
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
                      <td className="p-2 sm:p-3"><code>traceId</code></td>
                      <td className="p-2 sm:p-3"><code>string</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500">required</span></td>
                      <td className="p-2 sm:p-3">Unique identifier for the trace</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>spans</code></td>
                      <td className="p-2 sm:p-3"><code>TraceSpan[]</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500">required</span></td>
                      <td className="p-2 sm:p-3">Array of trace spans with nested children</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>totalDuration</code></td>
                      <td className="p-2 sm:p-3"><code>number</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500">required</span></td>
                      <td className="p-2 sm:p-3">Total duration of the trace in ms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code>showSparkline</code></td>
                      <td className="p-2 sm:p-3"><code>boolean</code></td>
                      <td className="p-2 sm:p-3"><code>true</code></td>
                      <td className="p-2 sm:p-3">Show activity sparkline above flame graph</td>
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
              <h3>TraceSpan</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`interface TraceSpan {
  id: string
  name: string
  startTime: number  // ms from trace start
  duration: number   // ms
  depth: number      // nesting level (0 = root)
  children?: TraceSpan[]
}`}</code>
                </pre>
              </div>

              <h3>Depth Colors</h3>
              <ul className="space-y-1">
                <li><code>D0</code> - Green (#4ade80) - Root spans</li>
                <li><code>D1</code> - Yellow (#facc15) - First level children</li>
                <li><code>D2</code> - Orange (#fb923c) - Second level</li>
                <li><code>D3</code> - Red (#f87171) - Third level</li>
                <li><code>D4+</code> - Deep Red (#ef4444) - Deeper nesting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mx-auto hidden h-16 w-full max-w-4xl items-center gap-2 px-4 sm:flex md:px-6">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/components/trace-breadcrumb">
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">TraceBreadcrumb</span>
            </Link>
          </Button>
          <Button variant="secondary" size="sm" disabled className="ml-auto shadow-none">
            <span className="hidden sm:inline">Next</span> <ArrowRight className="size-4" />
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
