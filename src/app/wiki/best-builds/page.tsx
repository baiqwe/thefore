import { siteConfig } from "@/config/site"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Sword, Flame, TrendingUp } from "lucide-react"
import Breadcrumbs from "@/components/Breadcrumbs"
import SEOHead from "@/components/SEOHead"

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata = generateSEOMetadata({
    title: `The Forge Best Builds & Meta Recipes (${currentMonth} ${currentYear})`,
    description: `Top-tier weapon builds for The Forge Roblox Winter 2025. Discover "The Flash" Katana, "The World Ender" Colossal Sword, and more.`,
    keywords: [
        "The Forge Best Builds",
        "The Forge Meta Recipes",
        "The Forge God Tier Weapons",
        "The Forge Speed Build",
        "The Forge Tank Build",
    ],
    canonicalUrl: `${siteConfig.url}/wiki/best-builds`,
    type: 'article'
})

export default function BestBuildsPage() {
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'The Flash (Speed Build)',
                description: 'The Ultimate Speed Katana build using Lightite and Diamond.'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'The World Ender (AoE Build)',
                description: 'Colossal Sword build using Magmaite, Fireite, Galaxite, and Darkryte.'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Glass Cannon Assassin (DPS Build)',
                description: 'Dagger build using Eye Ore and Diamond for max burst damage.'
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'Poor Man\'s Legendary (Starter Build)',
                description: 'Budget build using 80% Diamond and 20% Eye Ore.'
            },
            {
                '@type': 'ListItem',
                position: 5,
                name: 'The Wall (Tank Build)',
                description: 'Immortal tank build using Obsidian, Platinum, and Titanium.'
            }
        ]
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl">
            <Breadcrumbs
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Wiki', url: '/wiki' },
                    { name: 'Best Builds', url: '/wiki/best-builds' },
                ]}
            />

            <SEOHead
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Wiki', url: '/wiki' },
                    { name: 'Best Builds', url: '/wiki/best-builds' },
                ]}
                schema={itemListSchema}
            />

            <div className="mb-12 text-center">
                <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg animate-pulse">
                    Winter 2025 Updated
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    The Forge Meta Builds Tier List
                </h1>
                <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                    The <strong>Winter 2025 Update</strong> completely changed the meta with the new <strong>Weight System</strong>.
                    <br />
                    Use these optimized ore combinations to dominate raids and PVP.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Speed Build */}
                <Card className="border-t-4 border-t-yellow-400 shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Zap className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">The Flash</CardTitle>
                                    <CardDescription className="font-semibold text-yellow-600">The Ultimate Speed Katana</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary">Speed Meta</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Recipe Composition:</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between"><span>• 4x Lightite</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Velocity Trait</span></li>
                                <li className="flex justify-between"><span>• 6x Diamond</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">High Multiplier Filler</span></li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                                <span>Total Ores: 10</span>
                                <span>Weapon: Katana</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600"><strong>Why it works:</strong> The 4 Lightite ores activate the <em>Velocity</em> trait (+15% Speed) multiple times or stack efficiency, while Diamonds keep the base damage multiplier high (~3.0x avg) without diluting it like Stone would.</p>
                            <p className="text-sm text-green-600 font-semibold">Stats: Extreme Movement Speed + Fast Attack</p>
                        </div>
                    </CardContent>
                </Card>

                {/* AoE Build */}
                <Card className="border-t-4 border-t-red-600 shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Flame className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">The World Ender</CardTitle>
                                    <CardDescription className="font-semibold text-red-600">AoE Raid Farming</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary">Farm Meta</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Recipe Composition:</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between"><span>• 10x Magmaite</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Explosion</span></li>
                                <li className="flex justify-between"><span>• 10x Fireite</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Ignite</span></li>
                                <li className="flex justify-between"><span>• 10x Galaxite</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Cosmic</span></li>
                                <li className="flex justify-between"><span>• 10x Darkryte</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Shadow</span></li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                                <span>Total Ores: 40</span>
                                <span>Weapon: Colossal Sword</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600"><strong>Why it works:</strong> This is a god-tier endgame build. It triggers <em>Explosion</em>, <em>Ignite</em>, and <em>Cosmic</em> scaling all at once. The Colossal Sword base already has max AoE range, and the traits make it cover the entire screen.</p>
                    </CardContent>
                </Card>

                {/* DPS Build */}
                <Card className="border-t-4 border-t-purple-500 shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Sword className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Glass Cannon Assassin</CardTitle>
                                    <CardDescription className="font-semibold text-purple-600">Highest Burst DPS</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary">PvP / Bossing</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Recipe Composition:</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between"><span>• 2x Eye Ore</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Glass Cannon</span></li>
                                <li className="flex justify-between"><span>• 3x Diamond</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">High Dmg Base</span></li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                                <span>Total Ores: 5</span>
                                <span>Weapon: Dagger</span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><strong>Dilution Rule:</strong> The multiplier formula is <code>(Sum of Multipliers) / Count</code>. Adding low-tier ores (like Stone 0.2x) to fill space will <strong>LOWER</strong> your weapon&apos;s stats! Use &quot;Filler Ores&quot; with care.</li>
                            <li><strong>Passive Stacking:</strong> Traits like &quot;Glass Cannon&quot; (Eye Ore) stack. Using too many can result in <strong>negative HP</strong>, making you one-shot by anything.</li>
                        </ul>
                        <p className="text-sm text-gray-600"><strong>Warning:</strong> You will suffer a <strong>-20% Max HP</strong> penalty. Do not get hit. This build melts bosses but you are extremely fragile.</p>
                    </CardContent>
                </Card>

                {/* Starter Meta Build */}
                <Card className="border-t-4 border-t-cyan-400 shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-100 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Poor Man&apos;s Legendary</CardTitle>
                                    <CardDescription className="font-semibold text-cyan-600">Best Budget / Starter Build</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary">Starter Key</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Recipe Composition:</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between"><span>• 80% Diamond</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Budget High Base</span></li>
                                <li className="flex justify-between"><span>• 20% Eye Ore</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Glass Cannon</span></li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                                <span>Total Ores: Any (Rec: 6-15)</span>
                                <span>Weapon: Katana / Rapier</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600"><strong>Why it works:</strong> Eye Ore is cheap but risky. Mixing just 20% gives you the &quot;Glass Cannon&quot; damage boost without the instant death penalty of 100% reduction. Diamonds provide a solid 2.0x base for a fraction of the cost of Lightite.</p>
                    </CardContent>
                </Card>

                {/* Tank Build */}
                <Card className="border-t-4 border-t-slate-500 shadow-lg">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Shield className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">The Wall (Immortal)</CardTitle>
                                    <CardDescription className="font-semibold text-slate-600">Unkillable PvE Tank</CardDescription>
                                </div>
                            </div>
                            <Badge variant="secondary">Survival</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Ratio Composition:</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between"><span>• 50% Obsidian</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">+Defense</span></li>
                                <li className="flex justify-between"><span>• 30% Platinum</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Durability</span></li>
                                <li className="flex justify-between"><span>• 20% Titanium</span> <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">Durability</span></li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                                <span>Target: Armor or Switch Axe</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600"><strong>Strategy:</strong> Stack as much Obsidian as possible to hit the +30% Defense cap. Platinum and Titanium ensure your gear doesn&apos;t break during long dungeon runs.</p>
                    </CardContent>
                </Card>

            </div>

            <div className="mt-12 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Shield className="h-6 w-6 text-slate-700" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Best Armor Recipes (Heavy Meta)</h2>
                </div>

                <Card className="border-t-4 border-t-slate-600 shadow-lg">
                    <CardHeader>
                        <CardTitle>The Juggernaut (PvE Tank)</CardTitle>
                        <CardDescription>Highest Defense & Durability Recipe</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Recipe Ratio (Total 30+ Ores):</h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between"><span>• 50% Obsidian</span> <span className="text-xs bg-slate-200 px-2 py-1 rounded">Defense</span></li>
                                    <li className="flex justify-between"><span>• 30% Platinum</span> <span className="text-xs bg-slate-200 px-2 py-1 rounded">Durability</span></li>
                                    <li className="flex justify-between"><span>• 20% Titanium</span> <span className="text-xs bg-slate-200 px-2 py-1 rounded">Hardness</span></li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-2"><strong>How to craft:</strong> Use at least <strong>30 ores total</strong> to guarantee the "Heavy Armor" base type. This mix ensures you hit the defense cap while maintaining enough durability for long dungeon runs.</p>
                                <div className="flex gap-2 mt-4">
                                    <Badge variant="outline">Weight: 30+</Badge>
                                    <Badge variant="outline">Type: Heavy</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center">
                <Link href="/tools/forging-calculator" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-amber-600 rounded-full hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-1">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Customize These Builds in Calculator
                </Link>
            </div>
        </div>
    )
}
