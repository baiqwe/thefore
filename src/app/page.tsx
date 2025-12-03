import Link from 'next/link'
import { siteConfig } from '@/config/site'
import FeatureCard from '@/components/FeatureCard'
import SearchBar from '@/components/SearchBar'
import itemsData from '@/data/items.json'
import codesData from '@/data/codes.json'
import guidesData from '@/data/guides.json'
import questsData from '@/data/quests.json'
import { Sword, Hammer, Scroll, Key, Shield, Play } from 'lucide-react'
import YouTubeVideo from '@/components/YouTubeVideo'

export default function HomePage() {
  // 视频结构化数据
  const videos = [
    {
      name: "The Forge Gameplay Guide - Complete Walkthrough",
      description: "Complete gameplay guide for The Forge Roblox game. Learn how to play, mine ores, forge weapons, and master the game mechanics.",
      videoId: "GpJRxMgP99Q",
      uploadDate: "2024-11-01",
    },
    {
      name: "The Forge Race Tier List - Best Races Explained",
      description: "Complete race tier list for The Forge Roblox. Learn which races are the best, including S-tier Mythical races like Angel and Demon.",
      videoId: "pVrVDWXXrAw",
      uploadDate: "2024-11-01",
    },
  ]
  const featuredItems = itemsData.slice(0, 6)
  const totalItems = itemsData.length
  const activeCodes = codesData.filter((c) => c.status === 'Active')
  // Get top 3 latest codes: 200K!, 100K!, 40KLIKES
  const latestCodes = codesData
    .filter((c) => c.status === 'Active')
    .filter((c) => ['200K!', '100K!', '40KLIKES'].includes(c.code))
    .slice(0, 3)
  const featuredGuides = guidesData.slice(0, 3)
  const mainQuests = questsData.filter((q) => q.type === 'Main Quest').slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section 改版：以搜索和核心入口为中心 */}
      <div className="text-center mb-12 py-10 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-amber-100 dark:border-gray-800">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          The Forge Wiki
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Find items, active codes, and crafting recipes instantly.
        </p>
        
        {/* 核心改动：直接放置搜索栏 */}
        <div className="max-w-xl mx-auto mb-8 relative z-10">
          <SearchBar />
        </div>

        {/* 核心改动：高频快捷入口 (Quick Actions) */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/codes" className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30">
            🎁 Active Codes
            <span className="bg-white/20 text-xs py-0.5 px-2 rounded ml-1">{activeCodes.length} Available</span>
          </Link>
          <Link href="/wiki/races" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
            🏆 S-Tier Races
          </Link>
          <Link href="/tools/reroll-simulator" className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30">
            PF Reroll Sim
          </Link>
        </div>
      </div>

      {/* Latest Updates Section - 隐藏代码信息，改为点击查看 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Latest Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Codes Card - 诱导点击 */}
          <Link href="/codes" className="bg-white dark:bg-gray-800 border-l-4 border-green-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold rounded-full">CODES</span>
              <span className="text-xs text-gray-500">Updated Today</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">
              New Codes Available!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              We found <strong>{activeCodes.length} active codes</strong> for Gems and Rerolls. Click to redeem them now.
            </p>
          </Link>

          {/* Tier List Card */}
          <Link href="/wiki/race-tier-list" className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full">TIER LIST</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 transition-colors">
              Best Races Tier List
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Which race is S-Tier? Angel vs Demon? Check the complete stats ranking.
            </p>
          </Link>

          {/* Reroll Simulator Card */}
          <Link href="/tools/reroll-simulator" className="bg-white dark:bg-gray-800 border-l-4 border-purple-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-bold rounded-full">TOOL</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors">
              Reroll Simulator
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Simulate 100+ rerolls for free. Test your luck before spending Robux.
            </p>
          </Link>
        </div>
      </div>

      {/* Current Hot Topics - 前置到热门位置 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">🔥 Current Hot Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/quests"
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-800 shadow-md hover:shadow-lg transition-all p-6 group hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                <Key className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">How to Get Arcane Pickaxe</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Complete Bard&apos;s Lost Guitar quest to get the Unknown Key, then unlock the Fallen Angel&apos;s Cave 
              to obtain the best mining tool in The Forge Roblox.
            </p>
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm group-hover:underline">
              Read Guide →
            </span>
          </Link>

          <Link
            href="/wiki/race-tier-list"
            className="bg-gradient-to-r from-red-50 dark:from-red-900/20 to-orange-50 dark:to-orange-900/20 rounded-lg border-2 border-red-200 dark:border-red-800 shadow-md hover:shadow-lg transition-all p-6 group hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                <Sword className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Best Race for PVP</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Shadow (A-tier) is the PVP meta with dodge chance. Demon (S-tier Mythical) is also excellent for high damage output. 
              Learn all race stats and abilities.
            </p>
            <span className="text-red-600 dark:text-red-400 font-semibold text-sm group-hover:underline">
              View Tier List →
            </span>
          </Link>
        </div>
      </div>

      {/* Popular Guides Section - 前置 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">📚 Popular Guides</h2>
          <Link
            href="/wiki"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold"
          >
            View All Guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/wiki/${guide.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all p-6 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  {guide.category}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    guide.difficulty === 'Beginner'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                      : guide.difficulty === 'Expert'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                  }`}
                >
                  {guide.difficulty}
                </span>
          </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{guide.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{guide.description}</p>
              <div className="text-xs text-gray-600 dark:text-gray-400">By {guide.author}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* YouTube Videos Section - 前置 */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play className="h-8 w-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">🎥 Watch The Forge Gameplay Videos</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Learn from the best players! Watch these gameplay videos to master <strong>The Forge Roblox</strong> game.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">The Forge Gameplay Guide</h3>
            <YouTubeVideo
              videoId="GpJRxMgP99Q"
              title="The Forge Gameplay Guide - Complete Walkthrough"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Race Tier List Explained</h3>
            <YouTubeVideo
              videoId="pVrVDWXXrAw"
              title="The Forge Race Tier List - Best Races Explained"
            />
          </div>
        </div>
      </div>

      {/* Featured Items Section - 后置 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <Link
            href="/items"
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/item/${item.slug}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  {item.stats.rarity || 'Common'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold">Type:</span> {item.type}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold">Location:</span> {item.location}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{item.description}</p>
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
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            View All Quests →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainQuests.map((quest) => (
            <Link
              key={quest.id}
              href="/quests"
              className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 dark:border-amber-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{quest.title}</h3>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    quest.difficulty === 'Easy'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                      : quest.difficulty === 'Medium'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                      : quest.difficulty === 'Hard'
                      ? 'bg-orange-200 dark:bg-orange-900/40 text-orange-900 dark:text-orange-200'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}
                >
                  {quest.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{quest.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">💰 {quest.rewards.coins.toLocaleString()} Coins</span>
                <span className="text-gray-600 dark:text-gray-400">{quest.location}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* Game Info Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">About The Forge Roblox</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>The Forge</strong> is a popular Roblox RPG game by Fireatacck featuring manual forging minigames, 
          race systems, and hardcore RPG mechanics. Players mine ores, forge weapons, and battle enemies in this 
          action-packed adventure. This wiki provides a comprehensive database of all codes, races, guides, and strategies 
          to help you master the game.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-semibold mb-2">Game Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Manual forging minigame with 3 steps</li>
              <li>Race system with Mythical, Legendary, and Epic tiers</li>
              <li>Mining and crafting mechanics</li>
              <li>Quest system with unique rewards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Wiki Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Complete race tier list with stats</li>
              <li>Latest redeem codes and rewards</li>
              <li>Forging and quest guides</li>
              <li>Reroll simulator tool</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

