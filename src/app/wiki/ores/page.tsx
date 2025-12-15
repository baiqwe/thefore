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
        faq={[
          {
            question: "How to get Stone in The Forge?",
            answer: "Stone is the most common material found at <strong>Depth 0-10m</strong> (Surface Level). Simply use your starting pickaxe to mine any grey rocks in the spawn area or the entrance of the mine. It has a 100% drop rate from grey nodes."
          }
        ]}
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

      {/* Mining Deep Guide (Aggregation Strategy) */}
      <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl border border-gray-200 mt-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mining Deep Guide: From Surface to 1000m</h2>

        <p className="text-gray-700 mb-6">
          Many players ask: <em>&quot;What is the best depth for money?&quot;</em> or <em>&quot;Is the Arcane Pickaxe worth it?&quot;</em>.
          This comprehensive guide condenses everything we know about mining efficiency in The Forge.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Speed Mining (0-100m Strategy)</h3>
        <p className="text-gray-700">
          The fastest way to level up your mining skill early on is NOT to hunt for Gold.
          Instead, focus on <strong>Surface Stripping</strong> (Depth 0-50m).
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
          <li><strong>Target:</strong> Stone & Coal.</li>
          <li><strong>Why:</strong> They break instantly with a Bronze Pickaxe. You gain XP per block broken, not per ore value.</li>
          <li><strong>Speed:</strong> You can break 60-100 blocks per minute here vs 10 blocks at 500m.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Finding the Fallen Angel&apos;s Cave</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded my-4">
          <p className="font-bold text-blue-900">
            Location Hint: Depth 350m - 400m
          </p>
        </div>
        <p className="text-gray-700">
          The <strong>Fallen Angel&apos;s Cave</strong> is a secret biome that contains unique loot.
          Look for a distinct change in wall texture (white/marble veins) around the 375m mark.
          You will need the <strong>Unknown Key</strong> from the Bard&apos;s Quest to enter.
          <em>(See our <a href="/quests" className="text-blue-600 underline">Quests Guide</a> for the Key).</em>
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Is the Arcane Pickaxe Worth It?</h3>
        <p className="text-gray-700">
          <strong>Short Answer: YES.</strong>
        </p>
        <p className="text-gray-700 mt-2">
          Many players hesitate because crafting it costs 5,000 Coins and requires rare materials.
          However, the math supports the investment:
        </p>
        <table className="w-full mt-4 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Pickaxe</th>
              <th className="p-2 text-left">Mining Speed</th>
              <th className="p-2 text-left">Special Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-semibold">Iron Pickaxe</td>
              <td className="p-2">1.5s / block</td>
              <td className="p-2">None</td>
            </tr>
            <tr className="bg-amber-50">
              <td className="p-2 font-bold text-amber-700">Arcane Pickaxe</td>
              <td className="p-2 text-amber-900">0.4s / block</td>
              <td className="p-2 text-amber-900">Chance to double ore drops</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mt-4">
          The <strong>Double Ore</strong> chance alone pays off the investment in about 2 hours of mining at Depth 500m+.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Common Mining Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              How to get Stone in The Forge?
            </h3>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Stone is the most common material found at <strong>Depth 0-10m</strong> (Surface Level).
                Simply use your starting pickaxe to mine any grey rocks in the spawn area or the entrance of the mine.
                It has a 100% drop rate from grey nodes.
              </p>
            </div>
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

