import { TableOfContents } from "@/components/docs-toc"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function InstallationPage() {
  const toc = [
    {
      title: "Prerequisites",
      url: "#prerequisites",
    },
    {
      title: "Create Project",
      url: "#create-project",
    },
    {
      title: "Install Dependencies",
      url: "#install-dependencies",
    },
    {
      title: "Configure Tailwind",
      url: "#configure-tailwind",
    },
    {
      title: "Add Components",
      url: "#add-components",
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
                  Installation
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs">
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
                    <Link href="/docs/mcp-server">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                How to install and configure Ungine UI in your project.
              </p>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 id="prerequisites">Prerequisites</h2>
              <p>Before you begin, make sure you have the following installed:</p>
              <ul>
                <li>Node.js 18.17 or later</li>
                <li>A Next.js 14+ project (or React 18+ project)</li>
                <li>Tailwind CSS 3.4 or later</li>
              </ul>

              <h2 id="create-project">Create Project</h2>
              <p>If you don't have a project yet, create a new Next.js project:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>npx create-next-app@latest my-app --typescript --tailwind --app</code>
              </pre>

              <h2 id="install-dependencies">Install Dependencies</h2>
              <p>Install the required dependencies for Ungine UI components:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react`}</code>
              </pre>

              <h3>Configure Path Aliases</h3>
              <p>Add the following to your <code>tsconfig.json</code>:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}</code>
              </pre>

              <h2 id="configure-tailwind">Configure Tailwind CSS</h2>
              <p>Update your <code>tailwind.config.ts</code> file:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... add other colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config`}</code>
              </pre>

              <h3>Add CSS Variables</h3>
              <p>Add the following to your <code>globals.css</code>:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    /* ... add other variables */
  }
  
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... add dark mode variables */
  }
}`}</code>
              </pre>

              <h2 id="add-components">Add Components</h2>
              <p>Create a <code>lib/utils.ts</code> file:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}</code>
              </pre>

              <p>Now you're ready to add components! Copy the component code from the documentation and paste it into your <code>components/ui</code> directory.</p>

              <h3>That's it!</h3>
              <p>You can now start using Ungine UI components in your project. Check out the components section to see what's available.</p>
            </div>
          </div>
        </div>
        <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs">
              <ArrowLeft className="size-4" /> Introduction
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto shadow-none"
            asChild
          >
            <Link href="/docs/mcp-server">
              MCP Server <ArrowRight className="size-4" />
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
