import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

// Use the registry.json file to generate static paths.
export const generateStaticParams = async () => {
  const registryData = await import("@/registry.json")
  const registry = registryData.default

  const params: { name: string }[] = []
  
  registry.items.forEach((item: { name: string }) => {
    // Generate both with and without .json extension
    params.push({ name: item.name })
    params.push({ name: `${item.name}.json` })
  })

  return params
}

// This route serves component JSON for shadcn CLI
export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    
    // Remove .json extension if present
    const componentName = name.replace(/\.json$/, "")
    
    // Cache the registry import
    const registryData = await import("@/registry.json")
    const registry = registryData.default

    // Find the component from the registry.
    const component = registry.items.find((c: { name: string }) => c.name === componentName)

    // If the component is not found, return a 404 error.
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      )
    }

    // If the component has no files, return a 400 error.
    if (!component.files?.length) {
      return NextResponse.json(
        { error: "Component has no files" },
        { status: 400 }
      )
    }

    // Read all files in parallel.
    const filesWithContent = await Promise.all(
      component.files.map(async (file: { path: string; type: string }) => {
        const filePath = path.join(process.cwd(), file.path)
        const content = await fs.readFile(filePath, "utf8")
        return { ...file, content }
      })
    )

    // Return the component with the files.
    return NextResponse.json({ ...component, files: filesWithContent })
  } catch (error) {
    console.error("Error processing component request:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
