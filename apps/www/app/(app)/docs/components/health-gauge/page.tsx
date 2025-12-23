import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs-toc"
import { ComponentPreview } from "@/components/component-preview"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { InstallationTabs } from "./installation-tabs"

export default function HealthGaugePage() {
  const toc = [
    {
      title: "Installation",
      url: "#installation",
    },
    {
      title: "Usage",
      url: "#usage",
    },
    {
      title: "API Reference",
      url: "#api",
    },
  ]

  const pageContent = `# HealthGauge

Vertical segmented "rack light" gauge for CPU/MEM/Disk/Load with signal glow on thresholds.

## Installation

\`\`\`bash
npx shadcn@latest add https://ungine.vercel.app/r/health-gauge.json
\`\`\`

## Usage

\`\`\`tsx
import { HealthGauge, HealthGaugeInline } from "@/components/ui/health-gauge"

// Standard gauge
<HealthGauge label="CPU" value={88} size="md" />

// Compact inline for tables
<HealthGaugeInline value={75} />
\`\`\`
`

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
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                  HealthGauge
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage 
                    page={pageContent}
                    url="https://ungine.vercel.app/docs/components/health-gauge"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs/components/status-honeycomb">
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
                    <Link href="/docs/components/trace-breadcrumb">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
                Vertical segmented "rack light" gauge for CPU/MEM/Disk/Load. Mimics hardware racks with signal glow on thresholds.
              </p>
            </div>
          </div>

          {/* Preview/Code Tabs */}
          <ComponentPreview
            name="health-gauge-demo"
            align="start"
          />

          {/* Documentation Content */}
          <div className="w-full flex-1 space-y-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h2:text-2xl prose-h2:tracking-tight prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h2 id="installation">Installation</h2>
              
              <InstallationTabs />

              <h2 id="usage">Usage</h2>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`import { HealthGauge, HealthGaugeInline } from "@/components/ui/health-gauge"

// Standard gauge with label
<HealthGauge label="CPU" value={88} size="md" />

// With custom sub-label
<HealthGauge label="MEM" value={45} subLabel="Memory: 45%" size="lg" />

// Compact inline version for table cells
<HealthGaugeInline value={75} />`}</code>
                </pre>
              </div>

              <h2 id="api">API Reference</h2>
              
              <h3>HealthGauge</h3>
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
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">label</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">string</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Label displayed above the gauge</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">value</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">number</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Value from 0-100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">subLabel</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">string</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">-</code></td>
                      <td className="p-2 sm:p-3">Optional label below the gauge</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">segments</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">number</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">20</code></td>
                      <td className="p-2 sm:p-3">Number of segments in the gauge</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">size</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">"sm" | "md" | "lg"</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">"md"</code></td>
                      <td className="p-2 sm:p-3">Size variant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h3>HealthGaugeInline</h3>
            </div>

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
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">value</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">number</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Value from 0-100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">segments</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">number</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">10</code></td>
                      <td className="p-2 sm:p-3">Number of segments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h3>Color Thresholds</h3>
              <ul className="space-y-1">
                <li><span className="text-green-500">Green</span> - 0-40% (Healthy)</li>
                <li><span className="text-yellow-500">Yellow</span> - 40-60% (Warning)</li>
                <li><span className="text-orange-500">Orange</span> - 60-80% (High)</li>
                <li><span className="text-red-500">Red</span> - 80-100% (Critical)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mx-auto hidden h-16 w-full max-w-4xl items-center gap-2 px-4 sm:flex md:px-6">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/components/status-honeycomb">
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">StatusHoneycomb</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto shadow-none"
            asChild
          >
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
