import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Scroll, Key, Crown, Cat } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import QuestTracker from '@/components/QuestTracker'
import questsData from '@/data/quests.json'

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

      <div className="space-y-8">
        {questsData.map((quest) => (
          <Card key={quest.id} id={quest.id} className="scroll-mt-20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${quest.type === 'Main Quest' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {quest.type === 'Main Quest' ? <Crown className="h-6 w-6" /> : <Scroll className="h-6 w-6" />}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{quest.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={quest.difficulty === 'Easy' ? 'default' : quest.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                        {quest.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">{quest.type}</span>
                    </div>
                  </div>
                </div>
                <QuestTracker questId={quest.id} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{quest.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Location</h3>
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="text-amber-600 font-semibold">📍 {quest.location}</span>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Objectives</h3>
                <ul className="list-none space-y-2">
                  {quest.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-4">
                <h4 className="font-bold text-amber-900 mb-1">Rewards:</h4>
                <div className="flex flex-wrap gap-2 text-sm text-amber-800">
                  <span className="font-semibold">💰 {quest.rewards.coins} Coins</span>
                  {quest.rewards.items.map((item, i) => (
                    <span key={i} className="bg-white px-2 py-0.5 rounded border border-amber-200">
                      🎁 {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
