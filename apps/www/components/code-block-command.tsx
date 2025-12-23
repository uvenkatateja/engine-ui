"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const availableTabs = Object.entries(tabs).filter(([, value]) => value)
  const currentCommand = tabs[packageManager] || availableTabs[0]?.[1] || ""

  const copyCommand = React.useCallback(() => {
    if (!currentCommand) return
    copyToClipboardWithMeta(currentCommand)
    setHasCopied(true)
  }, [currentCommand])

  const handleTabChange = (key: string) => {
    setConfig({
      ...config,
      packageManager: key as "pnpm" | "npm" | "yarn" | "bun",
    })
  }

  if (availableTabs.length === 0) return null

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-0.5",
        "border-border/50",
        "bg-muted/50",
        "text-foreground"
      )}
    >
      {/* Tab Bar */}
      <div className="flex items-center relative pr-2.5">
        <div
          role="tablist"
          className={cn(
            "flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex",
            "overflow-x-auto overflow-y-hidden"
          )}
        >
          <div className="relative flex items-center gap-2">
            {availableTabs.map(([key]) => {
              const isActive = packageManager === key
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(key)}
                  className={cn(
                    "flex items-center relative gap-1.5 my-1 mb-1.5 outline-0",
                    "whitespace-nowrap font-medium transition-colors duration-150",
                    "px-1.5 first:ml-1 first:rounded-tl-lg rounded-sm",
                    "hover:bg-muted",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {key}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative overflow-hidden">
        {/* Copy Button */}
        <button
          onClick={copyCommand}
          className={cn(
            "absolute top-2 right-2 z-10",
            "flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg",
            "text-muted-foreground",
            "bg-background/80 backdrop-blur-sm",
            "border border-border/50",
            "opacity-70 group-hover:opacity-100",
            "hover:bg-muted",
            "hover:text-foreground",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          )}
          aria-label="Copy code"
        >
          <span className="relative size-3.5">
            {hasCopied ? (
              <Check className="size-full" />
            ) : (
              <Copy className="size-full" />
            )}
          </span>
          <span>{hasCopied ? "Copied" : "Copy"}</span>
        </button>

        <pre
          className={cn(
            "p-4 text-sm leading-relaxed m-0",
            "bg-card",
            "rounded-b-2xl",
            "overflow-x-auto"
          )}
        >
          <code className="font-mono text-foreground block whitespace-pre">
            {currentCommand}
          </code>
        </pre>
      </div>
    </div>
  )
}
