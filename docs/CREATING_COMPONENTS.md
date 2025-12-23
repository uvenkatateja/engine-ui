# Creating New Components for Engine UI

This guide explains how to add new components to the Engine UI library.

## Files to Create/Update

When creating a new component, you need to update the following files:

### 1. Component File
`registry/default/ui/[component-name].tsx`

Create your component here. Example:
```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MyComponentProps {
  // props
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (
    // component JSX
  )
}
```

### 2. Demo File
`registry/default/example/[component-name]-demo.tsx`

Create a demo that showcases your component:
```tsx
"use client"

import { MyComponent } from "@/registry/default/ui/my-component"

export default function MyComponentDemo() {
  return (
    <div>
      <MyComponent />
    </div>
  )
}
```

### 3. Registry UI Definition
`registry/ui.ts`

Add your component to the registry:
```ts
{
  name: "my-component",
  type: "registry:ui",
  description: "Description of your component",
  dependencies: [], // npm dependencies
  files: [
    {
      path: "registry/default/ui/my-component.tsx",
      type: "registry:ui",
    },
  ],
  category: "Category Name",
  subcategory: "Subcategory",
},
```

### 4. Registry Examples Definition
`registry/examples.ts`

Add your demo to the examples:
```ts
{
  name: "my-component-demo",
  type: "registry:example",
  description: "Demo for MyComponent",
  registryDependencies: ["my-component"],
  files: [
    {
      path: "registry/default/example/my-component-demo.tsx",
      type: "registry:example",
    },
  ],
},
```

### 5. Registry Index (Auto-generated style)
`registry/__index__.tsx`

Add entries for both the component and demo:
```tsx
"my-component": {
  name: "my-component",
  description: "Description",
  type: "registry:ui",
  registryDependencies: undefined,
  files: [
    {
      path: "registry/default/ui/my-component.tsx",
      type: "registry:ui",
      target: "",
    },
  ],
  component: React.lazy(async () => {
    const mod = await import("@/registry/default/ui/my-component.tsx")
    return { default: mod.MyComponent || mod.default }
  }),
},
"my-component-demo": {
  name: "my-component-demo",
  description: "Demo for MyComponent",
  type: "registry:example",
  registryDependencies: ["my-component"],
  files: [
    {
      path: "registry/default/example/my-component-demo.tsx",
      type: "registry:example",
      target: "",
    },
  ],
  component: React.lazy(async () => {
    const mod = await import("@/registry/default/example/my-component-demo.tsx")
    return { default: mod.default }
  }),
},
```

### 6. Registry JSON
`registry.json`

Add your component for the CLI:
```json
{
  "name": "my-component",
  "type": "registry:ui",
  "description": "Description",
  "dependencies": [],
  "files": [
    {
      "path": "registry/default/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### 7. Docs Navigation
`config/docs.ts`

Add to the sidebar navigation:
```ts
{
  title: "My Component",
  href: "/docs/components/my-component",
},
```

### 8. Documentation Page
`app/(app)/docs/components/[component-name]/page.tsx`

Create the docs page:
```tsx
import { ComponentPreview } from "@/components/component-preview"
import { InstallationTabs } from "./installation-tabs"

export default function MyComponentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Component</h1>
        <p className="text-muted-foreground mt-2">
          Description of your component.
        </p>
      </div>

      <ComponentPreview name="my-component-demo" />

      <div>
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <InstallationTabs />
      </div>
    </div>
  )
}
```

### 9. Installation Tabs
`app/(app)/docs/components/[component-name]/installation-tabs.tsx`

Create installation instructions with CLI commands and manual code.

## Architecture Notes

### Source Code Display
Engine UI reads source code directly from component files at runtime using the registry system:

1. `lib/registry.ts` - Contains `getRegistryItem()` that reads file content from disk
2. `registry/__index__.tsx` - Maps component names to file paths and React.lazy imports
3. `app/api/registry/[name]/source/route.ts` - API endpoint that serves source code
4. `components/component-preview.tsx` - Client component that fetches and displays source

This means:
- Source code is always in sync with actual component files
- No need to manually update source code in multiple places
- Contributors only need to update the component file itself

## Checklist

- [ ] Create component file in `registry/default/ui/`
- [ ] Create demo file in `registry/default/example/`
- [ ] Add to `registry/ui.ts`
- [ ] Add demo to `registry/examples.ts`
- [ ] Add to `registry/__index__.tsx` (both component and demo)
- [ ] Add to `registry.json`
- [ ] Add to `config/docs.ts` navigation
- [ ] Create docs page in `app/(app)/docs/components/[name]/page.tsx`
- [ ] Create installation tabs in `app/(app)/docs/components/[name]/installation-tabs.tsx`
- [ ] Run `pnpm run build` to verify everything works
