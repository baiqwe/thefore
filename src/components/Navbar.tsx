"use client"

import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-amber-500 hover:text-amber-400 transition-colors flex-shrink-0 glow-hover"
          >
            {siteConfig.name}
          </Link>
          <div className="flex-1 max-w-md hidden md:flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="search"
                placeholder="Search guides, codes, races..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2 lg:space-x-4 flex-shrink-0">
            {siteConfig.mainNav.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition-colors hidden lg:block"
                  >
                    {item.title}
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition-colors hidden lg:block"
                >
                  {item.title}
                </Link>
              )
            })}
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="icon">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
