"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

const cliCommands = {
  pnpm: "pnpm dlx shadcn@latest add https://ungine.vercel.app/r/metric-grid.json",
  npm: "npx shadcn@latest add https://ungine.vercel.app/r/metric-grid.json",
  yarn: "npx shadcn@latest add https://ungine.vercel.app/r/metric-grid.json",
  bun: "bunx shadcn@latest add https://ungine.vercel.app/r/metric-grid.json",
}

const manualCode = `"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

function MicroSparkline({
  data,
  color = "cyan",
  width = 56,
  height = 20,
  animated = false,
}: {
  data: number[]
  color?: "cyan" | "amber" | "white" | "emerald"
  width?: number
  height?: number
  animated?: boolean
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - 2 - ((value - min) / range) * (height - 4)
      return \`\${x},\${y}\`
    })
    .join(" ")

  const colorMap = {
    cyan: "#22d3d1",
    amber: "#f59e0b",
    white: "#a1a1aa",
    emerald: "#10b981",
  }

  const glowIntensity = animated ? "80" : "40"

  return (
    <svg width={width} height={height} className="block">
      <polyline
        fill="none"
        strokeWidth={animated ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        stroke={colorMap[color]}
        style={{
          filter: \`drop-shadow(0 0 \${animated ? "4px" : "2px"} \${colorMap[color]}\${glowIntensity})\`,
          transition: "all 0.2s ease-out",
        }}
      />
      {animated && (
        <circle
          cx={((data.length - 1) / (data.length - 1)) * width}
          cy={height - 2 - ((data[data.length - 1] - min) / range) * (height - 4)}
          r={3}
          fill={colorMap[color]}
          className="animate-pulse"
        />
      )}
    </svg>
  )
}

export interface Metric {
  id: string
  label: string
  value: string
  secondary: string
  sparkline: number[]
  sparkColor: "cyan" | "amber" | "white" | "emerald"
  alertType?: "high-load" | "latency-spike"
  category: "cpu" | "mem" | "disk"
}

export interface MetricGridProps {
  metrics?: Metric[]
  columns?: number
  className?: string
}

export function MetricGrid({ metrics, columns = 10, className }: MetricGridProps) {
  // Component implementation...
}`

export function InstallationTabs() {
  return (
    <Tabs defaultValue="pnpm" className="w-full not-prose">
      <TabsList className="grid w-full grid-cols-5 mb-4">
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      {(Object.keys(cliCommands) as Array<keyof typeof cliCommands>).map((pm) => (
        <TabsContent key={pm} value={pm}>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{cliCommands[pm]}</code>
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton value={cliCommands[pm]} />
            </div>
          </div>
        </TabsContent>
      ))}

      <TabsContent value="manual">
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[400px] no-scrollbar">
            <code>{manualCode}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton value={manualCode} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Copy the full component code from the Code tab above.
        </p>
      </TabsContent>
    </Tabs>
  )
}
