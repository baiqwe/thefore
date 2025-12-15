// File: src/app/codes/page.tsx

import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import codesData from '@/data/codes.json'

import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import SEOHead from '@/components/SEOHead'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowRight, Trophy, Dice5 } from 'lucide-react'
import CopyButton from '@/components/CopyButton'
import LastUpdated from '@/components/LastUpdated'

// 1. Dynamic Date Logic for SEO Titles (Static for build)
const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'long' });
const currentYear = date.getFullYear();

// 2. SEO Metadata
export const metadata: Metadata = generateSEOMetadata({
  title: `The Forge Codes (${currentMonth} ${currentYear}) - Roblox Promo Codes & Rewards`,
  description: `Active The Forge codes for ${currentMonth} ${currentYear}. The most up-to-date list. Redeem these OP codes for Free Gems, Race Rerolls, and Totems.`,
  keywords: [
    'The Forge Codes',
    'The Forge Roblox Codes',
    'The Forge Free Codes',
    'The Forge Redeem Codes',
    'The Forge Wiki',
    'Roblox The Forge',
  ],
  canonicalUrl: `${siteConfig.url}/codes`,
  type: 'website',
})

export default function CodesPage() {
  const activeCodes = codesData.filter((code) => code.status === 'Active')
  const expiredCodes = codesData.filter((code) => code.status === 'Expired')

  const today = new Date()
  const lastVerifiedDate = today.toISOString()

  // FAQ Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: lastVerifiedDate, // 总是使用当前日期，向 Google 发送新鲜度信号
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I redeem codes in The Forge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open The Forge in Roblox, click the Gear icon (Settings) at the top-left, scroll down to the "Codes" section, enter the code and click Claim.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the latest active codes for The Forge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Currently, there are ${activeCodes.length} active codes available, including rewards like Free Rerolls and Gems. Check our updated list for details.`,
        },
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Codes', url: '/codes' },
        ]}
      />

      {/* SEO Head Component with Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Codes', url: '/codes' },
        ]}
        faq={[
          {
            question: 'How do I redeem codes in The Forge?',
            answer: 'Open The Forge in Roblox, click the Gear icon (Settings) at the top-left, scroll down to the "Codes" section, enter the code and click Claim.',
          },
          {
            question: 'What are the latest active codes for The Forge?',
            answer: `Currently, there are ${activeCodes.length} active codes available, including rewards like Free Rerolls and Gems. Check our updated list for details.`,
          },
        ]}
        schema={jsonLd}
      />

      {/* SEO Intro Content (Keyword Rich) */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Codes ({currentMonth} {currentYear})
        </h1>

        {/* Dynamic Date Component */}
        <div className="flex justify-center mb-6">
          <LastUpdated />
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Looking for the latest <strong className="text-gray-900 dark:text-gray-100">The Forge codes</strong>?
          We monitor the official Discord daily to bring you the best rewards.
        </p>
      </div>

      {/* Internal Linking / CTA Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
        <a href="/wiki/race-tier-list" className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2">
            Don&apos;t Waste Your Rerolls! <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </h3>
          <p className="text-red-100 text-xs sm:text-sm font-medium">
            Check the <strong>S-Tier Race List</strong> before you use these codes. See which Mythical race is best.
          </p>
        </a>

        <a href="/wiki/best-builds" className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Dice5 className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2">
            Winter 2025 Meta Builds <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm font-medium">
            Don&apos;t waste ores! Check the <strong>Best Weapon Recipes</strong> guide to craft Godly gear efficiently.
          </p>
        </a>
      </div>
      {/* ------------------------------------------------------- */}

      {/* Active Codes Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <span className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse"></span>
            Active Codes
          </h2>
          <span className="text-xs sm:text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full font-medium whitespace-nowrap">
            {activeCodes.length} Working
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {activeCodes.map((code, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border-l-4 border-amber-500 dark:border-amber-400 shadow-md rounded-lg p-4 sm:p-5 hover:shadow-lg transition-all hover:border-amber-600 dark:hover:border-amber-300">
              <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-mono text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide break-all">{code.code}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CopyButton text={code.code} size="sm" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full uppercase">Active</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-amber-700 dark:text-amber-400 font-medium mb-1">🎁 {code.reward}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{code.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Guide Section (Text Heavy for Google) */}
      <div className="prose prose-lg max-w-none bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">The Forge Economy Guide: How to Spend Smart (2025 Strategy)</h2>

        <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-6">
          The number one mistake new players make in <strong>The Forge</strong> is wasting their free Gems and Rerolls early on.
          This economy guide will teach you the mathematical best way to use the codes strictly for progression.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">1. The Reroll Strategy (Don&apos;t Gamble!)</h3>
        <p className="text-gray-700 dark:text-gray-300">
          The codes above provide a limited number of <strong>Race Rerolls</strong>. Only use them if:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
          <li>You are currently a <span className="font-semibold text-gray-500">Human</span> or <span className="font-semibold text-green-600">Goblin</span> (Tier D/F).</li>
          <li>You have not yet reached mining depth 500m (where racial bonuses matter less).</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Pro Tip:</strong> If you roll a <strong>Dwarf</strong> (Tier A for Mining), <em className="italic">STOP REROLLING</em>.
          The chance of getting a Legendary race like <strong>Dragonborn</strong> is only 0.5%.
          It is mathematically better to keep the Dwarf (25% Mining Speed) than to risk it all for a Dragonborn unless you have 50+ rerolls banked.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">2. Gem Spending: The &quot;Noob Trap&quot;</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Many players use codes to get 500-1000 Gems and immediately buy Gold. <strong>This is a massive waste.</strong>
        </p>
        <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-l-4 border-l-4 border-amber-500 my-4">
          <p className="font-bold text-amber-900 dark:text-amber-100">
            ⛔ NEVER BUY GOLD WITH GEMS.
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
            Gold is easily farmable by mining Coal/Iron for 10 minutes. Gems are premium currency.
          </p>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Best Gem Investments:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
          <li><strong>Starter Pack (499 Gems):</strong> Best value. Gives you a decent pickaxe to skip the early grind.</li>
          <li><strong>Storage Expansion:</strong> Essential for late game when you need to stockpile <em>Adamantite</em> and <em>Luminite</em>.</li>
          <li><strong>Race Rerolls:</strong> Only buy these if you are desperate to fix a bad race roll.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">3. Troubleshooting Code Errors</h3>
        <p className="text-gray-700 dark:text-gray-300">
          If you see &quot;Invalid Code&quot;, check these three things:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Case Sensitivity:</strong> <code>winter2025</code> is NOT the same as <code>WINTER2025</code>. Roblox codes are strict.</li>
          <li><strong>Server Lag:</strong> Sometimes the server is outdated. Try joining a new server (Server Hop).</li>
          <li><strong>Platform:</strong> Some codes are &quot;Xbox Only&quot; or &quot;PC Only&quot;, though this is rare in The Forge.</li>
        </ol>
      </div>

      {/* Expired Codes (SEO Food - Keep them but visually muted) */}
      {expiredCodes.length > 0 && (
        <div className="opacity-70">
          <h2 className="text-xl font-bold mb-4 text-gray-600 dark:text-gray-400">Expired Codes (Archive)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {expiredCodes.map((code, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                <span className="font-mono font-semibold text-gray-600 dark:text-gray-400 line-through block">{code.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
