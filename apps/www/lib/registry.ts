import { promises as fs } from "fs"
import path from "path"

import { registryItemSchema, registryItemFileSchema } from "@/registry/schema"
import { Index } from "@/registry/__index__"
import { z } from "zod"

export function getRegistryComponent(name: string) {
  return Index[name]?.component
}

export async function getRegistryItem(name: string) {
  const item = Index[name]

  if (!item) {
    return null
  }

  // Convert all file paths to object
  item.files = item.files.map((file: unknown) =>
    typeof file === "string" ? { path: file } : file
  )

  // Fail early before doing expensive file operations
  const result = registryItemSchema.safeParse(item)
  if (!result.success) {
    return null
  }

  let files: typeof result.data.files = []
  for (const file of item.files) {
    const content = await getFileContent(file)
    const relativePath = path.relative(process.cwd(), file.path)

    files.push({
      ...file,
      path: relativePath,
      content,
    })
  }

  // Fix file paths
  files = fixFilePaths(files)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    return null
  }

  return parsed.data
}

async function getFileContent(file: z.infer<typeof registryItemFileSchema>) {
  try {
    const filePath = path.join(process.cwd(), file.path)
    const raw = await fs.readFile(filePath, "utf-8")
    
    // Return the raw source code without transforming imports
    // This shows users the exact code they need to copy
    return raw
  } catch (error) {
    console.error(`Failed to read file: ${file.path}`, error)
    return ""
  }
}

function getFileTarget(file: z.infer<typeof registryItemFileSchema>) {
  let target = file.target

  if (!target || target === "") {
    const fileName = file.path.split("/").pop()
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }
  }

  return target ?? ""
}

function fixFilePaths(files: z.infer<typeof registryItemSchema>["files"]) {
  if (!files) {
    return []
  }

  // Resolve all paths relative to the first file's directory
  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    }
  })
}

export function fixImport(content: string) {
  // Fix @/registry/default/ui/* imports to @/components/ui/*
  const regex = /@\/registry\/default\/(ui|example|lib|hooks)\/([\w-]+)/g

  const replacement = (
    match: string,
    type: string,
    component: string
  ) => {
    if (type === "ui") {
      return `@/components/ui/${component}`
    } else if (type === "example") {
      return `@/components/${component}`
    } else if (type === "hooks") {
      return `@/hooks/${component}`
    } else if (type === "lib") {
      return `@/lib/${component}`
    }
    return match
  }

  return content.replace(regex, replacement)
}
