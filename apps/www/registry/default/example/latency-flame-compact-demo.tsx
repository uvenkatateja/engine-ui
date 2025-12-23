"use client"

import { LatencyFlameCompact } from "@/registry/default/ui/latency-flame-compact"
import type { TraceSpan } from "@/registry/default/ui/latency-flame-compact"

const sampleTrace: TraceSpan[] = [
  {
    id: "1",
    name: "Processing",
    startTime: 0,
    duration: 180,
    depth: 0,
    children: [
      {
        id: "1a",
        name: "Cache Read",
        startTime: 5,
        duration: 45,
        depth: 1,
      },
      {
        id: "1b",
        name: "Auth",
        startTime: 55,
        duration: 35,
        depth: 1,
        children: [
          {
            id: "1b1",
            name: "Verify Token",
            startTime: 60,
            duration: 25,
            depth: 2,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Data Transform",
    startTime: 185,
    duration: 95,
    depth: 0,
    children: [
      {
        id: "2a",
        name: "Parse JSON",
        startTime: 190,
        duration: 30,
        depth: 1,
      },
      {
        id: "2b",
        name: "Validate Schema",
        startTime: 225,
        duration: 45,
        depth: 1,
        children: [
          {
            id: "2b1",
            name: "Type Check",
            startTime: 230,
            duration: 35,
            depth: 2,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Database Query",
    startTime: 285,
    duration: 120,
    depth: 0,
    children: [
      {
        id: "3a",
        name: "Connection Pool",
        startTime: 290,
        duration: 15,
        depth: 1,
      },
      {
        id: "3b",
        name: "Execute Query",
        startTime: 310,
        duration: 70,
        depth: 1,
        children: [
          {
            id: "3b1",
            name: "Index Scan",
            startTime: 315,
            duration: 40,
            depth: 2,
            children: [
              {
                id: "3b1a",
                name: "Disk I/O",
                startTime: 320,
                duration: 25,
                depth: 3,
              },
            ],
          },
          {
            id: "3b2",
            name: "Sort Results",
            startTime: 360,
            duration: 15,
            depth: 2,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "External API",
    startTime: 410,
    duration: 38,
    depth: 0,
    children: [
      {
        id: "4a",
        name: "HTTP Request",
        startTime: 412,
        duration: 32,
        depth: 1,
        children: [
          {
            id: "4a1",
            name: "TLS Handshake",
            startTime: 414,
            duration: 12,
            depth: 2,
          },
          {
            id: "4a2",
            name: "Response Parse",
            startTime: 430,
            duration: 10,
            depth: 2,
          },
        ],
      },
    ],
  },
]

export default function LatencyFlameCompactDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4">
      <LatencyFlameCompact
        traceId="#XY77-45GH"
        spans={sampleTrace}
        totalDuration={450}
        showSparkline
      />

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-2">Minimal View</h2>
        <LatencyFlameCompact
          traceId="#AB12-89KL"
          spans={sampleTrace.slice(0, 2)}
          totalDuration={280}
          showSparkline={false}
        />
      </div>
    </div>
  )
}
