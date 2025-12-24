"use client"

import { TraceBreadcrumb } from "@/registry/default/ui/trace-breadcrumb"

export default function TraceBreadcrumbDemo() {
  // Example 1: Successful e-commerce checkout flow
  const checkoutTrace = [
    { id: "span-1", service: "API Gateway", duration: 3 },
    { id: "span-2", service: "Auth Service", duration: 12, status: "success" as const },
    { id: "span-3", service: "Cart Service", duration: 28 },
    { id: "span-4", service: "Payment Gateway", duration: 234, status: "success" as const },
    { id: "span-5", service: "Order Service", duration: 67 },
  ]

  // Example 2: Slow database query trace
  const slowQueryTrace = [
    { id: "span-1", service: "GraphQL", duration: 5 },
    { id: "span-2", service: "User Resolver", duration: 8 },
    { id: "span-3", service: "PostgreSQL", duration: 1250, status: "warning" as const },
    { id: "span-4", service: "Redis Cache", duration: 2, status: "success" as const },
  ]

  // Example 3: Failed request with error
  const errorTrace = [
    { id: "span-1", service: "Load Balancer", duration: 1 },
    { id: "span-2", service: "API Server", duration: 12 },
    { id: "span-3", service: "Auth Middleware", duration: 45, status: "success" as const },
    { id: "span-4", service: "External API", duration: 5000, status: "error" as const },
  ]

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-6">
      {/* Checkout Flow */}
      <div>
        <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          E-Commerce Checkout Flow
        </div>
        <TraceBreadcrumb
          requestId="checkout-a1b2c3d4-e5f6"
          spans={checkoutTrace}
        />
      </div>

      {/* Slow Query */}
      <div>
        <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          Slow Database Query
        </div>
        <TraceBreadcrumb
          requestId="query-7f8e9d0c-b1a2"
          spans={slowQueryTrace}
        />
      </div>

      {/* Error Trace */}
      <div>
        <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
          Failed External API Call
        </div>
        <TraceBreadcrumb
          requestId="error-x9y8z7w6-v5u4"
          spans={errorTrace}
        />
      </div>
    </div>
  )
}
