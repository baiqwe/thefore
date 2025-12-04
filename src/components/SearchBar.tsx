'use client'

import { useState } from 'react'
import itemsData from '@/data/items.json'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof itemsData>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length > 0) {
      const filtered = itemsData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) ||
          item.location.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filtered.slice(0, 5))
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search items, locations..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((item) => (
            <a
              key={item.slug}
              href={`/item/${item.slug}`}
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.type} • {item.location}</div>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {item.stats.rarity || 'Common'}
                </span>
              </div>
            </a>
          ))}
          {results.length === 5 && (
            <div className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              <a href={`/items?search=${query}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                View all results →
              </a>
            </div>
          )}
        </div>
      )}

      {showResults && query.length > 0 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center text-gray-500 dark:text-gray-400">
          No results found
        </div>
      )}
    </div>
  )
}

