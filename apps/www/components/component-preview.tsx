"use client"

import * as React from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ComponentPreviewTabsProps {
  component: React.ReactNode
  source: React.ReactNode
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}

export function ComponentPreviewTabs({
  component,
  source,
  align = "center",
  hideCode = false,
  className,
}: ComponentPreviewTabsProps) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn(
        "group relative mt-4 mb-12 flex flex-col gap-2",
        className
      )}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border md:-mx-1"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex overflow-x-auto overflow-y-auto min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] w-full justify-center p-4 sm:p-6 lg:p-10",
              "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-auto data-[active=true]:block"
        >
          {source}
        </div>
      </div>
    </div>
  )
}

interface ComponentPreviewProps {
  name: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}

export function ComponentPreview({
  name,
  align = "center",
  hideCode = false,
  className,
}: ComponentPreviewProps) {
  // Dynamically import the component
  let Component: React.ComponentType | null = null

  try {
    // This would be replaced with actual registry lookup
    if (name === "status-honeycomb-demo") {
      const StatusHoneycombDemo =
        require("@/registry/default/example/status-honeycomb-demo").default
      Component = StatusHoneycombDemo
    } else if (name === "trace-breadcrumb-demo") {
      const TraceBreadcrumbDemo =
        require("@/registry/default/example/trace-breadcrumb-demo").default
      Component = TraceBreadcrumbDemo
    }
  } catch (error) {
    console.error(`Failed to load component: ${name}`, error)
  }

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={<ComponentSource name={name} />}
    />
  )
}

