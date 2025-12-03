import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import itemsData from '@/data/items.json'
import ItemsClient from './ItemsClient'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'

export const metadata: Metadata = {
  title: 'All Items',
  description: `Complete list of all ${itemsData.length} items in ${siteConfig.name}`,
}

export default function ItemsPage() {
  return (
    <div className="container mx-auto px-4 py-10 2xl:px-[192px]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Items', url: '/items' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Items', url: '/items' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">All Items</h1>
        <p className="text-gray-600 text-lg">
          Browse through all {itemsData.length} items available in The Forge Roblox. Use filters to
          find exactly what you need. Click on any item to view detailed information, location, and
          usage tips.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-blue-800">
            Total Items: {itemsData.length}
          </span>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-purple-800">
            Legendary: {itemsData.filter((i) => i.stats.rarity === 'Legendary').length}
          </span>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-green-800">
            Rare: {itemsData.filter((i) => i.stats.rarity === 'Rare').length}
          </span>
        </div>
        <div className="bg-yellow-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-yellow-800">
            Uncommon: {itemsData.filter((i) => i.stats.rarity === 'Uncommon').length}
          </span>
        </div>
        <div className="bg-gray-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-gray-800">
            Common: {itemsData.filter((i) => i.stats.rarity === 'Common').length}
          </span>
        </div>
      </div>

      <ItemsClient />
    </div>
  )
}

