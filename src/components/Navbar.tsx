import Link from 'next/link'
import { siteConfig } from '@/config/site'
import SearchBar from './SearchBar'
import { Play } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-amber-600 hover:text-amber-700 flex-shrink-0">
            {siteConfig.name}
          </Link>
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
            {siteConfig.mainNav.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={(item as any).external ? "_blank" : undefined}
                rel={(item as any).external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors hidden lg:block"
              >
                {item.title}
              </Link>
            ))}
            {/* Play Now Button */}
            <a
              href={siteConfig.links.game}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Play Now</span>
              <span className="sm:hidden">Play</span>
            </a>
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

