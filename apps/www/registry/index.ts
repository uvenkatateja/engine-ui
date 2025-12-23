import { examples } from "./examples"
import type { Registry } from "./schema"
import { ui } from "./ui"

export const registry: Registry = {
  name: "engine-ui",
  homepage: "https://engine-ui.vercel.app",
  items: [...ui, ...examples],
}
