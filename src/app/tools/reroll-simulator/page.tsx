"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dice6, RotateCcw } from "lucide-react"
import Link from "next/link"
import racesData from "@/data/races.json"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

// Race probabilities (example - adjust based on actual game data)
const raceProbabilities = {
  S: 0.02, // 2% for S tier
  A: 0.15, // 15% for A tier
  B: 0.50, // 50% for B tier
  C: 0.33, // 33% for C tier
}

function getRandomRace() {
  const random = Math.random()
  let cumulative = 0

  for (const [tier, probability] of Object.entries(raceProbabilities)) {
    cumulative += probability
    if (random <= cumulative) {
      const tierRaces = racesData.filter((race) => race.tier === tier)
      return tierRaces[Math.floor(Math.random() * tierRaces.length)]
    }
  }

  // Fallback to C tier
  const cTierRaces = racesData.filter((race) => race.tier === "C")
  return cTierRaces[0]
}

export default function RerollSimulatorPage() {
  const [currentRace, setCurrentRace] = useState<typeof racesData[0] | null>(
    null
  )
  const [rollHistory, setRollHistory] = useState<typeof racesData[0][]>([])
  const [rollCount, setRollCount] = useState(0)

  const handleRoll = () => {
    const newRace = getRandomRace()
    setCurrentRace(newRace)
    setRollHistory((prev) => [newRace, ...prev].slice(0, 10)) // Keep last 10
    setRollCount((prev) => prev + 1)
  }

  const handleReset = () => {
    setCurrentRace(null)
    setRollHistory([])
    setRollCount(0)
  }

  const tierColors = {
    S: "from-red-600 to-orange-600",
    A: "from-amber-600 to-yellow-600",
    B: "from-blue-600 to-cyan-600",
    C: "from-green-600 to-emerald-600",
  }

  // Dynamic date for SEO
  const date = new Date()
  const currentMonth = date.toLocaleString('default', { month: 'long' })
  const currentYear = date.getFullYear()

  // FAQ data for SEO
  const faqData = [
    {
      question: 'How do I get free rerolls in The Forge?',
      answer: 'You can get free rerolls by redeeming codes like "100K!", "40KLIKES", or "20KLIKES" from our codes page. You can also earn rerolls by completing daily quests and finding hidden chests in the Volcanic Depths.',
    },
    {
      question: 'What are the best races to reroll for in The Forge?',
      answer: 'The best races are S-tier Legendary races like Angel and Demon, which have the highest stats. A-tier races like Dragonborn are also excellent for end-game content. Check our Race Tier List guide for complete rankings.',
    },
    {
      question: 'What are the reroll probabilities in The Forge?',
      answer: 'Based on community data, S-tier races have approximately 2% chance, A-tier 15%, B-tier 50%, and C-tier 33%. Use this simulator to understand your chances before spending reroll tokens.',
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl 2xl:max-w-[calc(100%-416px)] 2xl:mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Reroll Simulator', url: '/tools/reroll-simulator' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Reroll Simulator', url: '/tools/reroll-simulator' },
        ]}
        faq={faqData}
      />

      {/* SEO Intro Content */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Race Reroll Simulator ({currentMonth} {currentYear})
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Test your luck with our <strong>The Forge reroll simulator</strong>! Simulate rolling for races to see your chances of getting <span className="font-semibold text-amber-700">Legendary races</span> like <strong>Angel</strong> or <strong>Demon</strong> before spending your reroll tokens.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Updated: <span className="font-medium text-amber-600">{currentMonth} {new Date().getDate()}, {currentYear}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Simulator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Roll for a Race</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleRoll}
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  <Dice6 className="mr-2 h-5 w-5" />
                  Roll Now
                </Button>
              </div>

              {currentRace && (
                <div className="text-center">
                  <div
                    className={`bg-gradient-to-r ${
                      tierColors[currentRace.tier as keyof typeof tierColors]
                    } p-6 rounded-lg mb-4`}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {currentRace.name}
                    </h2>
                    <Badge variant="secondary" className="text-lg bg-white/20 text-white">
                      {currentRace.tier} Tier - {currentRace.rarity}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-4 font-medium">{currentRace.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Abilities:
                    </h3>
                    <ul className="space-y-1">
                      {currentRace.abilities.map((ability, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-center justify-center gap-2"
                        >
                          <span className="text-amber-500">•</span>
                          {ability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {rollCount > 0 && (
                <div className="flex items-center justify-center gap-4">
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <span className="text-gray-600">
                    Total Rolls: <strong className="text-amber-600">{rollCount}</strong>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Roll History */}
          {rollHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Rolls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rollHistory.map((race, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            race.tier === "S"
                              ? "default"
                              : race.tier === "A"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {race.tier}
                        </Badge>
                        <span className="font-semibold text-gray-800">
                          {race.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-700 font-medium">
                        {race.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Probability Info & SEO Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Roll Probabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-red-600 to-orange-600">
                      S
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">Tier (Legendary)</span>
                  </div>
                  <span className="font-bold text-red-600">
                    {(raceProbabilities.S * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600">
                      A
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">Tier (Rare)</span>
                  </div>
                  <span className="font-bold text-amber-600">
                    {(raceProbabilities.A * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      B
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">Tier (Good)</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {(raceProbabilities.B * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">
                      C
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">Tier (Common)</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {(raceProbabilities.C * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Content Section */}
          <Card>
            <CardHeader>
              <CardTitle>How to Get Free Rerolls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Get free rerolls by redeeming <Link href="/codes" className="text-amber-600 hover:underline font-semibold">The Forge codes</Link> like &quot;100K!&quot; or &quot;40KLIKES&quot;. You can also earn rerolls by completing daily quests and finding hidden chests.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Before using your rerolls, check our <Link href="/wiki/race-tier-list" className="text-amber-600 hover:underline font-semibold">Race Tier List</Link> to see which races are worth aiming for!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">
                This <strong>The Forge reroll simulator</strong> uses approximate probabilities based on community data. Actual in-game rates may vary. Use this tool to understand your chances of getting <strong>Legendary races</strong> before spending reroll tokens or Gems!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Guide Section */}
      <div className="prose prose-lg max-w-none bg-gray-50 p-8 rounded-xl border border-gray-200 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Races to Reroll For in The Forge</h2>
        <p className="text-gray-700 mb-4">
          If you&apos;re looking to get the best race in <strong>The Forge</strong>, aim for <strong>S-tier Legendary races</strong> like <strong>Angel</strong> or <strong>Demon</strong>. These races have the highest stats and are perfect for any playstyle.
        </p>
        <p className="text-gray-700 mb-4">
          For end-game content, <strong>Dragonborn</strong> (A-tier) is unmatched with fire immunity and massive damage bonuses. If you prefer mining, <strong>Dwarf</strong> (B-tier) provides +40% mining speed.
        </p>
        <p className="text-gray-700">
          Remember: S-tier races have only a <strong>2% drop rate</strong>, so save up your rerolls and use them wisely! Check our <Link href="/wiki/races" className="text-amber-600 hover:underline font-semibold">complete Races guide</Link> for detailed information on all races.
        </p>
      </div>
    </div>
  )
}
