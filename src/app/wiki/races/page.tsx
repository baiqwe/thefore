import { Metadata } from "next"
import Link from "next/link"
import { TierList } from "@/components/TierList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import racesData from "@/data/races.json"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = {
  title: `The Forge Races Tier List & Stats Guide (${currentMonth} ${currentYear}) - Roblox`,
  description: `Complete The Forge Roblox race tier list with stats, abilities, and drop rates. Learn how to reroll races at the Wizard NPC in Stonewake's Cross. Mythical races have 0.5% drop rate.`,
  keywords: [
    "The Forge Races",
    "The Forge Race Tier List",
    "The Forge Roblox Races",
    "The Forge Race Stats",
    "The Forge Race Reroll",
    "The Forge Wiki",
    "Roblox The Forge",
  ],
}

// Table Schema for race stats
const tableSchema = {
  '@context': 'https://schema.org',
  '@type': 'Table',
  about: 'The Forge Roblox Race Statistics',
  name: 'The Forge Race Tier List',
  description: 'Complete statistics for all races in The Forge Roblox game',
}

export default function RacesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Races', url: '/wiki/races' },
        ]}
      />

      {/* SEO Head with Table Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Races', url: '/wiki/races' },
        ]}
        schema={tableSchema}
      />

      {/* SEO Intro Content */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Races Tier List & Stats Guide (Roblox)
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          Complete guide to all <strong>The Forge Roblox races</strong> with detailed stats, abilities, and drop rates. 
          Learn how to reroll your race at the <strong>Wizard NPC</strong> in <strong>Stonewake&apos;s Cross</strong> and 
          discover which race is best for your playstyle.
        </p>
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          <strong>Important:</strong> <strong>Mythical races</strong> (S-tier) like <strong>Angel</strong> and <strong>Demon</strong> have only a 
          <span className="font-bold text-red-600"> 0.5% drop rate</span>. Save your rerolls and use them wisely!
        </p>
      </div>

      {/* How to Reroll Section */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">How to Reroll Your Race in The Forge</h2>
        <p className="text-gray-700 mb-3">
          To change your race in <strong>The Forge Roblox</strong>, visit the <strong>Wizard NPC</strong> located in 
          <strong> Stonewake&apos;s Cross</strong>. You can use Race Rerolls (obtained from codes or quests) to get a new random race. 
          The drop rates are: <strong>Mythical 0.5%</strong>, <strong>Legendary 1.25%</strong>, <strong>Epic 6-7%</strong>, <strong>Rare ~8%</strong>.
        </p>
        <p className="text-gray-700">
          Get free rerolls by redeeming <Link href="/codes" className="text-amber-600 hover:underline font-semibold">The Forge codes</Link> like &quot;200K!&quot; or &quot;100K!&quot;. 
          Test your luck with our <Link href="/tools/reroll-simulator" className="text-amber-600 hover:underline font-semibold">Reroll Simulator</Link> before spending your rerolls, 
          or check out our <Link href="/wiki/forging" className="text-amber-600 hover:underline font-semibold">Forging Guide</Link> to craft powerful weapons for your chosen race.
        </p>
      </div>

      <TierList races={racesData} />

      {/* Detailed Race Stats */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Detailed Race Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* S-Tier Races */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">S-Tier: Mythical Races (0.5% Drop Rate)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Angel</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +20% Speed, +25% Jump, +25% Luck</li>
                  <li><strong>Passive:</strong> Infinite Stamina at low HP, Smite chance</li>
                  <li><strong>Best For:</strong> All-around gameplay, balanced builds</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Demon</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +20% Speed, +20% Attack Speed, +20% Physical Damage, +20% Fire Damage</li>
                  <li><strong>Passive:</strong> AOE Burn damage</li>
                  <li><strong>Best For:</strong> Combat-focused builds, DPS</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* A-Tier Races */}
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-600">A-Tier: Legendary & Epic Races</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Dragonborn (Legendary 1.25%)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +20% HP, +12% Physical Damage</li>
                  <li><strong>Passive:</strong> Fire breath attack</li>
                  <li><strong>Best For:</strong> End-game content, tank builds</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Golem (Legendary 1.25%)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +40% HP, +20% Size, -10% Speed</li>
                  <li><strong>Passive:</strong> Tanky, high defense</li>
                  <li><strong>Best For:</strong> Tank builds, survivability</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Shadow (Epic 6-7%)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +15% Speed, +10% Attack Speed</li>
                  <li><strong>Passive:</strong> Dodge chance (PVP meta)</li>
                  <li><strong>Best For:</strong> PVP combat, agility builds</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* B-Tier Races */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">B-Tier: Epic & Rare Races</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Dwarf (Epic 6-7%)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +20% Mining Speed</li>
                  <li><strong>Passive:</strong> Mining bonuses</li>
                  <li><strong>Best For:</strong> Mining, resource gathering</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Orc (Rare ~8%)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> +15% HP, +10% Physical Damage</li>
                  <li><strong>Passive:</strong> Combat bonuses</li>
                  <li><strong>Best For:</strong> Combat builds, new players</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* C/D-Tier Races */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">C/D-Tier: Common Races</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Goblin</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> Shop discount</li>
                  <li><strong>Passive:</strong> Economic benefits</li>
                  <li><strong>Best For:</strong> Saving money, economic builds</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Human</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Stats:</strong> No buffs</li>
                  <li><strong>Passive:</strong> None</li>
                  <li><strong>Best For:</strong> Starting race, balanced gameplay</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Race Selection Tips */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Race Selection Tips for The Forge Roblox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For New Players</h3>
              <p className="text-gray-700 text-sm">
                Start with <strong>Human</strong> or <strong>Orc</strong> for balanced gameplay. These races are forgiving and help you learn the game mechanics. 
                Save your rerolls until you understand the game better.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Mining Focus</h3>
              <p className="text-gray-700 text-sm">
                <strong>Dwarf</strong> is the best choice with +20% mining speed. Perfect for resource gathering builds and earning money through mining.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For PVP Combat</h3>
              <p className="text-gray-700 text-sm">
                <strong>Shadow</strong> (A-tier) is the PVP meta with dodge chance. <strong>Demon</strong> (S-tier) is also excellent for high damage output.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For End-Game Content</h3>
              <p className="text-gray-700 text-sm">
                <strong>Dragonborn</strong> and <strong>Golem</strong> are excellent for high-level content. <strong>Angel</strong> and <strong>Demon</strong> (S-tier) are the ultimate goals but have only 0.5% drop rate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Links */}
      <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Guides & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/tools/reroll-simulator" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Race Reroll Simulator
          </Link>
          <Link href="/codes" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Get Free Reroll Codes
          </Link>
          <Link href="/wiki/forging" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Forging Guide (Best Weapons)
          </Link>
          <Link href="/wiki/ores" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Ores Database (Mining Guide)
          </Link>
          <Link href="/items" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → All Items & Locations
          </Link>
          <Link href="/quests" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            → Quest Walkthroughs
          </Link>
        </div>
      </div>
    </div>
  )
}
