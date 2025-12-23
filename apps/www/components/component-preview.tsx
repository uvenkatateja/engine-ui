"use client"

import * as React from "react"
import { Suspense } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Index } from "@/registry/__index__"
import { CopyButton } from "@/components/copy-button"

interface ComponentPreviewTabsProps {
  component: React.ReactNode
  source: React.ReactNode
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}

export function ComponentPreviewTabs({
  component,
  source,
  align = "center",
  hideCode = false,
  className,
}: ComponentPreviewTabsProps) {
  return (
    <div className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}>
      <Tabs defaultValue="preview" className="relative w-full">
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          )}
        </div>
        
        <TabsContent value="preview" className="mt-2">
          <div className="rounded-lg border">
            <div
              data-align={align}
              className={cn(
                "preview flex overflow-x-auto overflow-y-auto w-full justify-center p-4",
                "data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
              )}
            >
              {component}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="mt-2">
          <div className="rounded-lg border overflow-hidden">
            {source}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ComponentPreviewProps {
  name: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  className?: string
}

export function ComponentPreview({
  name,
  align = "center",
  hideCode = false,
  className,
}: ComponentPreviewProps) {
  // Get component from registry index
  const registryItem = Index[name]
  const Component = registryItem?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={
        <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
          <Component />
        </Suspense>
      }
      source={<ComponentSourceClient name={name} />}
    />
  )
}

// Client-side source code display that fetches from API
function ComponentSourceClient({ name }: { name: string }) {
  const [code, setCode] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchSource() {
      try {
        const response = await fetch(`/api/registry/${name}/source`)
        if (response.ok) {
          const data = await response.json()
          setCode(data.code)
        }
      } catch (error) {
        console.error("Failed to fetch source:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSource()
  }, [name])

  if (loading) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Loading source...
      </div>
    )
  }

  if (!code) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Source code not available
      </div>
    )
  }

  return (
    <div className="relative group/code">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
        <CopyButton value={code} />
      </div>
      <pre className="bg-muted p-4 overflow-auto max-h-[500px] no-scrollbar">
        <code className="text-sm font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
