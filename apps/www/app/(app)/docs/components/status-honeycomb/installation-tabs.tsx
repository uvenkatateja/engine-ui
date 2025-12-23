"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CopyButton } from "@/components/copy-button"

const componentCode = `"use client"

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

export type { HoneycombNode, StatusHoneycombProps }
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
          __pnpm__="pnpm dlx shadcn@latest add https://engine-ui.vercel.app/r/status-honeycomb.json"
          __npm__="npx shadcn@latest add https://engine-ui.vercel.app/r/status-honeycomb.json"
          __yarn__="npx shadcn@latest add https://engine-ui.vercel.app/r/status-honeycomb.json"
          __bun__="bunx --bun shadcn@latest add https://engine-ui.vercel.app/r/status-honeycomb.json"
        />
      ) : (
        <ManualInstallation />
      )}
    </div>
  )
}
