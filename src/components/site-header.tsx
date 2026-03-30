import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 justify-between sm:gap-8 px-4 sm:px-8">
        <MainNav
          items={[
            {
              title: "Features",
              href: "/#features",
            },
            {
              title: "Reports",
              href: "/reports",
            },
            {
              title: "LogicHive",
              href: "/logichive",
            },
            {
              title: "Docs",
              href: "/docs",
              disabled: true,
            },
          ]}
        />
        <nav className="flex items-center space-x-2">
           <Link
            href="/login"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className={cn(
              "hidden sm:flex px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            )}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
