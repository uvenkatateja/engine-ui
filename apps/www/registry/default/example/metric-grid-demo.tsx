"use client"

import { MetricGrid } from "@/registry/default/ui/metric-grid"

export default function MetricGridDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="border border-border rounded-lg overflow-hidden">
        <MetricGrid columns={10} />
      </div>
    </div>
  )
}
