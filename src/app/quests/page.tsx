import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Scroll, Key, Crown, Cat } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import QuestTracker from '@/components/QuestTracker'

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = {
  title: `The Forge Quest Guides: Bard's Guitar & Goblin King (${currentMonth} ${currentYear})`,
  description: `Complete The Forge Roblox quest walkthroughs. Learn how to complete Bard's Lost Guitar quest for the Unknown Key, defeat the Goblin King, and find the Lost Cat. Get the Arcane Pickaxe!`,
  keywords: [
    'The Forge Quests',
    'The Forge Quest Guide',
    'The Forge Bard Quest',
    'The Forge Goblin King',
    'The Forge Arcane Pickaxe',
    'The Forge Lost Cat',
    'The Forge Roblox Quests',
    'The Forge Wiki',
  ],
}

export default function QuestsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Quests', url: '/quests' },
        ]}
      />

      {/* SEO Head */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Quests', url: '/quests' },
        ]}
      />

      {/* SEO Intro Content */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Quest Guides: Bard&apos;s Guitar & Goblin King
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Complete walkthroughs for all major <strong>The Forge Roblox quests</strong>. Learn how to get the 
          <strong> Unknown Key</strong> from Bard&apos;s quest, unlock the <strong>Arcane Pickaxe</strong>, and defeat the <strong>Goblin King</strong>.
        </p>
      </div>

      {/* Quest 1: Bard's Lost Guitar */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Scroll className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quest 1: Bard&apos;s Lost Guitar</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Essential quest for the Arcane Pickaxe</p>
              </div>
            </div>
            <QuestTracker questId="bard-guitar" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">NPC Location</h3>
            <p className="text-gray-700">
              Find the <strong>Bard NPC</strong> at the <strong>spawn campfire</strong> in <strong>The Forge Roblox</strong>.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Quest Objective</h3>
            <p className="text-gray-700">
              The Bard has lost his guitar and needs your help finding it. This quest is crucial because the reward is the 
              <strong> Unknown Key</strong>, which is used to open the <strong>Fallen Angel&apos;s Cave</strong>.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Guitar Location</h3>
            <p className="text-gray-700 mb-2">
              The guitar is hidden in a <strong>hidden hole in a bush</strong> near the NPC <strong>&quot;Umut the Brave&quot;</strong> inside the 
              <strong> Stonewake Mine</strong>.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> Look carefully around Umut the Brave. The hole is in a bush, so it&apos;s easy to miss. 
                Once you find it, return to the Bard to complete the quest.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Reward: Unknown Key</h3>
            <p className="text-gray-700">
              The <strong>Unknown Key</strong> is used to open the <strong>Fallen Angel&apos;s Cave</strong>, where you can obtain the 
              <strong> Arcane Pickaxe</strong> - one of the best mining tools in <strong>The Forge Roblox</strong>!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quest 2: Goblin King */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quest 2: Goblin King (Forgotten Kingdom)</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Advanced quest with escalating tributes</p>
              </div>
            </div>
            <QuestTracker questId="goblin-king" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Quest Location</h3>
            <p className="text-gray-700">
              This quest takes place in the <strong>Forgotten Kingdom</strong> area of <strong>The Forge Roblox</strong>.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Requirements: Escalating Tributes</h3>
            <p className="text-gray-700 mb-3">
              To challenge the <strong>Goblin King</strong>, you need to provide <strong>5 escalating tributes</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>First Tribute:</strong> Gold</li>
              <li><strong>Second Tribute:</strong> Gold + Topaz</li>
              <li><strong>Third Tribute:</strong> Gold + Topaz + [Next tier gem]</li>
              <li><strong>Fourth Tribute:</strong> Gold + Topaz + [Higher tier gem]</li>
              <li><strong>Fifth Tribute:</strong> Gold + Rubies (Final tribute)</li>
            </ol>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Strategy:</strong> Make sure you have enough resources before starting this quest. The tributes get progressively more expensive, 
              so plan your mining and resource gathering accordingly.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Reward</h3>
            <p className="text-gray-700">
              Defeating the <strong>Goblin King</strong> grants significant rewards and is essential for progressing through 
              <strong> The Forge Roblox</strong> end-game content.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quest 3: Lost Cat */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Cat className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quest 3: Lost Cat</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Hidden location quest</p>
              </div>
            </div>
            <QuestTracker questId="lost-cat" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">NPC Location</h3>
            <p className="text-gray-700">
              Find <strong>Tomo</strong> (the quest giver) in <strong>The Forge Roblox</strong>. He needs help finding his lost cat.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Cat Location</h3>
            <p className="text-gray-700 mb-2">
              The lost cat is located <strong>behind a waterfall wall</strong> in the <strong>Goblin Cave</strong>.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>How to Find:</strong> Look for a waterfall in the Goblin Cave area. The cat is hidden behind the waterfall wall - 
                you may need to walk through the waterfall to find it.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Reward</h3>
            <p className="text-gray-700">
              Complete this quest to receive rewards and help Tomo reunite with his cat.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Arcane Pickaxe Guide */}
      <div className="prose prose-lg max-w-none bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border-2 border-amber-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Get the Arcane Pickaxe in The Forge</h2>
        <p className="text-gray-700 mb-4">
          The <strong>Arcane Pickaxe</strong> is one of the best mining tools in <strong>The Forge Roblox</strong>. Here&apos;s how to get it:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>Complete the <strong>Bard&apos;s Lost Guitar</strong> quest to obtain the <strong>Unknown Key</strong>.</li>
          <li>Use the <strong>Unknown Key</strong> to open the <strong>Fallen Angel&apos;s Cave</strong>.</li>
          <li>Inside the cave, you&apos;ll find the <strong>Arcane Pickaxe</strong>.</li>
        </ol>
        <p className="text-gray-700 mt-4">
          The <strong>Arcane Pickaxe</strong> significantly improves your mining speed and efficiency, making it essential for 
          gathering resources in <strong>The Forge Roblox</strong>.
        </p>
      </div>

      {/* Quest Tips */}
      <div className="prose prose-lg max-w-none bg-gray-50 p-8 rounded-xl border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Forge Quest Tips</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Read quest descriptions carefully:</strong> NPCs often give hints about item locations.</li>
          <li><strong>Explore thoroughly:</strong> Many quest items are hidden in bushes, behind waterfalls, or in caves.</li>
          <li><strong>Save your resources:</strong> The Goblin King quest requires significant resources - plan ahead.</li>
          <li><strong>Complete Bard&apos;s quest first:</strong> The Arcane Pickaxe from this quest will help with all other activities.</li>
        </ul>
      </div>

      {/* Related Links */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related The Forge Wiki Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/wiki/forging" className="text-blue-600 hover:underline font-semibold">
            → Forging Guide
          </a>
          <a href="/wiki/races" className="text-blue-600 hover:underline font-semibold">
            → Race Tier List
          </a>
          <a href="/codes" className="text-blue-600 hover:underline font-semibold">
            → Get Free Codes
          </a>
        </div>
      </div>
    </div>
  )
}
