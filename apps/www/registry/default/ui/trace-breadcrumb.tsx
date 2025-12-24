"use client"

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

const statusConfig: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  success: { 
    bg: "bg-emerald-50 dark:bg-emerald-500/20", 
    border: "border-emerald-200 dark:border-emerald-500/40", 
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300"
  },
  warning: { 
    bg: "bg-amber-50 dark:bg-amber-500/20", 
    border: "border-amber-200 dark:border-amber-500/40", 
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300"
  },
  error: { 
    bg: "bg-red-50 dark:bg-red-500/20", 
    border: "border-red-200 dark:border-red-500/40", 
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-300"
  },
}

// Color palette for services with dark mode support
const serviceConfig = [
  { 
    bg: "bg-blue-50 dark:bg-blue-500/20", 
    border: "border-blue-200 dark:border-blue-500/40", 
    dot: "bg-blue-500", 
    text: "text-blue-700 dark:text-blue-300" 
  },
  { 
    bg: "bg-violet-50 dark:bg-violet-500/20", 
    border: "border-violet-200 dark:border-violet-500/40", 
    dot: "bg-violet-500", 
    text: "text-violet-700 dark:text-violet-300" 
  },
  { 
    bg: "bg-emerald-50 dark:bg-emerald-500/20", 
    border: "border-emerald-200 dark:border-emerald-500/40", 
    dot: "bg-emerald-500", 
    text: "text-emerald-700 dark:text-emerald-300" 
  },
  { 
    bg: "bg-amber-50 dark:bg-amber-500/20", 
    border: "border-amber-200 dark:border-amber-500/40", 
    dot: "bg-amber-500", 
    text: "text-amber-700 dark:text-amber-300" 
  },
  { 
    bg: "bg-rose-50 dark:bg-rose-500/20", 
    border: "border-rose-200 dark:border-rose-500/40", 
    dot: "bg-rose-500", 
    text: "text-rose-700 dark:text-rose-300" 
  },
  { 
    bg: "bg-cyan-50 dark:bg-cyan-500/20", 
    border: "border-cyan-200 dark:border-cyan-500/40", 
    dot: "bg-cyan-500", 
    text: "text-cyan-700 dark:text-cyan-300" 
  },
]

function formatDuration(ms: number): string {
  if (ms < 1) return "<1ms"
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`
  return `${ms}ms`
}

export function TraceBreadcrumb({ requestId, spans, className }: TraceBreadcrumbProps) {
  const totalDuration = spans.reduce((sum, span) => sum + span.duration, 0)

  return (
    <div className={cn("w-full", className)}>
      {/* Header Card - responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span>Trace</span>
          </div>
          <code className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded font-mono truncate max-w-[180px] sm:max-w-none">
            {requestId}
          </code>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{spans.length} spans</span>
          <span className="font-medium text-foreground">{formatDuration(totalDuration)}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative bg-muted/50 border border-border rounded-xl p-3 sm:p-4">
        {/* Timeline bar background - hidden on mobile, shown on desktop */}
        <div className="hidden sm:block absolute left-4 right-4 top-1/2 h-0.5 bg-border -translate-y-1/2" />
        
        {/* Vertical timeline line for mobile */}
        <div className="sm:hidden absolute left-6 top-4 bottom-16 w-0.5 bg-border" />
        
        {/* Spans - vertical on mobile, horizontal on desktop */}
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-2 sm:flex-wrap py-2">
          {spans.map((span, index) => {
            const colorIndex = index % serviceConfig.length
            const config = span.status 
              ? statusConfig[span.status]
              : serviceConfig[colorIndex]
            
            const proportion = span.duration / totalDuration

            return (
              <div key={span.id} className="flex items-center sm:flex-row">
                {/* Span Card */}
                <div
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ml-4 sm:ml-0",
                    "hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
                    "w-full sm:w-auto",
                    config.bg,
                    config.border
                  )}
                >
                  {/* Status dot */}
                  <div className={cn("w-2 h-2 rounded-full shrink-0", config.dot)} />
                  
                  {/* Content */}
                  <div className="flex flex-col min-w-0 flex-1 sm:flex-initial">
                    <span className={cn("text-xs font-medium", config.text)}>
                      {span.service}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {formatDuration(span.duration)}
                    </span>
                  </div>

                  {/* Duration percentage on mobile */}
                  <span className="sm:hidden text-[10px] text-muted-foreground font-mono">
                    {Math.round(proportion * 100)}%
                  </span>

                  {/* Duration bar indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg overflow-hidden bg-black/5 dark:bg-white/5">
                    <div 
                      className={cn("h-full", config.dot)}
                      style={{ width: `${Math.min(100, proportion * 100 * 3)}%` }}
                    />
                  </div>
                </div>

                {/* Connector - horizontal arrow on desktop only */}
                {index < spans.length - 1 && (
                  <div className="hidden sm:flex items-center mx-1">
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Timeline scale */}
        <div className="flex justify-between mt-3 pt-2 border-t border-border text-[10px] text-muted-foreground font-mono">
          <span>0ms</span>
          <span>{formatDuration(totalDuration / 2)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
    </div>
  )
}

export type { TraceSpan, TraceBreadcrumbProps }
