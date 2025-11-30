"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Race {
  name: string
  tier: string
  description: string
  abilities: string[]
  rarity: string
  dropRate?: string
  passive?: string
  special?: string
}

interface TierListProps {
  races: Race[]
}

const tierColors = {
  S: "from-red-600 to-orange-600",
  A: "from-amber-600 to-yellow-600",
  B: "from-blue-600 to-cyan-600",
  C: "from-green-600 to-emerald-600",
}

const tierLabels = {
  S: "S Tier - Legendary",
  A: "A Tier - Excellent",
  B: "B Tier - Good",
  C: "C Tier - Average",
}

export function TierList({ races }: TierListProps) {
  const groupedByTier = races.reduce((acc, race) => {
    if (!acc[race.tier]) {
      acc[race.tier] = []
    }
    acc[race.tier].push(race)
    return acc
  }, {} as Record<string, Race[]>)

  const tierOrder = ["S", "A", "B", "C"]

  return (
    <div className="space-y-8">
      {tierOrder.map((tier) => {
        const tierRaces = groupedByTier[tier] || []
        if (tierRaces.length === 0) return null

        return (
          <div key={tier} className="space-y-4">
            <div
              className={`bg-gradient-to-r ${tierColors[tier as keyof typeof tierColors]} p-4 rounded-lg`}
            >
              <h2 className="text-2xl font-bold text-white">
                {tierLabels[tier as keyof typeof tierLabels]}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tierRaces.map((race) => (
                <Card key={race.name} className="hover:border-amber-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{race.name}</CardTitle>
                      <Badge variant="secondary">{race.rarity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {race.dropRate && (
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {race.dropRate} Drop Rate
                        </Badge>
                      </div>
                    )}
                    <p className="text-zinc-400 mb-4 text-sm">{race.description}</p>
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-2">
                        Abilities:
                      </h4>
                      <ul className="space-y-1">
                        {race.abilities.map((ability, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-zinc-400 flex items-center gap-2"
                          >
                            <span className="text-amber-500">•</span>
                            {ability}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {race.passive && (
                      <div className="mt-3 pt-3 border-t border-zinc-700">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-1">
                          Passive:
                        </h4>
                        <p className="text-xs text-zinc-400">{race.passive}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

