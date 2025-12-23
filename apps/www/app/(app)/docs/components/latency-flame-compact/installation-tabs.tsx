"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CopyButton } from "@/components/copy-button"

const componentCode = `"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface TraceSpan {
  id: string
  name: string
  startTime: number
  duration: number
  depth: number
  children?: TraceSpan[]
}

export interface LatencyFlameCompactProps {
  traceId: string
  spans: TraceSpan[]
  totalDuration: number
  className?: string
  showSparkline?: boolean
}

const DEPTH_COLORS = ["#4ade80", "#facc15", "#fb923c", "#f87171", "#ef4444"]

function getDepthColor(depth: number): string {
  return DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)]
}

function formatDuration(ms: number): string {
  if (ms < 1) return \`\${(ms * 1000).toFixed(0)}µs\`
  if (ms < 1000) return \`\${ms.toFixed(1)}ms\`
  return \`\${(ms / 1000).toFixed(2)}s\`
}

function flattenSpans(spans: TraceSpan[]): TraceSpan[] {
  const result: TraceSpan[] = []
  function traverse(span: TraceSpan) {
    result.push(span)
    span.children?.forEach(traverse)
  }
  spans.forEach(traverse)
  return result.sort((a, b) => a.startTime - b.startTime)
}

export function LatencyFlameCompact({
  traceId, spans, totalDuration, className, showSparkline = true,
}: LatencyFlameCompactProps) {
  const [hoveredSpan, setHoveredSpan] = useState<TraceSpan | null>(null)
  const flatSpans = useMemo(() => flattenSpans(spans), [spans])
  const maxDepth = useMemo(() => Math.max(...flatSpans.map((s) => s.depth), 0), [flatSpans])
  const containerHeight = (maxDepth + 1) * 24 + 4

  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}>
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground">Latency Flame</h3>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
            Trace ID: <span className="text-foreground">{traceId}</span>
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            Total: <span className="text-foreground font-mono">{formatDuration(totalDuration)}</span>
          </span>
        </div>
      </div>
      <div className="px-3 sm:px-4 py-2 sm:py-3 relative">
        <div className="relative" style={{ height: containerHeight }}>
          {flatSpans.map((span) => {
            const left = (span.startTime / totalDuration) * 100
            const width = Math.max((span.duration / totalDuration) * 100, 0.5)
            return (
              <div
                key={span.id}
                className={cn(
                  "absolute h-5 sm:h-6 rounded-sm cursor-pointer transition-all duration-150",
                  "flex items-center overflow-hidden hover:brightness-110",
                  hoveredSpan?.id === span.id && "ring-2 ring-primary z-10"
                )}
                style={{
                  left: \`\${left}%\`, width: \`\${width}%\`,
                  backgroundColor: getDepthColor(span.depth),
                  top: \`\${span.depth * 24}px\`,
                }}
                onMouseEnter={() => setHoveredSpan(span)}
                onMouseLeave={() => setHoveredSpan(null)}
              >
                <span className="px-1 text-[8px] sm:text-[10px] font-medium text-background truncate">
                  {span.name}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] sm:text-[10px] text-muted-foreground font-mono">
          <span>0ms</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
    </div>
  )
}
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
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setConfig({ ...config, installationType: "cli" })}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            installationType === "cli" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          CLI
          {installationType === "cli" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
        </button>
        <button
          onClick={() => setConfig({ ...config, installationType: "manual" })}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            installationType === "manual" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Manual
          {installationType === "manual" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
        </button>
      </div>

      {installationType === "cli" ? (
        <CodeBlockCommand
          __pnpm__="pnpm dlx shadcn@latest add https://ungine.vercel.app/r/latency-flame-compact.json"
          __npm__="npx shadcn@latest add https://ungine.vercel.app/r/latency-flame-compact.json"
          __yarn__="npx shadcn@latest add https://ungine.vercel.app/r/latency-flame-compact.json"
          __bun__="bunx --bun shadcn@latest add https://ungine.vercel.app/r/latency-flame-compact.json"
        />
      ) : (
        <ManualInstallation />
      )}
    </div>
  )
}
