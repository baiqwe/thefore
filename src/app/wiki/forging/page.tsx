import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Hammer, Flame, Target, Weight } from "lucide-react"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = {
  title: `The Forge Forging Guide: Weight System & Masterwork (${currentMonth} ${currentYear})`,
  description: `New Winter 2025 Weight System Guide for The Forge. Learn how Ore Count determines weapon type, from Daggers to Colossal Swords. Master the 3-step forging minigame.`,
  keywords: [
    "The Forge Forging",
    "The Forge Weight System",
    "The Forge Ore Count",
    "The Forge Colossal Sword Recipe",
    "The Forge Winter 2025",
    "The Forge Wiki",
  ],
}

// HowTo Schema for forging process
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Forge Weapons in The Forge Roblox',
  description: 'Step-by-step guide to the manual forging minigame',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Heating',
      text: 'Hold the green button and move bellows quickly but slightly.',
    },
    {
      '@type': 'HowToStep',
      name: 'Casting',
      text: 'Keep your cursor in the moving yellow zone.',
    },
    {
      '@type': 'HowToStep',
      name: 'Hammering',
      text: 'Click when circles align in the rhythm minigame.',
    },
  ],
}

const weaponThresholds = [
  { type: "Dagger", count: "1 - 5 Ores", stats: "Very Fast / Low Dmg", note: "Best for Glass Cannon builds" },
  { type: "Katana / Rapier / Straight Sword", count: "6 - 15 Ores", stats: "Fast / Medium Dmg", note: "Meta for Speed/Crit" },
  { type: "Great Sword / Great Axe", count: "16 - 29 Ores", stats: "Slow / High Dmg", note: "Standard Heavy Hitter" },
  { type: "Colossal Sword", count: "30+ Ores", stats: "Very Slow / Extreme Dmg", note: "Maximum AoE Range / Best XP" }
];

export default function ForgingPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* UPDATE WARNING */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Flame className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-red-800">
              ⚠️ Winter 2025 Update Warning
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                The crafting system has changed! <strong>Weapon types are now determined by WEIGHT (Ore Count)</strong>, not just the recipe order.
                Old recipes may no longer work as expected.
              </p>
              <p className="mt-2">
                <a href="#weight-system" className="font-bold underline hover:text-red-900">
                  Jump to Weight System Guide ↓
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Forging Guide', url: '/wiki/forging' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Forging Guide', url: '/wiki/forging' },
        ]}
        schema={howToSchema}
      />

      {/* Intro */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Forging Guide: Weight System & Masterwork
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          The <strong>Winter 2025 Update</strong> introduced the <strong>Weight System</strong>.
          Weapon types are now determined strictly by the <strong>Total Ore Count</strong> you put into the furnace.
          <br className="hidden md:block" />
          Check out our <a href="/wiki/best-builds" className="text-amber-600 hover:underline font-semibold">Best Builds Page</a> for meta recipes!
        </p>
      </div>

      {/* New Weight System Table */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Weight className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Weapon Weight Thresholds</h2>
        </div>

        <Card className="border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle>How to Control Weapon Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              The order of ores does <strong>NOT</strong> matter. Only the total quantity (Weight) determines the resulting weapon base.
              The stats (Damage, Speed, Passives) are determined by the <em>types</em> of ores used.
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Weapon Type</TableHead>
                    <TableHead>Ore Count Requirement</TableHead>
                    <TableHead>Stats Profile</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weaponThresholds.map((w) => (
                    <TableRow key={w.type}>
                      <TableCell className="font-bold text-gray-900">{w.type}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {w.count}
                        </span>
                      </TableCell>
                      <TableCell>{w.stats}</TableCell>
                      <TableCell className="text-sm text-gray-500 italic">{w.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forging Steps (Kept similar as mechanics are same) */}
      <div className="space-y-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">The 3-Step Forging Process</h2>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Flame className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Step 1: Heating</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Hold the green button and move the bellows <strong>quickly but slightly</strong>.
              Small movements work best to raise temperature without overheating.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl">Step 2: Casting</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Keep your cursor inside the <strong>moving yellow zone</strong>.
              This fills the mold. Consistency here improves base durability.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Hammer className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Step 3: Hammering</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              A rhythm game. <strong>Click when the circles align</strong>.
              Perfect hits = Masterwork Quality (+20-30% Stats).
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 mb-12">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Winter 2025 Meta Tips</h2>
        <ul className="list-disc pl-5 space-y-3 text-amber-800">
          <li><strong>Dilution Rule:</strong> The multiplier formula is <code>(Sum of Multipliers) / Count</code>. Adding low-tier ores (like Stone 0.2x) to fill space will <strong>LOWER</strong> your weapon&apos;s stats! Use &quot;Filler Ores&quot; with care.</li>
          <li><strong>Passive Stacking:</strong> Traits like &quot;Glass Cannon&quot; (Eye Ore) stack. Using too many (10+) results in <strong>-100% Max HP</strong>, causing <strong>INSTANT DEATH</strong> on spawn.</li>
          <li><strong>Best XP:</strong> Colossal Swords (30+ Ores) still give the most XP for leveling Smithing.</li>
        </ul>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/wiki/best-builds" className="block p-6 bg-indigo-50 border border-indigo-200 rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">→ View Best Builds</h3>
          <p className="text-indigo-700">Check out the &quot;World Ender&quot; and &quot;Flash&quot; meta builds.</p>
        </Link>
        <Link href="/tools/forging-calculator" className="block p-6 bg-green-50 border border-green-200 rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-green-900 mb-2">→ Forging Calculator</h3>
          <p className="text-green-700">Simulate your build and check multipliers before crafting.</p>
        </Link>
      </div>
    </div>
  )
}
