"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CopyButton } from "@/components/copy-button"

const componentCode = `"use client"

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
      <span className="text-xs font-medium tracking-wider text-cyan-500 uppercase">
        {label}
      </span>

      <div
        className={cn(
          "relative flex flex-col-reverse justify-start rounded-sm border p-1 cursor-pointer transition-all duration-200",
          isHovered && "scale-105 shadow-lg"
        )}
        style={{ width: config.width, height: config.height, gap: config.gap }}
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
                boxShadow: isActive ? colors.glow : "none",
                opacity: isActive ? 1 : 0.3,
              }}
            />
          )
        })}
      </div>

      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-900 text-white px-3 py-1.5 rounded-md shadow-xl text-xs">
            <span className={status.color}>{status.text}</span>
            <span className="text-slate-400 ml-1">({Math.round(clampedValue)}%)</span>
          </div>
        </div>
      )}

      <span className={cn("text-xs font-mono", isHovered ? status.color : "text-slate-600")}>
        {subLabel || \`\${Math.round(value)}%\`}
      </span>
    </div>
  )
}

export function HealthGaugeInline({ value, segments = 10, className }: { value: number; segments?: number; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const clampedValue = Math.max(0, Math.min(100, value))
  const activeSegments = Math.round((clampedValue / 100) * segments)

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className={cn("inline-flex flex-col-reverse gap-[3px] rounded-[2px] border p-[3px] cursor-pointer transition-all", isHovered && "scale-110 shadow-md", className)}
        style={{ width: 18, height: 44 }}
      >
        {Array.from({ length: segments }).map((_, index) => {
          const isActive = index < activeSegments
          const colors = getSegmentColor(index + 1, segments)
          return (
            <div key={index} className="w-full rounded-[0.5px]" style={{ height: 2, backgroundColor: isActive ? colors.base : "rgb(203 213 225 / 0.3)", boxShadow: isActive ? colors.glow : "none", opacity: isActive ? 1 : 0.25 }} />
          )
        })}
      </div>
      {isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-900 text-white px-2 py-1 rounded shadow-xl text-[10px]">{Math.round(clampedValue)}%</div>
        </div>
      )}
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
          __pnpm__="pnpm dlx shadcn@latest add https://ungine.vercel.app/r/health-gauge.json"
          __npm__="npx shadcn@latest add https://ungine.vercel.app/r/health-gauge.json"
          __yarn__="npx shadcn@latest add https://ungine.vercel.app/r/health-gauge.json"
          __bun__="bunx --bun shadcn@latest add https://ungine.vercel.app/r/health-gauge.json"
        />
      ) : (
        <ManualInstallation />
      )}
    </div>
  )
}
