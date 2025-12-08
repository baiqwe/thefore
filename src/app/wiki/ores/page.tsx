'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Search, Pickaxe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import oresData from '@/data/ores.json'

import SEOHead from '@/components/SEOHead'
import Breadcrumbs from '@/components/Breadcrumbs'

type SortOrder = 'asc' | 'desc' | null

// Rarity color mapping for badges
const getRarityBadgeVariant = (rarity: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (rarity) {
    case 'Common':
      return 'secondary'
    case 'Uncommon':
      return 'outline'
    case 'Rare':
      return 'default'
    case 'Epic':
      return 'default'
    case 'Legendary':
      return 'destructive'
    case 'Mythical':
      return 'destructive'
    case 'Godly':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export default function OresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)

  // Filter and sort ores
  const filteredAndSortedOres = useMemo(() => {
    let filtered = oresData.filter((ore) =>
      ore.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.value - b.value
        } else {
          return b.value - a.value
        }
      })
    }

    return filtered
  }, [searchQuery, sortOrder])

  const handleSort = () => {
    if (sortOrder === null) {
      setSortOrder('desc')
    } else if (sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder(null)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Ores Database', url: '/wiki/ores' },
        ]}
      />

      {/* SEO Head with Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Ores Database', url: '/wiki/ores' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Table',
          about: 'The Forge Roblox Ores Database',
          name: 'The Forge Ores & Price List',
          description: 'Complete database of all ores in The Forge Roblox with sell prices, rarity, and depth locations',
        }}
      />

      {/* SEO Intro Content */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Pickaxe className="h-8 w-8 text-amber-600" />
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
            The Forge Roblox Ores & Price List
          </h1>
        </div>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          Mining is one of the core mechanics in <strong>The Forge Roblox</strong>. Understanding which ores to mine and where to find them is crucial for maximizing your profits and crafting powerful weapons.
          This complete ores database includes all 12 ores available in the game, from common <strong>Stone</strong> to the legendary <strong>Luminite</strong>.
        </p>
        <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed mb-4">
          The deeper you mine, the more valuable ores you&apos;ll find. <strong>Mythical ores</strong> like <strong>Adamantite</strong> (worth 1,200 coins) and <strong>Godly Luminite</strong> (worth 2,500 coins) are extremely rare and can only be found at depths of 900m+ and 1000m+ respectively.
          These high-value ores are essential for crafting the best weapons and progressing in the game. Use this guide to plan your mining strategy and maximize your earnings.
        </p>
        <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
          Remember: Higher rarity ores not only sell for more but are also required for crafting <a href="/wiki/forging" className="text-amber-600 hover:underline font-semibold">masterwork weapons</a>.
          Check our <a href="/wiki/races" className="text-amber-600 hover:underline font-semibold">Race Tier List</a> to see which race is best for mining, or use our <a href="/codes" className="text-amber-600 hover:underline font-semibold">codes</a> to get free rerolls for the perfect mining race.
        </p>
      </div>

      {/* Search and Sort Controls */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search ores by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-semibold whitespace-nowrap"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === null && 'Sort by Value'}
              {sortOrder === 'desc' && 'Highest First'}
              {sortOrder === 'asc' && 'Lowest First'}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Ores Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Complete Ores Database</CardTitle>
          <p className="text-sm text-gray-700 mt-2">
            Showing {filteredAndSortedOres.length} of {oresData.length} ores
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ore Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sell Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rarity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Multiplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Trait
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedOres.map((ore) => (
                  <tr
                    key={ore.name}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold text-lg ${ore.color}`}>
                        {ore.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-semibold">
                        ${(ore.value || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRarityBadgeVariant(ore.rarity)}>
                        {ore.rarity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {ore.location || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-semibold text-amber-600">×{ore.multiplier || 0}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {ore.trait ? (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {ore.trait}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mining Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Mining Tips & Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Best Mining Races</h3>
            <p className="text-gray-700">
              The <strong>Dwarf</strong> race provides +20% mining speed, making it the best choice for dedicated miners.
              Check our <a href="/wiki/races" className="text-amber-600 hover:underline font-semibold">Race Tier List</a> for more details.
              For combat-focused mining, consider <strong>Demon</strong> or <strong>Dragonborn</strong> races.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Depth Strategy</h3>
            <p className="text-gray-700">
              Start mining at shallow depths (0-100m) to collect common ores like Stone and Coal.
              As you progress, venture deeper to find rare ores. Mythical and Godly ores require reaching depths of 900m+.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Profit Optimization</h3>
            <p className="text-gray-700">
              Focus on mining <strong>Gold</strong> (60 coins) and <strong>Platinum</strong> (100 coins) at mid-depths for consistent profits.
              Save your best picks for deep mining expeditions to find <strong>Demonite</strong> (400 coins), <strong>Titanium</strong> (700 coins), and <strong>Adamantite</strong> (1,200 coins).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Links */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/wiki/forging" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Forging Guide (Craft Weapons from Ores)
          </a>
          <a href="/wiki/races" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Best Races for Mining (Dwarf +20% Speed)
          </a>
          <a href="/items" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Pickaxes & Mining Tools
          </a>
        </div>
      </div>
    </div >
  )
}

