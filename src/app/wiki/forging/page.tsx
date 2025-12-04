import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hammer, Flame, Target } from "lucide-react"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = {
  title: `The Forge Forging Guide: How to Craft Masterwork Weapons (${currentMonth} ${currentYear})`,
  description: `Complete The Forge Roblox forging guide. Learn the 3-step manual forging minigame: Heating, Casting, and Hammering. Master weapon recipes and craft Colossal Swords for maximum XP.`,
  keywords: [
    "The Forge Forging",
    "The Forge Forging Guide",
    "The Forge Crafting",
    "The Forge Weapons",
    "The Forge Roblox Forging",
    "The Forge Masterwork",
    "The Forge Wiki",
  ],
}

// HowTo Schema for forging process
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Forge Weapons in The Forge Roblox',
  description: 'Step-by-step guide to the manual forging minigame in The Forge',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Heating',
      text: 'Hold the green button and move bellows quickly but slightly to heat the metal.',
    },
    {
      '@type': 'HowToStep',
      name: 'Casting',
      text: 'Keep your cursor in the moving yellow zone to cast the weapon.',
    },
    {
      '@type': 'HowToStep',
      name: 'Hammering',
      text: 'Play the rhythm game by clicking when circles align to hammer the weapon.',
    },
  ],
}

export default function ForgingPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Forging Guide', url: '/wiki/forging' },
        ]}
      />

      {/* SEO Head with HowTo Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: 'Forging Guide', url: '/wiki/forging' },
        ]}
        schema={howToSchema}
      />

      {/* SEO Intro Content */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Forging Guide: How to Craft Masterwork Weapons
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Master the <strong>manual forging minigame</strong> in <strong>The Forge Roblox</strong> and craft powerful weapons. 
          This complete guide covers all three steps: <strong>Heating</strong>, <strong>Casting</strong>, and <strong>Hammering</strong>.
          Check out our <a href="/wiki/races" className="text-amber-600 hover:underline font-semibold">Race Tier List</a> to see which race is best for forging, 
          or visit our <a href="/codes" className="text-amber-600 hover:underline font-semibold">Codes page</a> to get free rerolls for better races.
        </p>
      </div>

      {/* Forging Steps */}
      <div className="space-y-8 mb-12">
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
              The first step in <strong>The Forge forging process</strong> is heating the metal. 
              You need to <strong>hold the green button</strong> and <strong>move the bellows quickly but slightly</strong>.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Don&apos;t move the bellows too much! Small, quick movements are more effective than large swings. 
                Watch the temperature gauge to maintain optimal heat.
              </p>
            </div>
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
              During the casting phase, a <strong>moving yellow zone</strong> will appear on screen. 
              Your goal is to <strong>keep your cursor inside this yellow zone</strong> as it moves around.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Follow the yellow zone smoothly. Don&apos;t try to predict its movement - react to it. 
                Staying in the zone longer improves weapon quality.
              </p>
            </div>
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
              The final step is a <strong>rhythm game</strong>. You&apos;ll see circles that need to align. 
              <strong> Click when the circles align</strong> to hammer the weapon into shape.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Focus on the rhythm and timing. Perfect timing gives you better weapon stats. 
                Practice makes perfect - the more you forge, the better you&apos;ll get!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weapon Recipes */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">The Forge Weapon Recipes & Ore Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Small Weapons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2"><strong>Recipe:</strong> Small amount of ores</p>
              <p className="text-gray-600 text-sm"><strong>Result:</strong> Dagger</p>
              <p className="text-gray-600 text-sm mt-2">Good for beginners learning the forging mechanics.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medium Weapons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2"><strong>Recipe:</strong> Medium amount of ores</p>
              <p className="text-gray-600 text-sm"><strong>Result:</strong> Sword, Katana</p>
              <p className="text-gray-600 text-sm mt-2">Balanced weapons for mid-game content.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Large Weapons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2"><strong>Recipe:</strong> Large amount of ores</p>
              <p className="text-gray-600 text-sm"><strong>Result:</strong> Greatsword, Axe</p>
              <p className="text-gray-600 text-sm mt-2">Powerful weapons for advanced players.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-500">
            <CardHeader>
              <CardTitle className="text-amber-600">Massive Weapons (Best for XP)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2"><strong>Recipe:</strong> 20+ ores</p>
              <p className="text-gray-600 text-sm"><strong>Result:</strong> Colossal Sword</p>
              <p className="text-gray-600 text-sm mt-2 font-semibold">
                <strong>Best for selling and earning XP!</strong> Craft Colossal Swords to maximize your progression.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forging Tips */}
      <div className="prose prose-lg max-w-none bg-gray-50 p-8 rounded-xl border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Master The Forge Forging: Pro Tips</h2>
        <p className="text-gray-700 mb-4">
          <strong>The Forge Roblox</strong> features a unique <strong>manual forging minigame</strong> that requires skill and practice. 
          Unlike automatic crafting systems, you need to master all three steps to create high-quality weapons.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Practice makes perfect:</strong> Start with small weapons to learn the mechanics before attempting Colossal Swords.</li>
          <li><strong>Save your ores:</strong> Don&apos;t waste rare ores on practice runs. Use common ores to learn first.</li>
          <li><strong>Focus on Colossal Swords:</strong> These give the best XP and sell for the most money. Save 20+ ores for these.</li>
          <li><strong>Perfect timing matters:</strong> Better performance in the minigame results in higher weapon stats.</li>
        </ul>
      </div>

      {/* Related Links */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related The Forge Wiki Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/wiki/races" className="text-blue-600 hover:underline font-semibold">
            → Race Tier List Guide
          </a>
          <a href="/wiki/quests" className="text-blue-600 hover:underline font-semibold">
            → Quest Walkthroughs
          </a>
          <a href="/codes" className="text-blue-600 hover:underline font-semibold">
            → Get Free Codes
          </a>
        </div>
      </div>
    </div>
  )
}

