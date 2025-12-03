import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import guidesData from '@/data/guides.json'

export const metadata: Metadata = {
  title: 'Guides & Strategies',
  description: `Comprehensive guides and strategies for ${siteConfig.name}`,
}

export default function GuidesPage() {
  const categories = Array.from(new Set(guidesData.map((g) => g.category)))

  const categoryIcons: Record<string, string> = {
    Basics: '📚',
    Advanced: '🎯',
    Reference: '📖',
    Combat: '⚔️',
    Walkthrough: '🗺️',
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Guides & Strategies</h1>
        <p className="text-gray-600 text-lg">
          Master the game with our comprehensive guides. From beginner tips to advanced strategies,
          we&apos;ve got you covered.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            All Guides
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {guidesData.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{categoryIcons[guide.category] || '📝'}</span>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                  {guide.category}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  guide.difficulty === 'Beginner'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : guide.difficulty === 'Expert'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    : guide.difficulty === 'Intermediate'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                }`}
              >
                {guide.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>By {guide.author}</span>
              <span>Updated {guide.lastUpdated}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {guide.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Tips for The Forge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">For Beginners</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Complete Bard&apos;s Lost Guitar quest early for the Arcane Pickaxe</li>
              <li>Start mining at shallow depths to learn the mechanics</li>
              <li>Practice the forging minigame with common ores first</li>
              <li>Save rare gems (Topaz, Rubies) for the Goblin King quest</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">For Experts</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Optimize mining routes based on ore depth requirements</li>
              <li>Master the 3-step forging minigame for Masterwork quality</li>
              <li>Use race reroll codes to get your ideal race (Shadow for PVP)</li>
              <li>Plan Goblin King tributes before starting the quest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

