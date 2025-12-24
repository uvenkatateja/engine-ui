"use client"

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
      return `${x},${y}`
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
          filter: `drop-shadow(0 0 ${animated ? "4px" : "2px"} ${colorMap[color]}${glowIntensity})`,
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

function MetricCell({ metric }: { metric: Metric }) {
  const [isHovered, setIsHovered] = useState(false)

  const isHighLoad = metric.alertType === "high-load"
  const isLatencySpike = metric.alertType === "latency-spike"
  const hasAlert = isHighLoad || isLatencySpike

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col justify-between",
        "border-r border-b border-border",
        "p-2 min-h-[72px]",
        "transition-all duration-200 ease-out cursor-pointer",
        isHovered && !hasAlert && "bg-muted/60 scale-[1.02] z-10 shadow-lg shadow-black/40 dark:shadow-black/60",
        isHovered && hasAlert && "scale-[1.02] z-10 shadow-lg shadow-black/40 dark:shadow-black/60",
        isHighLoad && "bg-red-500/10 dark:bg-red-950/60",
        isLatencySpike && "bg-amber-500/10 dark:bg-amber-950/50",
        isHighLoad && isHovered && "bg-red-500/20 dark:bg-red-900/70",
        isLatencySpike && isHovered && "bg-amber-500/20 dark:bg-amber-900/60"
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span
          className={cn(
            "font-mono text-[10px] font-medium tracking-tight transition-colors duration-200",
            isHighLoad ? "text-red-600 dark:text-red-400" : isLatencySpike ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground",
            isHovered && !hasAlert && "text-foreground"
          )}
        >
          {metric.label}
        </span>
        <span
          className={cn(
            "font-mono text-xs font-semibold tabular-nums transition-colors duration-200",
            isHighLoad ? "text-red-700 dark:text-red-300" : isLatencySpike ? "text-amber-700 dark:text-amber-300" : "text-foreground",
            isHovered && !hasAlert && "text-foreground"
          )}
        >
          {metric.value}
        </span>
      </div>

      <div className="flex items-center justify-between mt-0.5">
        <span
          className={cn(
            "font-mono text-[10px] tabular-nums text-muted-foreground transition-colors duration-200",
            isHovered && "text-muted-foreground/80"
          )}
        >
          {metric.secondary}
        </span>
        {hasAlert && (
          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                isHighLoad ? "text-red-500" : "text-amber-500",
                isHovered && "scale-125"
              )}
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {hasAlert && (
        <div
          className={cn(
            "font-mono text-[8px] font-bold tracking-wide mt-0.5 transition-all duration-200",
            isHighLoad ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400",
            isHovered && isHighLoad && "text-red-500 dark:text-red-300",
            isHovered && isLatencySpike && "text-amber-500 dark:text-amber-300"
          )}
        >
          {isHighLoad ? "HIGH LOAD" : "LATENCY SPIKE"}
        </div>
      )}

      {!hasAlert && (
        <div className="mt-auto pt-1">
          <MicroSparkline data={metric.sparkline} color={metric.sparkColor} animated={isHovered} />
        </div>
      )}

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200",
          isHovered && !hasAlert && metric.sparkColor === "cyan" && "bg-cyan-500/60",
          isHovered && !hasAlert && metric.sparkColor === "amber" && "bg-amber-500/60",
          isHovered && !hasAlert && metric.sparkColor === "white" && "bg-zinc-400/60",
          isHovered && isHighLoad && "bg-red-500/80",
          isHovered && isLatencySpike && "bg-amber-500/80",
          !isHovered && "bg-transparent"
        )}
      />
    </div>
  )
}

export interface MetricGridProps {
  metrics?: Metric[]
  columns?: number
  className?: string
}

function generateDefaultMetrics(): Metric[] {
  const metrics: Metric[] = []
  let id = 0

  // CPU metrics
  for (let i = 1; i <= 20; i++) {
    const cpuNum = String(i).padStart(2, "0")
    const usage = Math.floor(Math.random() * 30 + 70)
    const secondary = `${Math.floor(Math.random() * 400 + 100)}K`

    metrics.push({
      id: `cpu-${id++}`,
      label: `CPU-${cpuNum}`,
      value: `${usage}%`,
      secondary,
      sparkline: Array.from({ length: 12 }, () => Math.random() * 40 + 30),
      sparkColor: "cyan",
      category: "cpu",
    })
  }

  // Memory metrics
  for (let i = 0; i < 20; i++) {
    const memLabel = i < 10 ? `MEM-${String(i).padStart(2, "0")}` : `MEM-${String.fromCharCode(65 + (i - 10))}`
    const usage = i % 5 === 0 ? "14.2G" : `${(Math.random() * 10 + 5).toFixed(1)}G`
    const secondary = `${Math.floor(Math.random() * 400 + 100)}K`
    const isAlert = Math.random() > 0.88

    metrics.push({
      id: `mem-${id++}`,
      label: memLabel,
      value: usage,
      secondary,
      sparkline: Array.from({ length: 12 }, () => Math.random() * 50 + 25),
      sparkColor: "amber",
      category: "mem",
      alertType: isAlert ? "high-load" : undefined,
    })
  }

  // Disk metrics
  for (let i = 0; i < 20; i++) {
    const diskLabel = `DISK-${String.fromCharCode(65 + (i % 8))}`
    const usage = `${Math.floor(Math.random() * 400 + 100)}K`
    const percent = `${Math.floor(Math.random() * 60 + 10)}%`
    const isHighLoad = Math.random() > 0.9
    const isLatencySpike = !isHighLoad && Math.random() > 0.88

    metrics.push({
      id: `disk-${id++}`,
      label: diskLabel,
      value: percent,
      secondary: usage,
      sparkline: Array.from({ length: 12 }, () => Math.random() * 60 + 20),
      sparkColor: "white",
      category: "disk",
      alertType: isHighLoad ? "high-load" : isLatencySpike ? "latency-spike" : undefined,
    })
  }

  return metrics
}

export function MetricGrid({ metrics: propMetrics, columns = 10, className }: MetricGridProps) {
  const metrics = useMemo(() => propMetrics || generateDefaultMetrics(), [propMetrics])
  const alertCount = metrics.filter((m) => m.alertType).length

  return (
    <div className={cn("w-full bg-background font-mono", className)}>
      <div
        className="grid border-l border-t border-border"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {metrics.map((metric) => (
          <MetricCell key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/30">
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-cyan-500 rounded-full" />
            CPU
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-amber-500 rounded-full" />
            MEM
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-zinc-500 rounded-full" />
            DISK
          </span>
        </div>
        {alertCount > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {alertCount} ALERTS
          </div>
        )}
      </div>
    </div>
  )
}

export type { Metric as MetricGridMetric }
