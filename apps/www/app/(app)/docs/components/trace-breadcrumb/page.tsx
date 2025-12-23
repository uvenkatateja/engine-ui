import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TableOfContents } from "@/components/docs-toc"
import { ComponentPreview } from "@/components/component-preview"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { InstallationTabs } from "./installation-tabs"

export default function TraceBreadcrumbPage() {
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

  const pageContent = `# TraceBreadcrumb

Horizontal trace timeline showing request flow through microservices with time spent in each service.

## Installation

\`\`\`bash
npx shadcn@latest add https://ungine.vercel.app/r/trace-breadcrumb.json
\`\`\`

## Usage

\`\`\`tsx
import { TraceBreadcrumb } from "@/components/ui/trace-breadcrumb"

const spans = [
  { id: "span-1", service: "API Gateway", duration: 3 },
  { id: "span-2", service: "Auth Service", duration: 12, status: "success" },
  { id: "span-3", service: "User DB", duration: 45 },
  { id: "span-4", service: "Order Service", duration: 89, status: "warning" },
  { id: "span-5", service: "Redis Cache", duration: 2, status: "success" },
]

export function RequestTrace() {
  return <TraceBreadcrumb requestId="trace-8f4e2a1b-c9d3-4e5f" spans={spans} />
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
                  TraceBreadcrumb
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage 
                    page={pageContent}
                    url="https://ungine.vercel.app/docs/components/trace-breadcrumb"
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
                    <Link href="/docs/components/latency-flame-compact">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed">
                Horizontal trace timeline showing request flow through microservices with time spent in each service.
              </p>
            </div>
          </div>

          {/* Preview/Code Tabs */}
          <ComponentPreview
            name="trace-breadcrumb-demo"
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
                  <code>{`import { TraceBreadcrumb } from "@/components/ui/trace-breadcrumb"

const spans = [
  { id: "span-1", service: "API Gateway", duration: 3 },
  { id: "span-2", service: "Auth Service", duration: 12, status: "success" },
  { id: "span-3", service: "User DB", duration: 45 },
  { id: "span-4", service: "Order Service", duration: 89, status: "warning" },
  { id: "span-5", service: "Redis Cache", duration: 2, status: "success" },
]

export function RequestTrace() {
  return <TraceBreadcrumb requestId="trace-8f4e2a1b-c9d3-4e5f" spans={spans} />
}`}</code>
                </pre>
              </div>

              <h2 id="examples">Examples</h2>
              
              <h3>E-Commerce Checkout Flow</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`const checkoutSpans = [
  { id: "1", service: "API Gateway", duration: 3 },
  { id: "2", service: "Auth Service", duration: 12, status: "success" },
  { id: "3", service: "Cart Service", duration: 28 },
  { id: "4", service: "Payment Gateway", duration: 234, status: "success" },
  { id: "5", service: "Order Service", duration: 67 },
]

<TraceBreadcrumb requestId="checkout-a1b2c3d4-e5f6" spans={checkoutSpans} />`}</code>
                </pre>
              </div>

              <h3>Slow Database Query</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`const slowQuerySpans = [
  { id: "1", service: "GraphQL", duration: 5 },
  { id: "2", service: "User Resolver", duration: 8 },
  { id: "3", service: "PostgreSQL", duration: 1250, status: "warning" },
  { id: "4", service: "Redis Cache", duration: 2, status: "success" },
]

<TraceBreadcrumb requestId="query-7f8e9d0c-b1a2" spans={slowQuerySpans} />`}</code>
                </pre>
              </div>

              <h3>Failed External API Call</h3>
              <div className="not-prose">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{`const errorSpans = [
  { id: "1", service: "Load Balancer", duration: 1 },
  { id: "2", service: "API Server", duration: 12 },
  { id: "3", service: "Auth Middleware", duration: 45, status: "success" },
  { id: "4", service: "External API", duration: 5000, status: "error" },
]

<TraceBreadcrumb requestId="error-x9y8z7w6-v5u4" spans={errorSpans} />`}</code>
                </pre>
              </div>

              <h2 id="api">API Reference</h2>
              
              <h3>TraceBreadcrumb</h3>
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
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">requestId</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">string</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Unique identifier for the request</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">spans</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">TraceSpan[]</code></td>
                      <td className="p-2 sm:p-3"><span className="text-red-500 whitespace-nowrap">required</span></td>
                      <td className="p-2 sm:p-3">Array of trace spans</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">className</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">string</code></td>
                      <td className="p-2 sm:p-3"><code className="whitespace-nowrap">-</code></td>
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
  service: string
  duration: number // in milliseconds
  status?: "success" | "warning" | "error"
}`}</code>
                </pre>
              </div>

              <h3>Status Colors</h3>
              <ul className="space-y-1">
                <li><code className="text-xs sm:text-sm">success</code> - Emerald (#10B981) - Healthy, fast response</li>
                <li><code className="text-xs sm:text-sm">warning</code> - Amber (#F59E0B) - Slow response, high latency</li>
                <li><code className="text-xs sm:text-sm">error</code> - Red (#EF4444) - Failed, timeout</li>
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
            asChild
            className="ml-auto shadow-none"
          >
            <Link href="/docs/components/latency-flame-compact">
              <span className="hidden sm:inline">LatencyFlameCompact</span> <ArrowRight className="size-4" />
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
