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
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      {/* Hero Section 改版：以搜索和核心入口为中心 */}
      <div className="text-center mb-12 py-10 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-amber-100 dark:border-gray-800">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          The Forge Wiki
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Find items, active codes, and crafting recipes instantly.
        </p>

        {/* 核心改动：直接放置搜索栏 - 居中显示 */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-full max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* 核心改动：高频快捷入口 (Quick Actions) */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/codes" className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30">
            🎁 Active Codes
            <span className="bg-white/20 text-xs py-0.5 px-2 rounded ml-1">{activeCodes.length} Available</span>
          </a>
          <a href="/wiki/races" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
            🏆 S-Tier Races
          </a>
          <a href="/wiki/best-builds" className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30">
            🔥 Best Builds
          </a>
          {/* 新增按钮：高亮 "Best" */}
          <a href="/tools/forging-calculator" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
            🧮 Best Calculator
          </a>
        </div>
      </div>

      {/* WINTER 2025 META RECIPES - 核心新增区域 */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <Sword className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Winter 2025 Meta Recipes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Flash Recipe */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6 relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
              SPEED META
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">The Flash (Katana)</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Maximum movement speed build for quick farming.
            </p>
            <div className="bg-white/80 dark:bg-black/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-1 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span>Recipe:</span>
                <span>10 Ores Total</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span className="font-semibold">4x Lightite</span>
                  <span className="text-gray-500 text-xs">(Velocity)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="font-semibold">6x Diamond</span>
                  <span className="text-gray-500 text-xs">(Damage Base)</span>
                </li>
              </ul>
            </div>
            <a href="/wiki/best-builds" className="block w-full text-center py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg transition-colors">
              View Stats & Details
            </a>
          </div>

          {/* World Ender Recipe */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-2 border-red-500 dark:border-red-700 rounded-xl p-6 relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              AOE / XP META
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">The World Ender</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Colossal Sword that wipes entire screens. Best for XP.
            </p>
            <div className="bg-white/80 dark:bg-black/20 rounded-lg p-3 mb-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-1 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span>Recipe:</span>
                <span>40 Ores Total</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="font-semibold">10x Magmaite + 10x Fireite</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="font-semibold">10x Galaxite + 10x Darkryte</span>
                </li>
              </ul>
            </div>
            <a href="/wiki/best-builds" className="block w-full text-center py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors">
              View Full Guide
            </a>
          </div>
        </div>
      </div>

      {/* Latest Updates Section - 隐藏代码信息，改为点击查看 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Latest Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Codes Card - 诱导点击 */}
          <a href="/codes" className="bg-white dark:bg-gray-800 border-l-4 border-green-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
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
          </a>

          {/* Tier List Card */}
          <a href="/wiki/race-tier-list" className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full">TIER LIST</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 transition-colors">
              Best Races Tier List
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Which race is S-Tier? Angel vs Demon? Check the complete stats ranking.
            </p>
          </a>

          {/* Reroll Simulator Card */}
          {/* Best Builds Card */}
          <a href="/wiki/best-builds" className="bg-white dark:bg-gray-800 border-l-4 border-purple-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-bold rounded-full">META</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors">
              Strongest Weapon Builds
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Discover the &quot;Poor Man&apos;s Legendary&quot; and &quot;World Ender&quot; recipes for Winter 2025.
            </p>
          </a>
        </div>
      </div>

      {/* Current Hot Topics - 前置到热门位置 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">🔥 Current Hot Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
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
          </a>

          <a
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
          </a>
        </div>
      </div>

      {/* Popular Guides Section - 前置 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">📚 Popular Guides</h2>
          <a
            href="/wiki"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold"
          >
            View All Guides →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <a
              key={guide.slug}
              href={`/wiki/${guide.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all p-6 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  {guide.category}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${guide.difficulty === 'Beginner'
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
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{guide.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{guide.description}</p>
              <div className="text-xs text-gray-600 dark:text-gray-400">By {guide.author}</div>
            </a>
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
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Featured Items</h2>
          <a
            href="/items"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <a
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
            </a>
          ))}
        </div>
      </div>


      {/* Main Quests Preview */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Main Quests</h2>
          <a
            href="/quests"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold"
          >
            View All Quests →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainQuests.map((quest) => (
            <a
              key={quest.id}
              href="/quests"
              className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 dark:border-amber-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{quest.title}</h3>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${quest.difficulty === 'Easy'
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
            </a>
          ))}
        </div>
      </div>


      {/* Game Info Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border dark:border-gray-700 p-8 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">About The Forge Roblox</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong>The Forge</strong> is a popular Roblox RPG game by Fireatacck featuring manual forging minigames,
          race systems, and hardcore RPG mechanics. Players mine ores, forge weapons, and battle enemies in this
          action-packed adventure. This wiki provides a comprehensive database of all codes, races, guides, and strategies
          to help you master the game.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Game Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Manual forging minigame with 3 steps</li>
              <li>Race system with Mythical, Legendary, and Epic tiers</li>
              <li>Mining and crafting mechanics</li>
              <li>Quest system with unique rewards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Wiki Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
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

