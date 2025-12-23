"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CopyButton } from "@/components/copy-button"

const componentCode = `"use client"

import { cn } from "@/lib/utils"

interface TraceSpan {
  id: string
  service: string
  duration: number // in milliseconds
  status?: "success" | "warning" | "error"
}

interface TraceBreadcrumbProps {
  requestId: string
  spans: TraceSpan[]
  className?: string
}

const statusConfig: Record<string, { bg: string; border: string; dot: string }> = {
  success: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  error: { bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
}

const serviceConfig = [
  { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", text: "text-blue-700" },
  { bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500", text: "text-violet-700" },
  { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", text: "text-emerald-700" },
  { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", text: "text-amber-700" },
  { bg: "bg-rose-50", border: "border-rose-200", dot: "bg-rose-500", text: "text-rose-700" },
  { bg: "bg-cyan-50", border: "border-cyan-200", dot: "bg-cyan-500", text: "text-cyan-700" },
]

function formatDuration(ms: number): string {
  if (ms < 1) return "<1ms"
  if (ms >= 1000) return \`\${(ms / 1000).toFixed(2)}s\`
  return \`\${ms}ms\`
}

export function TraceBreadcrumb({ requestId, spans, className }: TraceBreadcrumbProps) {
  const totalDuration = spans.reduce((sum, span) => sum + span.duration, 0)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-zinc-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span>Trace</span>
          </div>
          <code className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-mono truncate max-w-[180px] sm:max-w-none">
            {requestId}
          </code>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-400">{spans.length} spans</span>
          <span className="font-medium text-zinc-700">{formatDuration(totalDuration)}</span>
        </div>
      </div>

      <div className="relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 sm:p-4">
        <div className="hidden sm:block absolute left-4 right-4 top-1/2 h-0.5 bg-zinc-200 -translate-y-1/2" />
        <div className="sm:hidden absolute left-6 top-4 bottom-16 w-0.5 bg-zinc-200" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-2 sm:flex-wrap py-2">
          {spans.map((span, index) => {
            const colorIndex = index % serviceConfig.length
            const config = span.status 
              ? { ...statusConfig[span.status], text: span.status === "error" ? "text-red-700" : span.status === "warning" ? "text-amber-700" : "text-emerald-700" }
              : serviceConfig[colorIndex]
            const proportion = span.duration / totalDuration

            return (
              <div key={span.id} className="flex items-center sm:flex-row">
                <div
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ml-4 sm:ml-0",
                    "hover:shadow-md hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto",
                    config.bg, config.border
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full shrink-0", config.dot)} />
                  <div className="flex flex-col min-w-0 flex-1 sm:flex-initial">
                    <span className={cn("text-xs font-medium", config.text)}>{span.service}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{formatDuration(span.duration)}</span>
                  </div>
                  <span className="sm:hidden text-[10px] text-zinc-400 font-mono">{Math.round(proportion * 100)}%</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg overflow-hidden bg-black/5">
                    <div className={cn("h-full", config.dot)} style={{ width: \`\${Math.min(100, proportion * 100 * 3)}%\` }} />
                  </div>
                </div>
                {index < spans.length - 1 && (
                  <div className="hidden sm:flex items-center mx-1">
                    <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex justify-between mt-3 pt-2 border-t border-zinc-200 text-[10px] text-zinc-400 font-mono">
          <span>0ms</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
    </div>
  )
}

export type { TraceSpan, TraceBreadcrumbProps }
`

function ManualInstallation() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Copy and paste the following code into your project.
        </p>
        <div className="relative group">
          <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm pr-12 max-h-96">
            <code>{componentCode}</code>
          </pre>
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton value={componentCode} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Update the import paths to match your project setup.
        </p>
      </div>
    </div>
  )
}

export function InstallationTabs() {
  const [config, setConfig] = useConfig()
  const installationType = config.installationType || "cli"

  return (
    <div className="space-y-4">
      {/* CLI / Manual Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setConfig({ ...config, installationType: "cli" })}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            installationType === "cli"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          CLI
          {installationType === "cli" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
          )}
        </button>
        <button
          onClick={() => setConfig({ ...config, installationType: "manual" })}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            installationType === "manual"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Manual
          {installationType === "manual" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
          )}
        </button>
      </div>

      {installationType === "cli" ? (
        <CodeBlockCommand
          __pnpm__="pnpm dlx shadcn@latest add https://ungine.vercel.app/r/trace-breadcrumb.json"
          __npm__="npx shadcn@latest add https://ungine.vercel.app/r/trace-breadcrumb.json"
          __yarn__="npx shadcn@latest add https://ungine.vercel.app/r/trace-breadcrumb.json"
          __bun__="bunx --bun shadcn@latest add https://ungine.vercel.app/r/trace-breadcrumb.json"
        />
      ) : (
        <ManualInstallation />
      )}
    </div>
  )
}
