"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OreData {
  depth: string
  ores: string[]
  color: string
}

const oreData: OreData[] = [
  {
    depth: "0-100m",
    ores: ["Copper Ore", "Iron Ore"],
    color: "bg-zinc-700",
  },
  {
    depth: "100-300m",
    ores: ["Silver Ore", "Gold Ore"],
    color: "bg-gray-600",
  },
  {
    depth: "300-600m",
    ores: ["Platinum Ore", "Mithril Ore"],
    color: "bg-blue-700",
  },
  {
    depth: "600-1000m",
    ores: ["Adamantite Ore", "Dragon Scale Ore"],
    color: "bg-purple-700",
  },
]

export function OreChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ore Depths Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {oreData.map((data, index) => (
            <div
              key={index}
              className={`${data.color} rounded-lg p-4 border border-zinc-700`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white">{data.depth}</h3>
                <span className="text-xs text-zinc-300">
                  Depth Level {index + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.ores.map((ore, oreIndex) => (
                  <span
                    key={oreIndex}
                    className="bg-zinc-900/50 px-3 py-1 rounded-full text-sm text-zinc-100 border border-zinc-600"
                  >
                    {ore}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-amber-950/30 border border-amber-800 rounded-lg">
          <p className="text-sm text-amber-200">
            <strong>Tip:</strong> Deeper ores require better equipment and
            provide more valuable materials. Always bring torches and proper
            mining tools!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}



