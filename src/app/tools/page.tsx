import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dice5, Calculator, MapPin, Hammer } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = generateSEOMetadata({
  title: 'The Forge Tools - Interactive Calculators & Simulators',
  description: 'Use our interactive tools for The Forge Roblox: Reroll Simulator, Forging Calculator, and Ore Depth Finder. Plan your gameplay strategy with these free tools.',
  keywords: [
    'The Forge Tools',
    'The Forge Reroll Simulator',
    'The Forge Calculator',
    'Ore Depth Finder',
    'Forging Calculator',
    'Roblox The Forge',
  ],
  canonicalUrl: `${siteConfig.url}/tools`,
  type: 'website',
})

const tools = [
  {
    title: 'Reroll Simulator',
    description: 'Simulate race rerolls to test your luck before spending Robux. See your chances of getting Mythical races like Angel and Demon.',
    href: '/tools/reroll-simulator',
    icon: Dice5,
    color: 'from-purple-500 to-indigo-600',
    hoverColor: 'hover:from-purple-600 hover:to-indigo-700',
    badge: 'Popular',
  },
  {
    title: 'Ore Depth Finder',
    description: 'Find which ores you can mine at your current depth, or discover the best depth to find specific ores. Essential for efficient mining.',
    href: '/tools/ore-depth-finder',
    icon: MapPin,
    color: 'from-blue-500 to-cyan-600',
    hoverColor: 'hover:from-blue-600 hover:to-cyan-700',
    badge: 'New',
  },
  {
    title: 'Forging Calculator',
    description: 'Calculate the exact materials needed to forge weapons and tools. Plan your mining trips efficiently with this comprehensive calculator.',
    href: '/tools/forging-calculator',
    icon: Calculator,
    color: 'from-amber-500 to-orange-600',
    hoverColor: 'hover:from-amber-600 hover:to-orange-700',
    badge: 'New',
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl 2xl:max-w-[calc(100%-416px)] 2xl:mx-auto">
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
        ]}
      />

      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
        ]}
      />

      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Tools
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Interactive tools and calculators to help you master The Forge Roblox. Plan your strategy, test your luck, and optimize your gameplay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-amber-400 dark:hover:border-amber-600">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} ${tool.hoverColor} transition-all group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {tool.badge && (
                      <span className="px-2 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Why Use These Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">💰 Save Resources</h3>
              <p>Plan your mining and forging activities to avoid wasting rare materials on inefficient strategies.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Optimize Strategy</h3>
              <p>Test different approaches before committing to in-game actions. Know your odds before spending Robux.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">📊 Data-Driven Decisions</h3>
              <p>Make informed choices based on accurate calculations and probability simulations.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">⚡ Save Time</h3>
              <p>Quickly find the information you need without manually calculating or testing in-game.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

