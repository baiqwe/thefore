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
  S: "from-red-100 to-orange-100 border-red-300",
  A: "from-amber-100 to-yellow-100 border-amber-300",
  B: "from-blue-100 to-cyan-100 border-blue-300",
  C: "from-green-100 to-emerald-100 border-green-300",
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
              className={`bg-gradient-to-r ${tierColors[tier as keyof typeof tierColors]} p-4 rounded-lg border-2`}
            >
              <h2 className="text-2xl font-bold text-gray-800">
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
                      <div className="mb-3">
                        <Badge variant="outline" className="text-xs font-semibold text-gray-700 border-gray-300">
                          {race.dropRate} Drop Rate
                        </Badge>
                      </div>
                    )}
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{race.description}</p>
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Abilities:
                      </h4>
                      <ul className="space-y-1.5">
                        {race.abilities.map((ability, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 flex items-center gap-2"
                          >
                            <span className="text-amber-600 font-bold">•</span>
                            {ability}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {race.passive && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">
                          Passive:
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{race.passive}</p>
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

