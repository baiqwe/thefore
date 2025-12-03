// File: src/app/codes/page.tsx

import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import codesData from '@/data/codes.json'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import SEOHead from '@/components/SEOHead'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowRight, Trophy, Dice5 } from 'lucide-react'

// 1. Dynamic Date Logic for SEO Titles
const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'long' });
const currentYear = date.getFullYear();

// 2. 使用 SEO 工具函数生成 Metadata
export const metadata: Metadata = generateSEOMetadata({
  title: `The Forge Codes (${currentMonth} ${currentYear}) - Free Gems & Rerolls`,
  description: `[Updated] Active The Forge codes for ${currentMonth} ${currentYear}. Redeem these OP codes for Free Gems, Race Rerolls, and Totems. No expired codes listed.`,
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

  // 2. FAQ Schema for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl 2xl:max-w-[calc(100%-416px)] 2xl:mx-auto">
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
      />

      {/* SEO Intro Content (Keyword Rich) */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          The Forge Codes ({currentMonth} {currentYear})
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Looking for the latest <strong className="text-gray-900 dark:text-gray-100">The Forge codes</strong> to get free <span className="font-semibold text-amber-700 dark:text-amber-400">Race Rerolls</span> and <span className="font-semibold text-blue-700 dark:text-blue-400">Gems</span>? You are in the right place. 
          We update this page daily to ensure you never miss a reward for this popular Roblox RPG.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Last checked: <span className="font-medium text-amber-600 dark:text-amber-400">{currentMonth} {new Date().getDate()}, {currentYear}</span>
        </p>
      </div>

      {/* --- 新增：强引导模块 (在 Active Codes 标题上方插入) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
        <Link href="/wiki/race-tier-list" className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2">
            Don&apos;t Waste Your Rerolls! <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </h3>
          <p className="text-red-100 text-xs sm:text-sm font-medium">
            Check the <strong>S-Tier Race List</strong> before you use these codes. See which Mythical race is best.
          </p>
        </Link>

        <Link href="/tools/reroll-simulator" className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Dice5 className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2">
            Test Your Luck First <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm font-medium">
            Use our <strong>Reroll Simulator</strong> to check your drop chances for Angel &amp; Demon races.
          </p>
        </Link>
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
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="font-mono text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide break-all">{code.code}</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full uppercase flex-shrink-0">Active</span>
              </div>
              <p className="text-sm sm:text-base text-amber-700 dark:text-amber-400 font-medium mb-1">🎁 {code.reward}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{code.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Guide Section (Text Heavy for Google) */}
      <div className="prose prose-lg max-w-none bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">How to Get More Free Rerolls in The Forge</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Besides using the codes listed above, players can earn free race rerolls by completing daily quests and finding hidden chests in the <strong className="text-gray-900 dark:text-gray-100">Volcanic Depths</strong>. 
          If you are looking to get a Legendary race like the <strong className="text-gray-900 dark:text-gray-100">Dragonborn</strong> or <strong className="text-gray-900 dark:text-gray-100">Angel</strong>, make sure to save up your Gems.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Don&apos;t forget to check our <Link href="/wiki/race-tier-list" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Race Tier List</Link> to see which race you should aim for before using your rerolls! 
          You can also visit our <Link href="/wiki/races" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Races Guide</Link> for detailed stats, or use our <Link href="/tools/reroll-simulator" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Reroll Simulator</Link> to test your luck.
        </p>

        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3">Troubleshooting: Why Codes Might Not Work</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong className="text-gray-900 dark:text-gray-100">Case Sensitivity:</strong> Roblox codes are often case-sensitive. Make sure &apos;BETA&apos; is capitalized.</li>
          <li><strong className="text-gray-900 dark:text-gray-100">Expired:</strong> Codes like &apos;RELEASE&apos; have expired as of {currentMonth} {currentYear}.</li>
          <li><strong className="text-gray-900 dark:text-gray-100">Typo:</strong> Ensure there are no spaces before or after the code.</li>
        </ul>
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
