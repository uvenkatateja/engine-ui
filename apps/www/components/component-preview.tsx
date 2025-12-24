import { Suspense } from "react"

import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
}) {
  const Component = Index[name]?.component

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
      source={<ComponentSource name={name} />}
      {...props}
    />
  )
}
