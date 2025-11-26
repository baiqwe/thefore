import Link from 'next/link'
import { siteConfig } from '@/config/site'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 flex-shrink-0">
            {siteConfig.name}
          </Link>
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>
          <div className="flex space-x-4 lg:space-x-6 flex-shrink-0">
            {siteConfig.mainNav.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors hidden lg:block"
              >
                {item.title}
              </Link>
            ))}
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

