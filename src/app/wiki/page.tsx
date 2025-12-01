import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"
import guidesData from "@/data/guides.json"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

export const metadata: Metadata = {
  title: "Wiki Hub",
  description: "Complete wiki for The Forge Roblox - Guides for Races, Weapons, Ores, and Quests",
  keywords: [
    "The Forge Wiki",
    "The Forge Guides",
    "Roblox The Forge",
    "Lost Cat Guide",
    "The Forge Tier List",
  ],
}

const categories = [
  {
    name: "Races",
    href: "/wiki/races",
    description: "Complete guide to all races in The Forge",
    icon: "🏃",
    count: 9,
  },
  {
    name: "Forging",
    href: "/wiki/forging",
    description: "Master the manual forging minigame and craft weapons",
    icon: "🔨",
    count: 1,
  },
  {
    name: "Quests",
    href: "/quests",
    description: "Quest walkthroughs including Bard's Guitar and Goblin King",
    icon: "📜",
    count: 3,
  },
  {
    name: "Ores",
    href: "/wiki/ores",
    description: "Complete ores database with prices and depth locations",
    icon: "⛏️",
    count: 1,
  },
]

export default function WikiPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
        ]}
      />

      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          Wiki Hub
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Complete guides and information for <strong className="text-gray-900 dark:text-gray-100">The Forge Roblox</strong> game
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="hover:border-amber-600 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="text-4xl mb-2">{category.icon}</div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{category.description}</p>
                <Badge variant="secondary">{category.count} guides</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Guides */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Featured Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidesData.map((guide) => (
            <Link key={guide.slug} href={`/wiki/${guide.slug}`}>
              <Card className="hover:border-amber-600 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{guide.category}</Badge>
                    <Badge
                      variant={
                        guide.difficulty === "Beginner"
                          ? "default"
                          : guide.difficulty === "Expert"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

