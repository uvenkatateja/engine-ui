import { examples } from "./examples"
import type { Registry } from "./schema"
import { ui } from "./ui"

export const registry: Registry = {
  name: "ungine-ui",
  homepage: "https://ungine.vercel.app",
  items: [...ui, ...examples],
}
