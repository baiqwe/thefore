'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Hammer, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import itemsData from '@/data/items.json'

// Crafting recipes - mapping items to required materials
const craftingRecipes: Record<string, { ore: string; ingots: number; depth: string; rarity: string }> = {
  'Iron Pickaxe': { ore: 'Iron', ingots: 5, depth: '50-150m', rarity: 'Uncommon' },
  'Golden Sword': { ore: 'Gold', ingots: 8, depth: '150-400m', rarity: 'Rare' },
  'Mithril Blade': { ore: 'Mithril', ingots: 10, depth: '400-700m', rarity: 'Epic' },
  'Demonite Axe': { ore: 'Demonite', ingots: 12, depth: '600-900m', rarity: 'Legendary' },
  'Colossal Sword': { ore: 'Luminite', ingots: 15, depth: '1000-1200m', rarity: 'Mythical' },
}

// Ore to ingot conversion (typically 1 ore = 1 ingot, but some require smelting with coal)
const oreToIngotRatio: Record<string, number> = {
  'Iron': 1,
  'Gold': 1,
  'Mithril': 1,
  'Demonite': 1,
  'Luminite': 1,
  'Copper': 1,
  'Silver': 1,
  'Platinum': 1,
  'Titanium': 1,
  'Adamantite': 1,
}

// Get craftable items from items.json
const craftableItems = itemsData.filter(item => 
  item.type === 'Weapon' || item.type === 'Tool'
).filter(item => 
  item.stats?.crafting || craftingRecipes[item.name]
)

