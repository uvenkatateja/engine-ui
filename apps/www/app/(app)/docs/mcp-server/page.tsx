import { TableOfContents } from "@/components/docs-toc"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function MCPServerPage() {
  const toc = [
    {
      title: "What is MCP?",
      url: "#what-is-mcp",
    },
    {
      title: "Installation",
      url: "#installation",
    },
    {
      title: "Configuration",
      url: "#configuration",
    },
    {
      title: "Usage",
      url: "#usage",
    },
    {
      title: "Available Tools",
      url: "#available-tools",
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
                  MCP Server
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href="/docs/installation">
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
                    <Link href="/docs/components">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">Next</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                Use Engine UI components with AI assistants via Model Context Protocol.
              </p>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 id="what-is-mcp">What is MCP?</h2>
              <p>
                The Model Context Protocol (MCP) is an open protocol that enables AI assistants to 
                interact with external tools and data sources. Engine UI provides an MCP server that 
                allows AI assistants to browse, search, and add components to your project.
              </p>

              <h2 id="installation">Installation</h2>
              <p>Install the Engine UI MCP server globally:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>npm install -g @engine-ui/mcp-server</code>
              </pre>

              <p>Or use it with npx:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>npx @engine-ui/mcp-server</code>
              </pre>

              <h2 id="configuration">Configuration</h2>
              <p>Add the MCP server to your AI assistant's configuration. For Claude Desktop, add this to your <code>claude_desktop_config.json</code>:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "mcpServers": {
    "engine-ui": {
      "command": "npx",
      "args": ["-y", "@engine-ui/mcp-server"]
    }
  }
}`}</code>
              </pre>

              <h3>For Cline (VS Code)</h3>
              <p>Add to your Cline MCP settings:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "mcpServers": {
    "engine-ui": {
      "command": "npx",
      "args": ["-y", "@engine-ui/mcp-server"],
      "disabled": false
    }
  }
}`}</code>
              </pre>

              <h2 id="usage">Usage</h2>
              <p>Once configured, you can ask your AI assistant to:</p>
              <ul>
                <li>Browse available Engine UI components</li>
                <li>Search for specific components</li>
                <li>Add components to your project</li>
                <li>Get component documentation</li>
                <li>View component examples</li>
              </ul>

              <h3>Example Prompts</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`"Show me all available Engine UI components"
"Add the Button component to my project"
"Search for card components in Engine UI"
"How do I use the Dialog component?"`}</code>
              </pre>

              <h2 id="available-tools">Available Tools</h2>
              <p>The MCP server provides the following tools:</p>
              
              <h3>list_components</h3>
              <p>Lists all available components in the Engine UI library.</p>

              <h3>search_components</h3>
              <p>Searches for components by name or description.</p>

              <h3>get_component</h3>
              <p>Gets the full code and documentation for a specific component.</p>

              <h3>add_component</h3>
              <p>Adds a component to your project's <code>components/ui</code> directory.</p>

              <h3>get_component_examples</h3>
              <p>Gets usage examples for a specific component.</p>

              <div className="mt-8 p-4 border border-border rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
                <p className="text-sm text-muted-foreground">
                  The MCP server automatically handles dependencies and ensures components are 
                  added with the correct imports and configurations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
          <Button variant="secondary" size="sm" asChild className="shadow-none">
            <Link href="/docs/installation">
              <ArrowLeft className="size-4" /> Installation
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto shadow-none"
            asChild
          >
            <Link href="/docs/components">
              Components <ArrowRight className="size-4" />
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