// Source code for the components
const SOURCE_CODE: Record<string, string> = {
  "status-honeycomb-demo": `"use client"

import type React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"

interface HoneycombNode {
  id: string
  status: "active" | "warning" | "critical"
  podId: string
  uptime: string
  latency: number
}

interface StatusHoneycombProps {
  nodes: HoneycombNode[]
  columns?: number
}

const statusColors = {
  active: {
    hex: "#10B981",
    glow: "shadow-lg shadow-emerald-500/60",
  },
  warning: {
    hex: "#F59E0B",
    glow: "shadow-lg shadow-amber-500/50",
  },
  critical: {
    hex: "#EF4444",
    glow: "shadow-2xl shadow-red-600/70",
  },
}

const Hexagon: React.FC<{
  node: HoneycombNode
}> = ({ node }) => {
  const [isHovered, setIsHovered] = useState(false)
  const status = statusColors[node.status]

  const statusLabel = node.status.toUpperCase()
  const statusDetails =
    node.status === "critical"
      ? "(OOM_KILLED)"
      : node.status === "warning"
        ? "(HIGH_LATENCY)"
        : "(HEALTHY)"

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:z-20"
      style={{
        width: "64px",
        height: "64px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hexagon Shape */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="absolute inset-0"
      >
        <defs>
          <filter
            id={\`glow-\${node.id}\`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="32,0 58.28,16 58.28,48 32,64 5.72,48 5.72,16"
          fill={status.hex}
          filter={\`url(#glow-\${node.id})\`}
          className={node.status === "critical" ? "animate-pulse" : ""}
          style={{
            opacity: node.status === "critical" ? 0.9 : 1,
          }}
        />
      </svg>

      {/* Glow Effect Background */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-md",
          status.glow,
          node.status === "critical" && "animate-pulse"
        )}
        style={{
          background: status.hex,
          opacity: node.status === "critical" ? 0.3 : 0.1,
          zIndex: -1,
        }}
      />

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-xs text-zinc-200 shadow-2xl w-56 whitespace-nowrap">
            <div className="space-y-1">
              <div>
                POD_ID: <span className="text-emerald-400">{node.podId}</span>
              </div>
              <div>
                STATUS:{" "}
                <span
                  className={cn(
                    "font-bold",
                    node.status === "critical"
                      ? "text-red-400"
                      : node.status === "warning"
                        ? "text-amber-400"
                        : "text-emerald-400"
                  )}
                >
                  {statusLabel} {statusDetails}
                </span>
              </div>
              <div>
                UPTIME: <span className="text-zinc-400">{node.uptime}</span>
              </div>
              <div>
                LATENCY:{" "}
                <span
                  className={cn(
                    node.latency > 300 ? "text-red-400" : "text-emerald-400"
                  )}
                >
                  {node.latency.toFixed(0)}ms {node.latency > 300 ? "[!]" : ""}
                </span>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-8 border-transparent border-t-zinc-800" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function StatusHoneycomb({ nodes, columns = 8 }: StatusHoneycombProps) {
  // Create rows for honeycomb layout
  const rows: HoneycombNode[][] = []
  for (let i = 0; i < nodes.length; i += columns) {
    rows.push(nodes.slice(i, i + columns))
  }

  return (
    <div className="w-full flex items-center justify-center p-8 overflow-visible rounded-lg">
      <div className="relative">
        {/* Honeycomb Grid */}
        <div className="flex flex-col" style={{ gap: "-8px" }}>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-0"
              style={{
                marginLeft: rowIndex % 2 === 1 ? "32px" : "0",
                marginTop: rowIndex === 0 ? "0" : "-16px",
              }}
            >
              {row.map((node) => (
                <Hexagon key={node.id} node={node} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export type { HoneycombNode, StatusHoneycombProps }`,
  "trace-breadcrumb-demo": `"use client"

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

const statusColors: Record<string, { bg: string; text: string }> = {
  success: { bg: "bg-emerald-500", text: "text-emerald-400" },
  warning: { bg: "bg-amber-500", text: "text-amber-400" },
  error: { bg: "bg-red-500", text: "text-red-400" },
}

// Color palette for services (cycles through)
const serviceColors = [
  "bg-cyan-500",
  "bg-amber-500", 
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-blue-500",
  "bg-orange-500",
  "bg-teal-500",
]

export function TraceBreadcrumb({ requestId, spans, className }: TraceBreadcrumbProps) {
  const totalDuration = spans.reduce((sum, span) => sum + span.duration, 0)

  return (
    <div className={cn("w-full font-mono text-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-zinc-300">
        <span>
          Request ID: <span className="text-cyan-400">{requestId}</span>
        </span>
        <span>
          Total: <span className="text-white font-semibold">{totalDuration}ms</span>
        </span>
      </div>

      {/* Timeline Container */}
      <div className="relative border border-cyan-500/50 rounded-lg p-4 bg-zinc-950/50">
        {/* Total label */}
        <div className="absolute top-2 right-3 text-xs text-zinc-400">
          Total: {totalDuration}ms
        </div>

        {/* Spans Timeline */}
        <div className="flex items-center gap-0 mt-4 overflow-x-auto pb-2">
          {/* Entry arrow */}
          <div className="flex items-center text-cyan-400 shrink-0">
            <span className="text-lg">→</span>
          </div>

          {spans.map((span, index) => {
            // Calculate width based on duration (min 60px, max based on proportion)
            const proportion = span.duration / totalDuration
            const minWidth = 60
            const maxWidth = 200
            const width = Math.max(minWidth, Math.min(maxWidth, proportion * 400))
            
            const colorIndex = index % serviceColors.length
            const bgColor = span.status 
              ? statusColors[span.status].bg 
              : serviceColors[colorIndex]

            return (
              <div key={span.id} className="flex items-center shrink-0">
                {/* Span Block */}
                <div
                  className={cn(
                    "relative flex items-center justify-center px-3 py-2 rounded text-xs font-medium text-zinc-900 transition-all hover:scale-105 hover:z-10",
                    bgColor
                  )}
                  style={{ minWidth: \`\${width}px\` }}
                >
                  <span className="truncate">
                    {span.service} ({span.duration}ms)
                  </span>
                </div>

                {/* Arrow between spans */}
                {index < spans.length - 1 && (
                  <div className="flex items-center text-cyan-400 mx-0.5 shrink-0">
                    <span className="text-lg">→</span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Exit arrow */}
          <div className="flex items-center text-cyan-400 shrink-0 ml-0.5">
            <span className="text-lg">→</span>
            <span className="text-xl ml-1">»</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { TraceSpan, TraceBreadcrumbProps }`,
}

export function ComponentSource({ name }: { name: string }) {
  const code = SOURCE_CODE[name] || `// Component: ${name}\n// Source code not available`

  return (
    <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[400px] sm:[&_pre]:max-h-[500px] lg:[&_pre]:max-h-[650px] [&_pre]:overflow-auto">
      <pre className="bg-muted p-3 sm:p-4">
        <code className="text-xs sm:text-sm whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
