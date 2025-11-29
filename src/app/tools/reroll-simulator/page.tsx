"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dice6, RotateCcw } from "lucide-react"
import racesData from "@/data/races.json"

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

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-zinc-100">
          Race Reroll Simulator
        </h1>
        <p className="text-zinc-400 text-lg">
          Simulate rolling for races in The Forge. This tool uses approximate
          game probabilities to help you understand your chances.
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
                  className="text-lg px-8 py-6"
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
                    <Badge variant="secondary" className="text-lg">
                      {currentRace.tier} Tier - {currentRace.rarity}
                    </Badge>
                  </div>
                  <p className="text-zinc-400 mb-4">{currentRace.description}</p>
                  <div className="bg-zinc-900 rounded-lg p-4">
                    <h3 className="font-semibold text-zinc-300 mb-2">
                      Abilities:
                    </h3>
                    <ul className="space-y-1">
                      {currentRace.abilities.map((ability, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-zinc-400 flex items-center justify-center gap-2"
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
                  <span className="text-zinc-400">
                    Total Rolls: <strong className="text-amber-500">{rollCount}</strong>
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
                      className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800"
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
                        <span className="font-semibold text-zinc-200">
                          {race.name}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {race.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Probability Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Roll Probabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-red-600 to-orange-600">
                      S
                    </Badge>
                    <span className="text-sm text-zinc-300">Tier</span>
                  </div>
                  <span className="font-bold text-amber-500">
                    {(raceProbabilities.S * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600">
                      A
                    </Badge>
                    <span className="text-sm text-zinc-300">Tier</span>
                  </div>
                  <span className="font-bold text-amber-500">
                    {(raceProbabilities.A * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      B
                    </Badge>
                    <span className="text-sm text-zinc-300">Tier</span>
                  </div>
                  <span className="font-bold text-amber-500">
                    {(raceProbabilities.B * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">
                      C
                    </Badge>
                    <span className="text-sm text-zinc-300">Tier</span>
                  </div>
                  <span className="font-bold text-amber-500">
                    {(raceProbabilities.C * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 leading-relaxed">
                This simulator uses approximate probabilities based on community
                data. Actual in-game rates may vary. Use this tool to
                understand your chances before spending reroll tokens!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

