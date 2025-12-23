"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex md:hidden">
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setOpen(!open)}
      >
        <Menu className="size-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  )
}
