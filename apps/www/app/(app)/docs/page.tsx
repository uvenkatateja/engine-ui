import { TableOfContents } from "@/components/docs-toc"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function DocsPage() {
  const toc = [
    {
      title: "Overview",
      url: "#overview",
    },
    {
      title: "Features",
      url: "#features",
    },
    {
      title: "Philosophy",
      url: "#philosophy",
    },
    {
      title: "FAQ",
      url: "#faq",
    },
  ]

  return (
    <div
      data-slot="docs"
      className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-[var(--top-spacing)] shrink-0" />
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-4 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  Introduction
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto size-8 shadow-none md:size-7"
                    disabled
                  >
                    <ArrowLeft className="size-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs/installation">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                Information-First components for operational interfaces. Dense, precise, and functional.
              </p>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 id="overview">Overview</h2>
              <p>
                Engine UI is a specialized shadcn/ui registry built for <strong>Information-First</strong> development. 
                While traditional libraries focus on Marketing UI (spacious, soft, and aesthetic), Engine UI is 
                built for <strong>Operational UI</strong> (dense, precise, and functional).
              </p>
              <p>
                Think of it as the Grafana philosophy brought into the shadcn workflow. It fills the gap between 
                "Beautiful React Components" and "Hardcore Infrastructure Tools." You get the developer experience 
                of shadcn with components designed for dashboards, admin panels, monitoring tools, and data-heavy applications.
              </p>

              <h2 id="features">Features</h2>
              <ul>
                <li><strong>Information-Dense</strong> - Optimized for displaying maximum data without clutter</li>
                <li><strong>Operational Focus</strong> - Built for dashboards, admin panels, and monitoring tools</li>
                <li><strong>Precision Design</strong> - Tight spacing, clear hierarchy, functional aesthetics</li>
                <li><strong>Copy & Paste</strong> - No package to install, you own the code</li>
                <li><strong>TypeScript</strong> - Full type safety with excellent DX</li>
                <li><strong>Accessible</strong> - Built on Radix UI primitives</li>
                <li><strong>Dark Mode First</strong> - Designed for long monitoring sessions</li>
                <li><strong>MCP Integration</strong> - AI-assisted component installation</li>
              </ul>

              <h2 id="philosophy">Philosophy</h2>
              <p>
                <strong>Information-First, Not Marketing-First.</strong> Most component libraries are designed for 
                landing pages and marketing sites. Engine UI is designed for the interfaces you use every day: 
                monitoring dashboards, admin panels, data tables, and operational tools.
              </p>
              <p>
                We believe operational interfaces should be dense but not cluttered, functional but not ugly, 
                and powerful but not overwhelming. Every component is optimized for information density, 
                scanning speed, and operational efficiency.
              </p>
              <p>
                Like shadcn/ui, you copy components into your project. Unlike shadcn/ui, these components are 
                designed for engineers building tools, not marketers building landing pages.
              </p>

              <h2 id="faq">FAQ</h2>
              <h3>How is this different from shadcn/ui?</h3>
              <p>
                shadcn/ui is perfect for marketing sites and consumer apps. Engine UI is optimized for 
                operational interfaces: dashboards, admin panels, monitoring tools, and data-heavy applications. 
                We use the same workflow (copy & paste) but with components designed for information density 
                and functional aesthetics.
              </p>

              <h3>Why "Information-First"?</h3>
              <p>
                Most UI libraries prioritize aesthetics and spaciousness. That's great for landing pages, 
                but terrible for dashboards where you need to see 50 metrics at once. Information-First means 
                optimizing for data density, scanning speed, and operational efficiency without sacrificing usability.
              </p>

              <h3>Can I use this with shadcn/ui?</h3>
              <p>
                Absolutely! Engine UI components are compatible with shadcn/ui. Use shadcn for your marketing 
                pages and Engine UI for your dashboard. They share the same foundation (Radix UI + Tailwind CSS) 
                and can coexist in the same project.
              </p>

              <h3>Do I need to credit Engine UI?</h3>
              <p>
                No attribution required. The code is yours. However, we'd appreciate a star on GitHub if you 
                find it useful!
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
          <Button
            variant="secondary"
            size="sm"
            disabled
            className="shadow-none"
          >
            <ArrowLeft className="size-4" /> Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto shadow-none"
            asChild
          >
            <Link href="/docs/installation">
              Installation <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
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
