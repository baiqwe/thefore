import { Metadata } from "next"
import Link from "next/link"
import { TierList } from "@/components/TierList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import racesData from "@/data/races.json"

export const metadata: Metadata = {
  title: "Races Guide",
  description: "Complete guide to all races in The Forge Roblox - Tier list, abilities, and best races",
  keywords: [
    "Roblox The Forge Races",
    "The Forge Races",
    "The Forge Race Tier List",
    "The Forge Tier List",
    "The Forge Wiki",
    "The Forge Roblox",
  ],
}

export default function RacesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-zinc-100">
          The Forge Races Guide
        </h1>
        <p className="text-zinc-400 text-lg">
          Complete tier list and guide to all races in The Forge. Learn about
          abilities, stats, and which race is best for your playstyle.
        </p>
      </div>

      <TierList races={racesData} />

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Race Selection Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">
                For New Players
              </h3>
              <p className="text-zinc-400 text-sm">
                Start with Human or Orc for balanced gameplay. These races are
                forgiving and help you learn the game mechanics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">
                For Mining Focus
              </h3>
              <p className="text-zinc-400 text-sm">
                Dwarf is the best choice with +40% mining speed and crafting
                bonuses. Perfect for resource gathering builds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">
                For End-Game Content
              </h3>
              <p className="text-zinc-400 text-sm">
                Dragonborn is unmatched for high-level content with fire
                immunity and massive damage bonuses. Save your rerolls for this
                legendary race!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

