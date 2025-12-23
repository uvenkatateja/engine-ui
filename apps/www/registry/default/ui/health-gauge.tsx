"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface HealthGaugeProps {
  label: string
  value: number // 0-100
  subLabel?: string
  segments?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

// Color thresholds based on value position in gauge
function getSegmentColor(segmentPosition: number, totalSegments: number): { base: string; glow: string } {
  const percentage = (segmentPosition / totalSegments) * 100
  
  if (percentage <= 40) {
    return { base: "#22c55e", glow: "0 0 8px #22c55e, 0 0 12px #22c55e40" } // Green
  } else if (percentage <= 60) {
    return { base: "#eab308", glow: "0 0 8px #eab308, 0 0 12px #eab30840" } // Yellow
  } else if (percentage <= 80) {
    return { base: "#f97316", glow: "0 0 8px #f97316, 0 0 12px #f9731640" } // Orange
  } else {
    return { base: "#ef4444", glow: "0 0 8px #ef4444, 0 0 12px #ef444440" } // Red
  }
}

function getStatusText(value: number): { text: string; color: string } {
  if (value <= 40) return { text: "Healthy", color: "text-green-500" }
  if (value <= 60) return { text: "Moderate", color: "text-yellow-500" }
  if (value <= 80) return { text: "High", color: "text-orange-500" }
  return { text: "Critical", color: "text-red-500" }
}

export function HealthGauge({ 
  label, 
  value, 
  subLabel, 
  segments = 20, 
  size = "md", 
  className 
}: HealthGaugeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const clampedValue = Math.max(0, Math.min(100, value))
  const activeSegments = Math.round((clampedValue / 100) * segments)
  const status = getStatusText(clampedValue)

  const sizeConfig = {
    sm: { width: 24, height: 80, gap: 3, segmentHeight: 3 },
    md: { width: 32, height: 120, gap: 4, segmentHeight: 4 },
    lg: { width: 40, height: 160, gap: 5, segmentHeight: 5 },
  }

  const config = sizeConfig[size]

  return (
    <div 
      className={cn("flex flex-col items-center gap-2 relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label */}
      <span className="text-xs font-medium tracking-wider text-cyan-500 dark:text-cyan-400 uppercase">
        {label}
      </span>

      {/* Gauge container */}
      <div
        className={cn(
          "relative flex flex-col-reverse justify-start rounded-sm border border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-900/80 p-1 cursor-pointer transition-all duration-200",
          isHovered && "scale-105 border-slate-400 dark:border-slate-600 shadow-lg"
        )}
        style={{
          width: config.width,
          height: config.height,
          gap: config.gap,
        }}
      >
        {Array.from({ length: segments }).map((_, index) => {
          const isActive = index < activeSegments
          const colors = getSegmentColor(index + 1, segments)

          return (
            <div
              key={index}
              className="w-full rounded-[1px] transition-all duration-150"
              style={{
                height: config.segmentHeight,
                backgroundColor: isActive ? colors.base : "rgb(203 213 225 / 0.5)",
                boxShadow: isActive && isHovered ? `${colors.glow}, 0 0 16px ${colors.base}60` : isActive ? colors.glow : "none",
                opacity: isActive ? 1 : 0.3,
              }}
            />
          )
        })}

        {/* Ambient glow overlay */}
        {activeSegments > 0 && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-sm transition-opacity duration-200",
              isHovered ? "opacity-30" : "opacity-20"
            )}
            style={{
              background: `linear-gradient(to top, ${getSegmentColor(activeSegments, segments).base}40, transparent)`,
            }}
          />
        )}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-md shadow-xl text-xs whitespace-nowrap">
            <span className={status.color}>{status.text}</span>
            <span className="text-slate-400 ml-1">({Math.round(clampedValue)}%)</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
            </div>
          </div>
        </div>
      )}

      {/* Value display */}
      <span className={cn(
        "text-xs font-mono transition-colors duration-200",
        isHovered ? status.color : "text-slate-600 dark:text-slate-400"
      )}>
        {subLabel || `${Math.round(value)}%`}
      </span>
    </div>
  )
}

// Compact inline version for table cells
export function HealthGaugeInline({
  value,
  segments = 10,
  className,
}: {
  value: number
  segments?: number
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const clampedValue = Math.max(0, Math.min(100, value))
  const activeSegments = Math.round((clampedValue / 100) * segments)
  const status = getStatusText(clampedValue)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "inline-flex flex-col-reverse gap-[3px] rounded-[2px] border border-slate-300 dark:border-slate-700/30 bg-slate-100 dark:bg-slate-900/60 p-[3px] cursor-pointer transition-all duration-200",
          isHovered && "scale-110 border-slate-400 dark:border-slate-500 shadow-md",
          className
        )}
        style={{ width: 18, height: 44 }}
      >
        {Array.from({ length: segments }).map((_, index) => {
          const isActive = index < activeSegments
          const colors = getSegmentColor(index + 1, segments)

          return (
            <div
              key={index}
              className="w-full rounded-[0.5px]"
              style={{
                height: 2,
                backgroundColor: isActive ? colors.base : "rgb(203 213 225 / 0.3)",
                boxShadow: isActive && isHovered ? `${colors.glow}, 0 0 12px ${colors.base}50` : isActive ? colors.glow : "none",
                opacity: isActive ? 1 : 0.25,
              }}
            />
          )
        })}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="bg-slate-900 dark:bg-slate-800 text-white px-2 py-1 rounded shadow-xl text-[10px] whitespace-nowrap">
            <span className={status.color}>{Math.round(clampedValue)}%</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
