"use client"

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

const DEPTH_COLORS = [
  "#4ade80", // green
  "#facc15", // yellow
  "#fb923c", // orange
  "#f87171", // red
  "#ef4444", // deep red
]

function getDepthColor(depth: number): string {
  return DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)]
}

function formatDuration(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`
  if (ms < 1000) return `${ms.toFixed(1)}ms`
  return `${(ms / 1000).toFixed(2)}s`
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

interface SpanBarProps {
  span: TraceSpan
  totalDuration: number
  onHover: (span: TraceSpan | null) => void
  isHovered: boolean
}

function SpanBar({ span, totalDuration, onHover, isHovered }: SpanBarProps) {
  const left = (span.startTime / totalDuration) * 100
  const width = Math.max((span.duration / totalDuration) * 100, 0.5)
  const color = getDepthColor(span.depth)

  return (
    <div
      className={cn(
        "absolute h-5 sm:h-6 rounded-sm cursor-pointer transition-all duration-150",
        "flex items-center overflow-hidden",
        isHovered ? "ring-2 ring-primary ring-offset-1 ring-offset-background z-10" : "hover:brightness-110",
      )}
      style={{
        left: `${left}%`,
        width: `${width}%`,
        backgroundColor: color,
        top: `${span.depth * 24}px`,
      }}
      onMouseEnter={() => onHover(span)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(span)}
      onTouchEnd={() => onHover(null)}
    >
      <span className="px-1 sm:px-1.5 text-[8px] sm:text-[10px] font-medium text-background truncate">
        {span.name}
      </span>
    </div>
  )
}

interface SparklineProps {
  spans: TraceSpan[]
  totalDuration: number
  width: number
  height: number
}

function Sparkline({ spans, totalDuration, width, height }: SparklineProps) {
  const buckets = Math.min(60, Math.floor(width / 10))
  const bucketSize = totalDuration / buckets

  const histogram = useMemo(() => {
    const counts = new Array(buckets).fill(0)
    spans.forEach((span) => {
      const startBucket = Math.floor(span.startTime / bucketSize)
      const endBucket = Math.min(Math.floor((span.startTime + span.duration) / bucketSize), buckets - 1)
      for (let i = startBucket; i <= endBucket; i++) {
        counts[i]++
      }
    })
    return counts
  }, [spans, bucketSize, buckets])

  const maxCount = Math.max(...histogram, 1)
  const barWidth = width / buckets

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#4ade80" stopOpacity={0.3} />
        </linearGradient>
      </defs>
      {histogram.map((count, i) => {
        const barHeight = (count / maxCount) * height
        return (
          <rect
            key={i}
            x={i * barWidth}
            y={height - barHeight}
            width={barWidth - 0.5}
            height={barHeight}
            fill="url(#sparklineGradient)"
            className="transition-all duration-75"
          />
        )
      })}
    </svg>
  )
}


interface TooltipProps {
  span: TraceSpan
  totalDuration: number
}

function SpanTooltip({ span, totalDuration }: TooltipProps) {
  const percentage = ((span.duration / totalDuration) * 100).toFixed(1)

  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
      <div className="bg-popover border border-border rounded-lg shadow-xl px-3 py-2 min-w-[160px] sm:min-w-[180px]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" style={{ backgroundColor: getDepthColor(span.depth) }} />
          <span className="font-medium text-xs sm:text-sm text-foreground">{span.name}</span>
        </div>
        <div className="space-y-0.5 text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex justify-between gap-4">
            <span>Duration</span>
            <span className="font-mono text-foreground">{formatDuration(span.duration)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Start</span>
            <span className="font-mono text-foreground">{formatDuration(span.startTime)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>% of trace</span>
            <span className="font-mono text-foreground">{percentage}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Depth</span>
            <span className="font-mono text-foreground">{span.depth}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LatencyFlameCompact({
  traceId,
  spans,
  totalDuration,
  className,
  showSparkline = true,
}: LatencyFlameCompactProps) {
  const [hoveredSpan, setHoveredSpan] = useState<TraceSpan | null>(null)
  const [sparklineWidth, setSparklineWidth] = useState(300)
  const sparklineRef = useRef<HTMLDivElement>(null)

  const flatSpans = useMemo(() => flattenSpans(spans), [spans])
  const maxDepth = useMemo(() => Math.max(...flatSpans.map((s) => s.depth), 0), [flatSpans])
  const containerHeight = (maxDepth + 1) * 24 + 4

  // Responsive sparkline width
  useEffect(() => {
    const updateWidth = () => {
      if (sparklineRef.current) {
        setSparklineWidth(sparklineRef.current.offsetWidth - 32)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
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
          {/* Legend - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:flex items-center gap-1.5">
            {DEPTH_COLORS.map((color, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-muted-foreground">D{i}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile legend */}
        <div className="flex sm:hidden items-center gap-1 mt-2">
          {DEPTH_COLORS.map((color, i) => (
            <div key={i} className="flex items-center gap-0.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-muted-foreground">D{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline */}
      {showSparkline && (
        <div ref={sparklineRef} className="px-3 sm:px-4 py-2 border-b border-border bg-secondary/30">
          <Sparkline spans={flatSpans} totalDuration={totalDuration} width={sparklineWidth} height={28} />
        </div>
      )}

      {/* Flame Graph */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 relative">
        <div className="relative" style={{ height: containerHeight }}>
          {flatSpans.map((span) => (
            <SpanBar
              key={span.id}
              span={span}
              totalDuration={totalDuration}
              onHover={setHoveredSpan}
              isHovered={hoveredSpan?.id === span.id}
            />
          ))}
        </div>

        {/* Tooltip */}
        {hoveredSpan && (
          <div
            className="absolute hidden sm:block"
            style={{
              left: `${((hoveredSpan.startTime + hoveredSpan.duration / 2) / totalDuration) * 100}%`,
              top: `${hoveredSpan.depth * 24 + 12}px`,
            }}
          >
            <SpanTooltip span={hoveredSpan} totalDuration={totalDuration} />
          </div>
        )}

        {/* Time axis */}
        <div className="flex justify-between mt-2 sm:mt-3 text-[9px] sm:text-[10px] text-muted-foreground font-mono">
          <span>0ms</span>
          <span className="hidden sm:inline">{formatDuration(totalDuration / 4)}</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span className="hidden sm:inline">{formatDuration((totalDuration * 3) / 4)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>

      {/* Mobile tooltip - shown at bottom when span is hovered */}
      {hoveredSpan && (
        <div className="sm:hidden px-3 py-2 border-t border-border bg-secondary/30">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getDepthColor(hoveredSpan.depth) }} />
            <span className="font-medium text-xs text-foreground">{hoveredSpan.name}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-muted-foreground">
            <span>Duration: <span className="font-mono text-foreground">{formatDuration(hoveredSpan.duration)}</span></span>
            <span>Start: <span className="font-mono text-foreground">{formatDuration(hoveredSpan.startTime)}</span></span>
            <span>{((hoveredSpan.duration / totalDuration) * 100).toFixed(1)}% of trace</span>
          </div>
        </div>
      )}
    </div>
  )
}
