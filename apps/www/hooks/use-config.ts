"use client"

import * as React from "react"

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
}

const defaultConfig: Config = {
  packageManager: "pnpm",
  installationType: "cli",
}

// Simple localStorage-based config hook (no jotai dependency)
export function useConfig() {
  const [config, setConfigState] = React.useState<Config>(defaultConfig)

  React.useEffect(() => {
    const stored = localStorage.getItem("engine-ui-config")
    if (stored) {
      try {
        setConfigState({ ...defaultConfig, ...JSON.parse(stored) })
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  const setConfig = React.useCallback((newConfig: Config) => {
    setConfigState(newConfig)
    localStorage.setItem("engine-ui-config", JSON.stringify(newConfig))
  }, [])

  return [config, setConfig] as const
}
