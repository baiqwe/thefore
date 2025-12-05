'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site'
import SearchBar from './SearchBar'
import { Play, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="/" className="text-xl font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 flex-shrink-0">
            {siteConfig.name}
          </a>
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
            {siteConfig.mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={(item as any).external ? "_blank" : undefined}
                rel={(item as any).external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors hidden lg:block whitespace-nowrap"
              >
                {item.title}
              </a>
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
              <button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search Bar */}
              <div className="md:hidden mb-4">
                <SearchBar />
              </div>
              
              {/* Navigation Links */}
              {siteConfig.mainNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  target={(item as any).external ? "_blank" : undefined}
                  rel={(item as any).external ? "noopener noreferrer" : undefined}
                  className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2"
                >
                  {item.title}
                </a>
              ))}
              
              {/* Play Now Button for Mobile */}
              <a
                href={siteConfig.links.game}
                onClick={closeMenu}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors text-center mt-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  <span>Play Now</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

