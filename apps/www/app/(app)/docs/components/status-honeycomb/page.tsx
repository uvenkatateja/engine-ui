import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs-toc"
import { ComponentPreview } from "@/components/component-preview"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { InstallationTabs } from "./installation-tabs"

export default function StatusHoneycombPage() {
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
      title: "Examples",
      url: "#examples",
    },
    {
      title: "API Reference",
      url: "#api",
    },
  ]

  const pageContent = `# StatusHoneycomb

Dense microservice health visualization. Monitor 100+ pods/instances in a compact grid.

## Installation

\`\`\`bash
npx shadcn@latest add https://ungine.vercel.app/r/status-honeycomb.json
\`\`\`

## Usage

\`\`\`tsx
import { StatusHoneycomb } from "@/components/ui/status-honeycomb"

const nodes = [
  { id: "pod-1", status: "active", podId: "srv-001", uptime: "5d 12h", latency: 45 },
  { id: "pod-2", status: "warning", podId: "srv-002", uptime: "3d 8h", latency: 280 },
  // ... more nodes
]

export function Monitor() {
  return <StatusHoneycomb nodes={nodes} columns={12} />
}
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
                  StatusHoneycomb
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage 
                    page={pageContent}
                    url="https://ungine.vercel.app/docs/components/status-honeycomb"
                  />
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
                    disabled
                  >
                    <ArrowRight className="size-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
                Dense microservice health visualization. Monitor 100+ pods/instances in a compact grid.
              </p>
            </div>
          </div>

          {/* Preview/Code Tabs */}
          <ComponentPreview
            name="status-honeycomb-demo"
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
                  <code>{`import { StatusHoneycomb } from "@/components/ui/status-honeycomb"

const nodes = [
  { id: "pod-1", status: "active", podId: "srv-001", uptime: "5d 12h", latency: 45 },
  { id: "pod-2", status: "warning", podId: "srv-002", uptime: "3d 8h", latency: 280 },
  { id: "pod-3", status: "critical", podId: "srv-003", uptime: "1d 2h", latency: 520 },
  // ... more nodes
]

export function Monitor() {
  return <StatusHoneycomb nodes={nodes} columns={12} />
}`}</code>
                </pre>
              </div>

              <h2 id="examples">Examples</h2>
              
              <h3>Kubernetes Pod Monitor</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`const [nodes, setNodes] = useState<HoneycombNode[]>([])

useEffect(() => {
  // Fetch pod status
  fetchPodStatus().then(setNodes)
  
  // Real-time updates
  const interval = setInterval(() => {
    fetchPodStatus().then(setNodes)
  }, 5000)
  
  return () => clearInterval(interval)
}, [])

return <StatusHoneycomb nodes={nodes} columns={12} />`}</code>
                </pre>
              </div>

              <h3>Generate Mock Data</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`const generateMockNodes = () => {
  const nodes = []
  for (let i = 0; i < 96; i++) {
    const rand = Math.random()
    let status: "active" | "warning" | "critical" = "active"
    if (rand < 0.1) status = "critical"
    else if (rand < 0.3) status = "warning"
    
    nodes.push({
      id: \`srv-\${String(i).padStart(3, "0")}\`,
      status,
      podId: \`srv-\${772 + i}-\${String.fromCharCode(97 + (i % 26))}\`,
      uptime: \`\${Math.floor(Math.random() * 30)}d \${Math.floor(Math.random() * 24)}h\`,
      latency: status === "critical" ? 450 + Math.random() * 100
        : status === "warning" ? 250 + Math.random() * 100
        : 50 + Math.random() * 50,
    })
  }
  return nodes
}`}</code>
                </pre>
              </div>

              <h2 id="api">API Reference</h2>
              
              <h3>StatusHoneycomb</h3>
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
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">nodes</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">HoneycombNode[]</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Array of node data</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">columns</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">number</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">8</code></td>
                      <td className="p-2 sm:p-3">Number of hexagons per row</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h3:text-xl prose-h3:tracking-tight prose-p:leading-7 prose-li:leading-7">
              <h3>HoneycombNode</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`interface HoneycombNode {
  id: string
  status: "active" | "warning" | "critical"
  podId: string
  uptime: string
  latency: number
}`}</code>
                </pre>
              </div>

              <h3>Status Colors</h3>
              <ul className="space-y-1">
                <li><code className="text-xs sm:text-sm">active</code> - Emerald (#10B981) - Healthy, processing</li>
                <li><code className="text-xs sm:text-sm">warning</code> - Amber (#F59E0B) - High latency</li>
                <li><code className="text-xs sm:text-sm">critical</code> - Red (#EF4444) - OOM killed, degraded</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mx-auto hidden h-16 w-full max-w-4xl items-center gap-2 px-4 sm:flex md:px-6">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/mcp-server">
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">MCP Server</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled
            className="ml-auto shadow-none"
          >
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
