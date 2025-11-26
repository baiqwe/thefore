import Link from 'next/link'
import { siteConfig } from '@/config/site'
import FeatureCard from '@/components/FeatureCard'
import itemsData from '@/data/items.json'
import codesData from '@/data/codes.json'
import guidesData from '@/data/guides.json'
import questsData from '@/data/quests.json'

export default function HomePage() {
  const featuredItems = itemsData.slice(0, 6)
  const totalItems = itemsData.length
  const activeCodes = codesData.filter((c) => c.status === 'Active').slice(0, 3)
  const featuredGuides = guidesData.slice(0, 3)
  const mainQuests = questsData.filter((q) => q.type === 'Main Quest').slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {siteConfig.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {siteConfig.description}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/items"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Items
          </Link>
          <Link
            href="/locations"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            View Locations
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{totalItems}</div>
          <div className="text-gray-600">Total Items</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {itemsData.filter((item) => item.stats.rarity === 'Legendary').length}
          </div>
          <div className="text-gray-600">Legendary Items</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {new Set(itemsData.map((item) => item.location)).size}
          </div>
          <div className="text-gray-600">Unique Locations</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Use This Wiki?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Complete Item Database"
            description="Find every item, key, and tool in the mega store with detailed locations and descriptions."
            icon="📦"
          />
          <FeatureCard
            title="Survival Strategies"
            description="Learn the best strategies to survive the night with our comprehensive guides and tips."
            icon="🎯"
          />
          <FeatureCard
            title="Updated Regularly"
            description="Our database is constantly updated with the latest items and locations from the game."
            icon="🔄"
          />
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <Link
            href="/items"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/item/${item.slug}`}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {item.stats.rarity || 'Common'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Type:</span> {item.type}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {item.location}
              </p>
              <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Codes Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Redeem Codes</h2>
          <Link
            href="/codes"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View All Codes →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCodes.map((code, index) => (
            <div
              key={index}
              className="bg-white border-2 border-green-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                  ACTIVE
                </span>
                {code.expires !== 'Never' && (
                  <span className="text-xs text-gray-500">Expires: {code.expires}</span>
                )}
              </div>
              <div className="mb-3">
                <div className="bg-gray-100 p-3 rounded font-mono text-lg font-bold text-center border-2 border-dashed border-gray-300">
                  {code.code}
                </div>
              </div>
              <p className="text-blue-600 font-semibold mb-2">{code.reward}</p>
              <p className="text-sm text-gray-600">{code.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Guides Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Popular Guides</h2>
          <Link
            href="/guides"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View All Guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                  {guide.category}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    guide.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : guide.difficulty === 'Expert'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {guide.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{guide.description}</p>
              <div className="text-xs text-gray-500">By {guide.author}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Quests Preview */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Main Quests</h2>
          <Link
            href="/quests"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View All Quests →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainQuests.map((quest) => (
            <Link
              key={quest.id}
              href="/quests"
              className="bg-white border-l-4 border-blue-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold">{quest.title}</h3>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    quest.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : quest.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : quest.difficulty === 'Hard'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {quest.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quest.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-600 font-bold">💰 {quest.rewards.coins.toLocaleString()} Coins</span>
                <span className="text-gray-500">{quest.location}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Game Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">About Survive Overnight in a Mega Store</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Survive Overnight in a Mega Store is a survival horror game where players must navigate
          through a massive retail store after dark. With limited resources, dangerous enemies, and
          mysterious events, players must find keys, items, and tools to survive until morning.
          This wiki provides a comprehensive database of all items, locations, and strategies to
          help you make it through the night.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-semibold mb-2">Game Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Explore a massive mega store with multiple floors</li>
              <li>Find and collect various items and tools</li>
              <li>Complete quests and challenges</li>
              <li>Survive against dangerous enemies</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Wiki Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Complete item database with locations</li>
              <li>Comprehensive guides and strategies</li>
              <li>Latest redeem codes and rewards</li>
              <li>Quest walkthroughs and tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

