import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { PageActions, PageHeader } from "@/components/page-header"

export default function IndexPage() {
  return (
    <div className="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
      <div className="container relative py-12 md:pt-0">
        <PageHeader>
          {/* Hero Title */}
          <div className="py-2">
            <h1 className="text-center text-3xl font-semibold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Build operational interfaces.
              <br className="hidden sm:inline" />
              Not marketing pages.
            </h1>
          </div>

          {/* Hero Description */}
          <div className="mx-auto max-w-3xl space-y-6 md:space-y-8">
            <p className="text-center text-lg leading-relaxed text-foreground md:text-xl">
              Information-First components for dashboards, admin panels, and monitoring tools. 
              Dense, precise, and functional. Built with Radix UI and Tailwind CSS.
            </p>
          </div>

          {/* CTA Buttons */}
          <PageActions>
            <Link
              href="/docs"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-xl transition-all"
              )}
            >
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl transition-all hover:bg-muted/50"
              )}
            >
              GitHub
            </Link>
          </PageActions>
        </PageHeader>

        <section className="w-full space-y-4 md:block">
          {/* Content sections will go here */}
          <div className="mx-auto w-full max-w-4xl">
            {/* Placeholder for components */}
          </div>
        </section>
      </div>
    </div>
  )
}
