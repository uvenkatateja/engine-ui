"use client"

import { useEffect, useState } from "react"

import { StatusHoneycomb } from "@/registry/default/ui/status-honeycomb"

interface HoneycombNode {
  id: string
  status: "active" | "warning" | "critical"
  podId: string
  uptime: string
  latency: number
}

// Generate mock honeycomb data - only on client side
const generateMockNodes = (): HoneycombNode[] => {
  const nodes: HoneycombNode[] = []

  for (let i = 0; i < 96; i++) {
    const statusWeights = {
      active: 0.7,
      warning: 0.2,
      critical: 0.1,
    }

    let status: "active" | "warning" | "critical" = "active"
    const rand = Math.random()

    if (rand < statusWeights.critical) {
      status = "critical"
    } else if (rand < statusWeights.critical + statusWeights.warning) {
      status = "warning"
    }

    nodes.push({
      id: `srv-${String(i).padStart(3, "0")}`,
      status,
      podId: `srv-${772 + i}-${String.fromCharCode(97 + (i % 26))}`,
      uptime: `${Math.floor(Math.random() * 30)}d ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      latency:
        status === "critical"
          ? 450 + Math.random() * 100
          : status === "warning"
            ? 250 + Math.random() * 100
            : 50 + Math.random() * 50,
    })
  }

  return nodes
}

export default function StatusHoneycombDemo() {
  const [nodes, setNodes] = useState<HoneycombNode[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setNodes(generateMockNodes())
  }, [])

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6 p-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            StatusHoneycomb
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Loading...
          </p>
        </div>
        <div className="w-full bg-zinc-950 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          <p className="text-zinc-500">Initializing honeycomb...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          StatusHoneycomb
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Dense, high-performance health visualization for operational
          interfaces. Monitor 100+ instances without performance degradation.
        </p>
      </div>

      <StatusHoneycomb nodes={nodes} columns={12} />
    </div>
  )
}
