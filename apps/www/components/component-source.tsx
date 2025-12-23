import fs from "node:fs/promises"
import path from "node:path"
import * as React from "react"

import { getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export async function ComponentSource({
  name,
  src,
  title,
  className,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
}) {
  if (!name && !src) {
    return null
  }

  let code: string | undefined

  if (name) {
    const item = await getRegistryItem(name)
    code = item?.files?.[0]?.content
  }

  if (src) {
    try {
      const file = await fs.readFile(path.join(process.cwd(), src), "utf-8")
      code = file
    } catch (error) {
      console.error(`Failed to read file: ${src}`, error)
    }
  }

  if (!code) {
    return (
      <div className="text-muted-foreground text-sm p-4">
        Source code not available
      </div>
    )
  }

  return (
    <div className={cn("relative group", className)}>
      {title && (
        <div className="text-xs text-muted-foreground mb-2 font-mono">
          {title}
        </div>
      )}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton value={code} />
      </div>
      <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[450px] [&_pre]:overflow-auto">
        <pre className="bg-muted p-3 sm:p-4 rounded-md overflow-auto">
          <code className="text-xs sm:text-sm whitespace-pre font-mono">{code}</code>
        </pre>
      </div>
    </div>
  )
}