export default function ForgingCalculatorPage() {
  const [selectedItem, setSelectedItem] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

  const selectedItemData = itemsData.find(item => item.name === selectedItem)
  const recipe = selectedItem ? craftingRecipes[selectedItem] : null

  const calculateMaterials = () => {
    if (!recipe) return null

    const totalIngots = recipe.ingots * quantity
    const totalOres = totalIngots * (oreToIngotRatio[recipe.ore] || 1)
    
    return {
      ore: recipe.ore,
      ingots: totalIngots,
      ores: totalOres,
      depth: recipe.depth,
      rarity: recipe.rarity,
    }
  }

  const materials = calculateMaterials()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      case 'Uncommon': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      case 'Rare': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
      case 'Epic': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
      case 'Legendary': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
      case 'Mythical': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'Forging Calculator', url: '/tools/forging-calculator' },
        ]}
      />

      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'Forging Calculator', url: '/tools/forging-calculator' },
        ]}
        faq={[
          {
            question: 'How accurate are the material requirements in this calculator?',
            answer: 'Our calculator is based on verified crafting recipes tested through extensive gameplay. The material requirements (ingots per item) are accurate for the current version of The Forge. We regularly verify our data against the latest game version to ensure accuracy.',
          },
          {
            question: 'Do I need Coal to smelt ores into ingots?',
            answer: 'Yes, you need Coal as fuel to smelt ores into ingots at the furnace. The conversion ratio is typically 1 ore = 1 ingot, but you\'ll need Coal for the smelting process. Coal is found at depths of 0-50m, making it easy to obtain early in the game.',
          },
          {
            question: 'What\'s the difference between Normal, Masterwork, and Legendary quality?',
            answer: 'Normal quality is the baseline - you achieve it by completing all three forging steps correctly. Masterwork quality provides significantly superior stats (typically 20-30% better) and requires perfect timing on all three steps. Legendary quality is extremely rare and provides maximum power, requiring flawless execution.',
          },
          {
            question: 'Can I craft items without the required pickaxe for that depth?',
            answer: 'Technically yes, but it\'s extremely inefficient. We strongly recommend obtaining the Arcane Pickaxe before attempting to craft Epic-tier or higher items, as it provides +200% mining speed and 100% luck chance.',
          },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          Forging Calculator
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Calculate the exact materials needed to forge weapons and tools in The Forge. Plan your mining trips efficiently!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Item Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hammer className="w-5 h-5" />
              Select Item to Forge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Item
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Choose an item...</option>
                  {craftableItems.map(item => (
                    <option key={item.slug} value={item.name}>
                      {item.name} ({item.stats?.rarity || 'Unknown'})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {materials && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Required Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${getRarityColor(materials.rarity)}`}>
                  <h3 className="text-xl font-bold mb-2">{selectedItem}</h3>
                  <p className="text-sm opacity-80 mb-4">
                    {selectedItemData?.description || 'Craftable item'}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="font-semibold">Required Ingots:</span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {materials.ingots} {materials.ore} Ingots
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="font-semibold">Required Ores:</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {materials.ores} {materials.ore} Ore
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <span className="font-semibold">Mining Depth:</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {materials.depth}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Tip:</strong> You&apos;ll need to smelt {materials.ores} {materials.ore} ore into ingots at the furnace before forging. 
                    {materials.rarity === 'Legendary' || materials.rarity === 'Mythical' 
                      ? ' Make sure you have the Arcane Pickaxe for efficient mining at these depths!' 
                      : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Crafting Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Forging Process Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">1️⃣</span>
                  <h3 className="font-bold text-blue-900 dark:text-blue-300">Mine Ores</h3>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Use your pickaxe to mine the required ores at the specified depth range.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">2️⃣</span>
                  <h3 className="font-bold text-green-900 dark:text-green-300">Smelt to Ingots</h3>
                </div>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Take your ores to the furnace and smelt them into ingots using Coal as fuel.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">3️⃣</span>
                  <h3 className="font-bold text-purple-900 dark:text-purple-300">Forge at Anvil</h3>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  Master the 3-step forging minigame at the Anvil to create your item. Aim for Masterwork quality!
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Quality Levels</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Normal:</strong> Baseline stats - achieved by completing all 3 steps</li>
                <li><strong>Masterwork:</strong> Superior stats - requires perfect timing on all steps</li>
                <li><strong>Legendary:</strong> Maximum power - extremely rare, requires flawless execution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content: What, How, FAQ */}
      <div className="mt-12 space-y-8">
        {/* What Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">What is The Forge Forging Calculator?</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>Forging Calculator</strong> is an essential planning tool for <strong>The Forge Roblox</strong> players who want to craft weapons and tools efficiently. This calculator helps you determine exactly how many ores and ingots you need to forge any craftable item, saving you time and preventing wasted resources.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In <strong>The Forge</strong>, crafting requires a multi-step process: mining ores at specific depths, smelting them into ingots at the furnace, and then forging items at the anvil using a manual 3-step minigame. Each item requires different amounts of materials, and planning ahead is crucial for efficient gameplay.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our calculator is based on verified crafting recipes from extensive gameplay testing. It provides accurate material requirements for all major craftable items, from basic <strong>Iron Pickaxes</strong> to legendary <strong>Colossal Swords</strong>. This tool helps thousands of players optimize their mining and crafting strategies, ensuring they gather the right materials before starting the forging process.
            </p>
          </CardContent>
        </Card>

        {/* How Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How to Use The Forging Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 1: Select Your Item</h3>
                <p className="leading-relaxed">
                  Choose the item you want to forge from the dropdown menu. The calculator supports all major craftable items including weapons (Golden Sword, Mithril Blade, Demonite Axe, Colossal Sword) and tools (Iron Pickaxe). Each item shows its rarity tier to help you understand the material requirements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 2: Set Quantity</h3>
                <p className="leading-relaxed">
                  Enter how many items you want to craft (1-100). The calculator will automatically multiply the material requirements. This is especially useful when planning to craft multiple items or when preparing materials for multiple attempts to achieve Masterwork quality.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 3: Review Material Requirements</h3>
                <p className="leading-relaxed">
                  The calculator displays three key pieces of information: (1) <strong>Required Ingots</strong> - the number of ingots needed for forging, (2) <strong>Required Ores</strong> - the total raw ores you need to mine (accounting for the 1:1 ore-to-ingot conversion), and (3) <strong>Mining Depth</strong> - the optimal depth range where you can find the required ore.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 4: Plan Your Mining Trip</h3>
                <p className="leading-relaxed">
                  Use the mining depth information with our <a href="/tools/ore-depth-finder" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Ore Depth Finder</a> to plan your mining expedition. For example, if you need 10 Mithril Ingots for a Mithril Blade, you&apos;ll need to mine at 400-700m depth. Make sure you have the appropriate pickaxe (Arcane Pickaxe recommended for depths above 400m).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Step 5: Execute Your Plan</h3>
                <p className="leading-relaxed">
                  Once you have all materials, follow the 3-step forging process: (1) Mine the required ores at the specified depth, (2) Smelt ores into ingots at the furnace using Coal as fuel, (3) Forge your item at the anvil using the manual minigame. Aim for Masterwork quality by perfecting all three steps!
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
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">How accurate are the material requirements in this calculator?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our calculator is based on verified crafting recipes tested through extensive gameplay. The material requirements (ingots per item) are accurate for the current version of <strong>The Forge</strong>. However, note that the actual material costs may vary slightly if the game receives updates. We regularly verify our data against the latest game version to ensure accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Do I need Coal to smelt ores into ingots?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes, you need <strong>Coal</strong> as fuel to smelt ores into ingots at the furnace. The conversion ratio is typically 1 ore = 1 ingot, but you&apos;ll need Coal for the smelting process. Make sure to gather extra Coal when mining, especially if you&apos;re planning to craft multiple items. Coal is found at depths of 0-50m, making it easy to obtain early in the game.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">What&apos;s the difference between Normal, Masterwork, and Legendary quality?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Normal quality</strong> is the baseline - you achieve it by completing all three forging steps correctly. <strong>Masterwork quality</strong> provides significantly superior stats (typically 20-30% better) and requires perfect timing on all three steps. <strong>Legendary quality</strong> is extremely rare and provides maximum power, requiring flawless execution. The material requirements are the same regardless of quality - the difference is in your forging skill during the minigame.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Can I craft items without the required pickaxe for that depth?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Technically yes, but it&apos;s extremely inefficient. For example, you <em>could</em> mine <strong>Demonite</strong> (600-900m) with an Iron Pickaxe, but it would take 10x longer than with the <strong>Arcane Pickaxe</strong>. We strongly recommend obtaining the <a href="/wiki/arcane-pickaxe-guide" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Arcane Pickaxe</a> before attempting to craft Epic-tier or higher items, as it provides +200% mining speed and 100% luck chance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">What if I fail the forging minigame?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you fail any step of the forging minigame, you&apos;ll still create the item, but it will be <strong>Normal quality</strong> instead of Masterwork or Legendary. The materials are consumed regardless of quality, so practice the minigame with common materials (Iron, Copper) before attempting rare ores. You can always try again with new materials if you want to aim for Masterwork quality.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Should I craft multiple items at once or one at a time?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                It depends on your goals. If you&apos;re aiming for <strong>Masterwork quality</strong>, craft one at a time so you can focus on perfecting each minigame. If you just need functional items (Normal quality is fine), you can gather materials for multiple items and craft them in sequence. Use the quantity feature in this calculator to plan for multiple items efficiently.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Are there any items that can&apos;t be crafted?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes, some items are obtained through quests rather than crafting. For example, the <strong>Arcane Pickaxe</strong> is obtained by completing Bard&apos;s Lost Guitar quest, not through forging. The <strong>Unknown Key</strong> is also a quest reward. This calculator focuses on items that can be forged at the anvil using the manual forging minigame. Check our <a href="/items" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Items database</a> to see which items are craftable vs. quest rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

