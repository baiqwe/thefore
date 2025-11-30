import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import itemsData from '@/data/items.json'
import { siteConfig } from '@/config/site'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import SEOHead from '@/components/SEOHead'
import Breadcrumbs from '@/components/Breadcrumbs'

// Type 定义
interface Item {
  slug: string
  name: string
  location: string
  type: string
  description: string
  stats: Record<string, string>
}

interface PageProps {
  params: {
    slug: string
  }
}

// 1. [SEO] 动态生成 Meta 标签
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = itemsData.find((i) => i.slug === params.slug)
  if (!item) return {}
  
  return generateSEOMetadata({
    title: `${item.name} Location & Guide`,
    description: `Find ${item.name} in ${siteConfig.name}. Location: ${item.location}. ${item.description}`,
    keywords: [
      item.name,
      `${item.name} location`,
      `${item.name} guide`,
      'The Forge Wiki',
      'Roblox The Forge',
      item.type,
    ],
    canonicalUrl: `${siteConfig.url}/item/${item.slug}`,
    type: 'article',
  })
}

// 2. [SSG] 告诉 Next.js 在构建时生成哪些页面
// 这就是为什么你不需要服务器，Next.js 会预先把 items.json 里所有页面都造好
export async function generateStaticParams() {
  return itemsData.map((item) => ({
    slug: item.slug,
  }))
}

// 3. 页面渲染逻辑
export default function ItemPage({ params }: PageProps) {
  const item = itemsData.find((i) => i.slug === params.slug)

  if (!item) {
    notFound()
  }

  const rarity = item.stats.rarity || 'Common'
  const rarityColors: Record<string, string> = {
    Legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Rare: 'bg-purple-100 text-purple-800 border-purple-300',
    Uncommon: 'bg-blue-100 text-blue-800 border-blue-300',
    Common: 'bg-gray-100 text-gray-800 border-gray-300',
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* SEO Head with Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Items', url: '/items' },
          { name: item.name, url: `/item/${item.slug}` },
        ]}
        article={{
          title: `${item.name} Location & Guide`,
          description: `Find ${item.name} in ${siteConfig.name}. Location: ${item.location}. ${item.description}`,
          url: `/item/${item.slug}`,
          author: 'The Forge Wiki',
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Items', url: '/items' },
          { name: item.name, url: `/item/${item.slug}` },
        ]}
      />

      {/* 标题和稀有度 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold">{item.name}</h1>
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full border ${rarityColors[rarity] || rarityColors.Common}`}
          >
            {rarity}
          </span>
        </div>
        <p className="text-xl text-gray-600">{item.type}</p>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 左侧：物品统计表格 */}
        <div className="bg-slate-50 p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Item Information</h2>
          <table className="w-full text-left">
            <tbody className="space-y-2">
              <tr className="border-b border-gray-200">
                <th className="py-3 text-gray-600 font-semibold w-1/3">Type</th>
                <td className="py-3 font-medium">{item.type}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-gray-600 font-semibold">Location</th>
                <td className="py-3">
                  <span className="text-blue-600 font-bold">{item.location}</span>
                </td>
              </tr>
              {Object.entries(item.stats).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <th className="py-3 text-gray-600 font-semibold capitalize">
                    {key.replace(/-/g, ' ')}
                  </th>
                  <td className="py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右侧：描述和图片占位符 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{item.description}</p>
          </div>
          
          {/* 物品图片 - 使用 Next.js Image 组件优化 */}
          <div className="mt-6 aspect-video relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden border border-gray-200">
            {/* 如果有真实图片 URL，使用 Image 组件；否则显示占位符 */}
            {(item as any).imageUrl ? (
              <Image
                src={(item as any).imageUrl}
                alt={`${item.name} in The Forge Roblox - ${item.type}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2" aria-hidden="true">📦</div>
                  <div className="text-sm font-medium text-gray-600">Image of {item.name}</div>
                  <p className="text-xs text-gray-500 mt-2">Screenshot coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 如何获取 (How to Obtain) */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-3 text-amber-900">📍 How to Obtain {item.name}</h3>
        <p className="text-amber-800 mb-2">
          <strong>Location:</strong> {item.location}
        </p>
        <p className="text-amber-800">
          {(item as any).obtainMethod || `Find ${item.name} at ${item.location}. ${item.type === 'Key Item' ? 'This is essential for progression and unlocking new areas.' : item.type === 'Weapon' ? 'Make sure to equip this weapon for better combat effectiveness.' : 'Keep an eye out for this item when exploring.'}`}
        </p>
      </div>

      {/* 用途 (Usage) */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-3 text-green-900">⚙️ Usage & Purpose</h3>
        <p className="text-green-800 mb-2">
          {(item as any).usage || (item.type === 'Key Item' 
            ? `${item.name} is used to unlock restricted areas and access new locations in The Forge. Essential for progression.`
            : item.type === 'Weapon'
            ? `${item.name} can be used for combat and defense. Equip it to increase your combat effectiveness.`
            : item.type === 'Consumable'
            ? `${item.name} can be consumed to restore health, stamina, or provide temporary buffs. Use strategically.`
            : `${item.name} is useful for various purposes in The Forge. Make sure to keep it in your inventory.`)}
        </p>
        {(item as any).sellPrice && (
          <p className="text-green-800">
            <strong>Sell Price:</strong> {(item as any).sellPrice} coins
          </p>
        )}
      </div>

      {/* 相关配方 (Crafting Recipes) */}
      {(item as any).craftingRecipe && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-3 text-purple-900">🔨 Crafting Recipe</h3>
          <p className="text-purple-800">
            {(item as any).craftingRecipe}
          </p>
        </div>
      )}

      {/* 使用提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3 text-blue-900">💡 Pro Tip</h3>
        <p className="text-blue-800">
          {item.type === 'Key Item' 
            ? `This is a key item essential for progression. Make sure to prioritize finding ${item.name} at ${item.location}.`
            : item.type === 'Weapon'
            ? `This weapon can be used for both offense and defense. Keep it in good condition and use it wisely.`
            : item.type === 'Consumable'
            ? `Use this item strategically. Don't waste it on minor situations - save it for when you really need it.`
            : `This item is valuable for your survival. Make sure to check ${item.location} when you're in that area.`}
        </p>
      </div>

      {/* 相关物品推荐 */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {itemsData
            .filter((i) => i.slug !== item.slug && (i.type === item.type || i.location === item.location))
            .slice(0, 3)
            .map((relatedItem) => (
              <Link
                key={relatedItem.slug}
                href={`/item/${relatedItem.slug}`}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2">{relatedItem.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Location:</span> {relatedItem.location}
                </p>
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {relatedItem.stats.rarity || 'Common'}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

