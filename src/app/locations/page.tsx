import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import itemsData from '@/data/items.json'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'

export const metadata: Metadata = {
  title: 'Locations',
  description: `All locations in The Forge Roblox where items can be found`,
}

export default function LocationsPage() {
  // 按位置分组物品
  const locationMap = new Map<string, typeof itemsData>()
  
  itemsData.forEach((item) => {
    const location = item.location
    if (!locationMap.has(location)) {
      locationMap.set(location, [])
    }
    locationMap.get(location)!.push(item)
  })

  // 转换为数组并按物品数量排序
  const locations = Array.from(locationMap.entries())
    .map(([location, items]) => ({
      location,
      items,
      count: items.length,
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="container mx-auto px-4 py-10 2xl:px-[192px]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Game Locations</h1>
        <p className="text-gray-600 text-lg">
          Explore all locations in The Forge Roblox and discover what items can be found in each area. From mining depths to quest locations, find everything you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(({ location, items, count }) => (
          <div
            key={location}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{location}</h2>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/item/${item.slug}`}
                  className="block text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  → {item.name}
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {item.stats.rarity || 'Common'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

