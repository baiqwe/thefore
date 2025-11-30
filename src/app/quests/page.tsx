import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import questsData from '@/data/quests.json'

export const metadata: Metadata = {
  title: 'Quests & Challenges',
  description: `Complete list of all quests and challenges in ${siteConfig.name}`,
}

export default function QuestsPage() {
  const mainQuests = questsData.filter((q) => q.type === 'Main Quest')
  const sideQuests = questsData.filter((q) => q.type === 'Side Quest')

  const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-orange-100 text-orange-800',
    Extreme: 'bg-red-100 text-red-800',
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Quests & Challenges</h1>
        <p className="text-gray-600 text-lg">
          Complete all quests to unlock rewards and progress through the game. Main quests advance
          the story, while side quests provide additional rewards.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">{questsData.length}</div>
          <div className="text-sm text-gray-600">Total Quests</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{mainQuests.length}</div>
          <div className="text-sm text-gray-600">Main Quests</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">{sideQuests.length}</div>
          <div className="text-sm text-gray-600">Side Quests</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {questsData.reduce((sum, q) => sum + q.rewards.coins, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Coins</div>
        </div>
      </div>

      {/* Main Quests */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Main Quests</h2>
        <div className="space-y-6">
          {mainQuests.map((quest) => (
            <div
              key={quest.id}
              className="bg-white border-l-4 border-blue-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{quest.title}</h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${difficultyColors[quest.difficulty]}`}
                    >
                      {quest.difficulty}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {quest.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{quest.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Objectives:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {quest.objectives.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Rewards:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600 font-bold">💰</span>
                      <span className="font-semibold">{quest.rewards.coins.toLocaleString()} Coins</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-bold">📦</span>
                      <span className="ml-2">
                        {Array.isArray(quest.rewards.items)
                          ? quest.rewards.items.join(', ')
                          : quest.rewards.items}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm text-gray-500">
                      <span className="font-semibold">Location:</span> {quest.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Quests */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Side Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideQuests.map((quest) => (
            <div
              key={quest.id}
              className="bg-white border-l-4 border-green-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold">{quest.title}</h3>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${difficultyColors[quest.difficulty]}`}
                >
                  {quest.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{quest.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm text-gray-700">Objectives:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {quest.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-yellow-600 font-bold text-sm">
                    💰 {quest.rewards.coins.toLocaleString()} Coins
                  </div>
                  <div className="text-blue-600 text-sm mt-1">
                    📦 {Array.isArray(quest.rewards.items) ? quest.rewards.items.join(', ') : quest.rewards.items}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{quest.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2 text-blue-900">💡 Quest Tips</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>Complete main quests first to unlock new areas and items</li>
          <li>Side quests provide valuable resources - don't skip them</li>
          <li>Check the quest location before starting to plan your route</li>
          <li>Some quests have time limits - manage your time wisely</li>
          <li>
            <Link href="/guides/quest-walkthrough" className="underline font-semibold">
              View complete quest walkthrough guide
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

