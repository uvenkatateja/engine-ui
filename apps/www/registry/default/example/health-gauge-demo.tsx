"use client"

import { HealthGauge, HealthGaugeInline } from "@/registry/default/ui/health-gauge"
import { cn } from "@/lib/utils"

export default function HealthGaugeDemo() {
  const servers = [
    { name: "prod-web-01", cpu: 92, mem: 78, disk: 45, status: "Critical" as const },
    { name: "prod-web-02", cpu: 34, mem: 52, disk: 38, status: "Healthy" as const },
    { name: "prod-db-01", cpu: 67, mem: 89, disk: 72, status: "Warning" as const },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Main gauge display */}
      <div className="rounded-xl border bg-muted/30 p-6">
        <div className="flex items-end justify-center gap-8 md:gap-12">
          <HealthGauge label="CPU" value={88} size="lg" />
          <HealthGauge label="MEM" value={45} size="lg" />
          <HealthGauge label="DISK" value={25} size="lg" />
          <HealthGauge label="LOAD" value={72} size="lg" />
        </div>
      </div>

      {/* Size variants */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Size Variants
        </p>
        <div className="flex items-end gap-8 rounded-xl border bg-muted/30 p-6">
          <HealthGauge label="SM" value={60} size="sm" />
          <HealthGauge label="MD" value={60} size="md" />
          <HealthGauge label="LG" value={60} size="lg" />
        </div>
      </div>

      {/* Table cell demo */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Table Integration
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Server</th>
                <th className="px-4 py-3 text-center font-medium">CPU</th>
                <th className="px-4 py-3 text-center font-medium">MEM</th>
                <th className="px-4 py-3 text-center font-medium">Disk</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {servers.map((server) => (
                <tr key={server.name}>
                  <td className="px-4 py-3 font-mono text-sm">{server.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <HealthGaugeInline value={server.cpu} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <HealthGaugeInline value={server.mem} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <HealthGaugeInline value={server.disk} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                        server.status === "Healthy" && "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400",
                        server.status === "Warning" && "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
                        server.status === "Critical" && "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          server.status === "Healthy" && "bg-green-500",
                          server.status === "Warning" && "bg-yellow-500",
                          server.status === "Critical" && "bg-red-500 animate-pulse"
                        )}
                      />
                      {server.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threshold demo */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Threshold Colors
        </p>
        <div className="flex flex-wrap items-end justify-center gap-6 rounded-xl border bg-muted/30 p-6">
          {[10, 40, 60, 80, 95].map((val) => (
            <HealthGauge key={val} label={`${val}%`} value={val} size="md" />
          ))}
        </div>
      </div>
    </div>
  )
}
