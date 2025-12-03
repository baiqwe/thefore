import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import codesData from '@/data/codes.json'
import guidesData from '@/data/guides.json'

export default function NotFound() {
  const activeCodes = codesData.filter((code) => code.status === 'Active').slice(0, 3)
  const popularGuides = guidesData.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl 2xl:px-[192px]">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist in our database.
        </p>
        
        {/* 搜索栏 */}
        <div className="max-w-md mx-auto mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Search for what you need:</h3>
          <SearchBar />
        </div>

        <Link
          href="/"
          className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>

      {/* 热门链接 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 最新代码 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Latest Active Codes</h3>
          <ul className="space-y-3">
            {activeCodes.map((code, index) => (
              <li key={index}>
                <Link
                  href="/codes"
                  className="block p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="font-mono font-bold text-gray-800">{code.code}</div>
                  <div className="text-sm text-gray-600 mt-1">{code.reward}</div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/codes"
            className="mt-4 text-amber-600 hover:text-amber-700 font-semibold text-sm block"
          >
            View All Codes →
          </Link>
        </div>

        {/* 热门指南 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Popular Guides</h3>
          <ul className="space-y-3">
            {popularGuides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/wiki/${guide.slug}`}
                  className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <div className="font-semibold text-gray-800">{guide.title}</div>
                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">{guide.description}</div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/wiki"
            className="mt-4 text-amber-600 hover:text-amber-700 font-semibold text-sm block"
          >
            View All Guides →
          </Link>
        </div>
      </div>

      {/* 快速链接 */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/codes" className="text-amber-600 hover:text-amber-700 font-medium">
            Codes
          </Link>
          <Link href="/wiki/races" className="text-amber-600 hover:text-amber-700 font-medium">
            Race Tier List
          </Link>
          <Link href="/wiki/forging" className="text-amber-600 hover:text-amber-700 font-medium">
            Forging Guide
          </Link>
          <Link href="/quests" className="text-amber-600 hover:text-amber-700 font-medium">
            Quests
          </Link>
          <Link href="/items" className="text-amber-600 hover:text-amber-700 font-medium">
            Items
          </Link>
        </div>
      </div>
    </div>
  )
}

