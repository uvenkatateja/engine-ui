import { NextResponse } from "next/server"
import { getRegistryItem } from "@/lib/registry"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const item = await getRegistryItem(name)
    
    if (!item || !item.files?.[0]?.content) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      code: item.files[0].content,
      name: item.name,
      description: item.description,
    })
  } catch (error) {
    console.error("Failed to get registry item:", error)
    return NextResponse.json(
      { error: "Failed to load source" },
      { status: 500 }
    )
  }
}
