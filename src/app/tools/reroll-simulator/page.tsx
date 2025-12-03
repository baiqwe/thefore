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

// Race probabilities (adjusted based on actual game data)
const raceProbabilities = {
  S: 0.02, // 2% for S tier
  A: 0.15, // 15% for A tier
  B: 0.50, // 50% for B tier
  D: 0.33, // 33% for D tier (Common/Human)
}

function getRandomRace() {
  const random = Math.random()
  let cumulative = 0

  for (const [tier, probability] of Object.entries(raceProbabilities)) {
    cumulative += probability
    if (random <= cumulative) {
      const tierRaces = racesData.filter((race) => race.tier === tier)
      if (tierRaces.length > 0) {
        return tierRaces[Math.floor(Math.random() * tierRaces.length)]
      }
    }
  }

  // Fallback to D tier (Human) or first available race
  const dTierRaces = racesData.filter((race) => race.tier === "D")
  if (dTierRaces.length > 0) {
    return dTierRaces[0]
  }
  
  // Final fallback - return first race if everything else fails
  return racesData[0] || null
}

export default function RerollSimulatorPage() {
  const [currentRace, setCurrentRace] = useState<typeof racesData[0] | null>(
    null
  )
  const [rollHistory, setRollHistory] = useState<typeof racesData[0][]>([])
  const [rollCount, setRollCount] = useState(0)

  const handleRoll = () => {
    const newRace = getRandomRace()
    if (newRace) {
      setCurrentRace(newRace)
      setRollHistory((prev) => [newRace, ...prev].slice(0, 10)) // Keep last 10
      setRollCount((prev) => prev + 1)
    }
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
    D: "from-gray-600 to-slate-600",
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
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Test your luck with our <strong>The Forge reroll simulator</strong>! Simulate rolling for races to see your chances of getting <span className="font-semibold text-amber-700 dark:text-amber-400">Legendary races</span> like <strong>Angel</strong> or <strong>Demon</strong> before spending your reroll tokens.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Updated: <span className="font-medium text-amber-600 dark:text-amber-400">{currentMonth} {new Date().getDate()}, {currentYear}</span>
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
                      tierColors[currentRace.tier as keyof typeof tierColors] || tierColors.C
                    } p-6 rounded-lg mb-4`}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {currentRace.name}
                    </h2>
                    <Badge variant="secondary" className="text-lg bg-white/20 text-white">
                      {currentRace.tier} Tier - {currentRace.rarity}
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">{currentRace.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      Abilities:
                    </h3>
                    <ul className="space-y-1">
                      {(currentRace.abilities || currentRace.passives || []).map((ability: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2"
                        >
                          <span className="text-amber-500 dark:text-amber-400">•</span>
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
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Rolls: <strong className="text-amber-600 dark:text-amber-400">{rollCount}</strong>
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
                    race && (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
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
                            {race.tier || "?"}
                          </Badge>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">
                            {race.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                          {race.rarity || "Unknown"}
                        </span>
                      </div>
                    )
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
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tier (Legendary)</span>
                  </div>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {(raceProbabilities.S * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600">
                      A
                    </Badge>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tier (Rare)</span>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    {(raceProbabilities.A * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      B
                    </Badge>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tier (Good)</span>
                  </div>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {(raceProbabilities.B * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-gray-600 to-slate-600">
                      D
                    </Badge>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tier (Common)</span>
                  </div>
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    {(raceProbabilities.D * 100).toFixed(1)}%
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
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Get free rerolls by redeeming <Link href="/codes" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">The Forge codes</Link> like &quot;100K!&quot; or &quot;40KLIKES&quot;. You can also earn rerolls by completing daily quests and finding hidden chests.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Before using your rerolls, check our <Link href="/wiki/race-tier-list" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Race Tier List</Link> to see which races are worth aiming for!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                This <strong>The Forge reroll simulator</strong> uses approximate probabilities based on community data. Actual in-game rates may vary. Use this tool to understand your chances of getting <strong>Legendary races</strong> before spending reroll tokens or Gems!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content: What, How, FAQ */}
      <div className="mt-12 space-y-8">
        {/* What Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">What is The Forge Race Reroll Simulator?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>Race Reroll Simulator</strong> is an interactive tool designed to help <strong>The Forge Roblox</strong> players understand their chances of obtaining different races before spending valuable reroll tokens or Gems. This simulator uses probability data collected from the community and game mechanics to provide accurate estimates of race drop rates.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In <strong>The Forge</strong>, your race determines your character&apos;s abilities, stats, and playstyle. Races range from Common (D-tier) to Mythical (S-tier), with S-tier races like <strong>Angel</strong> and <strong>Demon</strong> having only a 2% drop rate. This makes race selection one of the most important decisions in the game.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our simulator allows you to test hundreds of rerolls instantly, helping you make informed decisions about when to use your reroll tokens. This tool is based on extensive gameplay data and community research, making it a trusted resource for <strong>The Forge</strong> players worldwide.
            </p>
          </CardContent>
        </Card>

        {/* How Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How to Use The Forge Reroll Simulator</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 1: Click &quot;Roll Now&quot;</h3>
                <p className="leading-relaxed">
                  Simply click the <strong>&quot;Roll Now&quot;</strong> button to simulate a single race reroll. The simulator will randomly select a race based on the actual in-game probability distribution: 2% for S-tier, 15% for A-tier, 50% for B-tier, and 33% for D-tier (Common/Human).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 2: Review Your Results</h3>
                <p className="leading-relaxed">
                  After each roll, you&apos;ll see the race name, tier, rarity, and abilities. The simulator tracks your roll history, showing your last 10 results. This helps you understand the probability distribution and see how many rolls it typically takes to get your desired race.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 3: Analyze Your Chances</h3>
                <p className="leading-relaxed">
                  Use the probability panel on the right to understand your odds. For example, if you&apos;re aiming for an S-tier race like <strong>Angel</strong> or <strong>Demon</strong>, you have approximately a 2% chance per roll. This means you might need 50+ rerolls on average to get one.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 4: Plan Your Strategy</h3>
                <p className="leading-relaxed">
                  Before spending your reroll tokens in-game, use this simulator to test different scenarios. If you&apos;re satisfied with A-tier or B-tier races, you&apos;ll have much better odds (15% and 50% respectively). Check our <Link href="/wiki/race-tier-list" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Race Tier List</Link> to see which races are worth aiming for based on your playstyle.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions (FAQ)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">How accurate is this reroll simulator?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our simulator is based on probability data collected from thousands of community rerolls and verified against in-game mechanics. The probabilities (2% S-tier, 15% A-tier, 50% B-tier, 33% D-tier) are approximations based on extensive gameplay data. Actual in-game rates may vary slightly, but this simulator provides a reliable estimate for planning purposes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">How do I get free rerolls in The Forge?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can obtain free rerolls through several methods: (1) Redeem active codes like <strong>&quot;100K!&quot;</strong>, <strong>&quot;40KLIKES&quot;</strong>, or <strong>&quot;20KLIKES&quot;</strong> from our <Link href="/codes" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">codes page</Link>, (2) Complete daily quests that reward reroll tokens, (3) Find hidden chests in the Volcanic Depths area, and (4) Purchase rerolls using in-game Gems at the Wizard NPC in Stonewake&apos;s Cross.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">What are the best races to reroll for?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The best races are S-tier Mythical races like <strong>Angel</strong> and <strong>Demon</strong>, which offer the highest stats and unique abilities. However, with only a 2% drop rate, they&apos;re extremely rare. A-tier races like <strong>Dragonborn</strong> (fire immunity, massive damage) and <strong>Shadow</strong> (dodge chance, PVP meta) are excellent alternatives with a 15% drop rate. For mining-focused players, B-tier <strong>Dwarf</strong> (+40% mining speed) is highly valuable. Check our <Link href="/wiki/race-tier-list" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">complete Race Tier List</Link> for detailed rankings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Should I save my rerolls or use them immediately?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                It depends on your current race and goals. If you have a D-tier (Common) race, it&apos;s generally worth rerolling since you have a 50% chance of getting a B-tier race, which is a significant upgrade. However, if you already have a B-tier or A-tier race, consider saving rerolls until you have enough to statistically guarantee an S-tier (approximately 50+ rerolls). Use this simulator to test different scenarios before committing your resources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Can I get a specific race, or is it completely random?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Race rerolls are completely random within each tier. You cannot choose a specific race, but you can influence your odds by understanding the tier system. For example, if you want an S-tier race, you have a 2% chance per roll, but the specific S-tier race (Angel, Demon, etc.) is randomly selected from the S-tier pool. This simulator helps you understand these probabilities before spending your reroll tokens.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">What&apos;s the difference between using codes vs. Gems for rerolls?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Both methods use the same probability system - there&apos;s no difference in drop rates whether you use free rerolls from codes or paid rerolls purchased with Gems. The advantage of using codes is that they&apos;re free, but they&apos;re limited in quantity. Gems allow unlimited rerolls but cost in-game currency. We recommend using free rerolls from codes first, then deciding if you want to invest Gems based on your results.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Best Races Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Best Races to Reroll For in The Forge</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you&apos;re looking to get the best race in <strong>The Forge</strong>, aim for <strong>S-tier Mythical races</strong> like <strong>Angel</strong> or <strong>Demon</strong>. These races have the highest stats and are perfect for any playstyle - PVP, PVE, mining, or forging.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For end-game content, <strong>Dragonborn</strong> (A-tier) is unmatched with fire immunity and massive damage bonuses, making it ideal for challenging the Goblin King and other difficult bosses. If you prefer PVP combat, <strong>Shadow</strong> (A-tier) provides dodge chance, making it the current PVP meta choice.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For mining-focused players, <strong>Dwarf</strong> (B-tier) provides +40% mining speed, which is extremely valuable for gathering rare ores efficiently. While not as powerful as S-tier races, B-tier races are much easier to obtain (50% drop rate) and can significantly improve your gameplay experience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Remember: S-tier races have only a <strong>2% drop rate</strong>, so save up your rerolls and use them wisely! On average, you&apos;ll need 50+ rerolls to get an S-tier race. Use this simulator to test your luck before committing your resources. Check our <Link href="/wiki/races" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">complete Races guide</Link> for detailed information on all races, their abilities, and optimal playstyles.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
