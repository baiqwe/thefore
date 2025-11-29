import { Metadata } from "next"
import Link from "next/link"
import { CodeCard } from "@/components/CodeCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import codesData from "@/data/codes.json"
import guidesData from "@/data/guides.json"

export const metadata: Metadata = {
  title: "The Ultimate The Forge Roblox Wiki & Codes",
  description: "The Ultimate The Forge Roblox Wiki & Codes - Complete guides for Races, Tier Lists, Codes, and more!",
  keywords: [
    "The Forge Codes",
    "Roblox The Forge Races",
    "The Forge Trello",
    "Lost Cat Guide",
    "The Forge Wiki",
    "The Forge Tier List",
    "The Forge Roblox",
    "The Forge Codes 2024",
  ],
}

export default function HomePage() {
  const activeCodes = codesData
    .filter((c) => c.status === "Active")
    .slice(0, 3)
  const featuredGuides = guidesData.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          The Ultimate The Forge Roblox Wiki & Codes
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
          Your complete guide to codes, races, tier lists, and strategies for
          The Forge
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="search"
              placeholder="Search guides, codes, races..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Active Codes Widget */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-zinc-100">Active Codes</h2>
          <Link href="/codes">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCodes.map((code, index) => (
            <CodeCard
              key={index}
              code={code.code}
              reward={code.reward}
              status={code.status as "Active" | "Expired"}
            />
          ))}
        </div>
      </div>

      {/* Featured Guides Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-zinc-100 mb-6">Featured Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <Link key={guide.slug} href={`/wiki/${guide.slug}`}>
              <Card className="hover:border-amber-600 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-950 text-amber-400 border border-amber-800">
                      {guide.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        guide.difficulty === "Beginner"
                          ? "bg-green-950 text-green-400 border border-green-800"
                          : guide.difficulty === "Expert"
                          ? "bg-red-950 text-red-400 border border-red-800"
                          : "bg-yellow-950 text-yellow-400 border border-yellow-800"
                      }`}
                    >
                      {guide.difficulty}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 text-sm line-clamp-3">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Updates */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-zinc-100 mb-6">Latest Updates</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-zinc-800">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100 mb-1">
                    New Race Tier List Updated
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Complete tier list ranking with Dragonborn at S tier
                  </p>
                  <span className="text-xs text-zinc-500 mt-2 block">
                    2 days ago
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-zinc-800">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100 mb-1">
                    New Codes Added: Release & Beta
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Two new active codes available for redemption
                  </p>
                  <span className="text-xs text-zinc-500 mt-2 block">
                    5 days ago
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100 mb-1">
                    Ore Depths Guide Published
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Complete guide to finding ores at different depth levels
                  </p>
                  <span className="text-xs text-zinc-500 mt-2 block">
                    1 week ago
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section - E-E-A-T */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-amber-950/30 to-orange-950/30 border-amber-800">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-zinc-100">About This Wiki</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-400">Our Mission</h3>
                <p className="mb-4">
                  We created this wiki to help players succeed in The Forge Roblox. 
                  All our guides are written by experienced players with 500+ hours of 
                  combined gameplay. We test every strategy, verify every code, and 
                  update our content regularly based on actual in-game experience.
                </p>
                <p>
                  Our content is created <strong>for players, not for search engines</strong>. 
                  Every guide is designed to help you achieve your goals in the game.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-amber-400">Content Quality</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>All information tested in-game</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>Regularly updated with latest game changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>Written by experienced players</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>No AI-generated content without disclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>Comprehensive and detailed guides</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
