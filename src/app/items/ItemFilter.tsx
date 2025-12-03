'use client'

import { useState } from 'react'

interface ItemFilterProps {
  onFilterChange: (filters: {
    type: string
    rarity: string
    search: string
  }) => void
}

export default function ItemFilter({ onFilterChange }: ItemFilterProps) {
  const [type, setType] = useState('all')
  const [rarity, setRarity] = useState('all')
  const [search, setSearch] = useState('')

  const handleTypeChange = (value: string) => {
    setType(value)
    onFilterChange({ type: value, rarity, search })
  }

  const handleRarityChange = (value: string) => {
    setRarity(value)
    onFilterChange({ type, rarity: value, search })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ type, rarity, search: value })
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Types</option>
            <option value="Key Item">Key Item</option>
            <option value="Tool">Tool</option>
            <option value="Weapon">Weapon</option>
            <option value="Consumable">Consumable</option>
            <option value="Equipment">Equipment</option>
            <option value="Resource">Resource</option>
            <option value="Crafting Material">Crafting Material</option>
          </select>
        </div>

        {/* Rarity Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rarity</label>
          <select
            value={rarity}
            onChange={(e) => handleRarityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Rarities</option>
            <option value="Legendary">Legendary</option>
            <option value="Rare">Rare</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Common">Common</option>
          </select>
        </div>
      </div>
    </div>
  )
}

