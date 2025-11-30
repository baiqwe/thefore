// File: src/app/codes/page.tsx

import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import codesData from '@/data/codes.json'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import SEOHead from '@/components/SEOHead'

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
    <div className="container mx-auto px-4 py-10 max-w-4xl">
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
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Looking for the latest <strong>The Forge codes</strong> to get free <span className="font-semibold text-amber-700">Race Rerolls</span> and <span className="font-semibold text-amber-700">Gems</span>? You are in the right place. 
          We update this page daily to ensure you never miss a reward for this popular Roblox RPG.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last checked: <span className="font-medium text-amber-600">{currentMonth} {new Date().getDate()}, {currentYear}</span>
        </p>
      </div>

      {/* Active Codes Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
            Active Codes
          </h2>
          <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
            {activeCodes.length} Working
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCodes.map((code, index) => (
            <div key={index} className="bg-white border-l-4 border-amber-500 shadow-md rounded-lg p-5 hover:shadow-lg transition-all hover:border-amber-600">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xl font-bold text-gray-800 tracking-wide">{code.code}</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase">Active</span>
              </div>
              <p className="text-amber-700 font-medium mb-1">🎁 {code.reward}</p>
              <p className="text-sm text-gray-600">{code.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Guide Section (Text Heavy for Google) */}
      <div className="prose prose-lg max-w-none bg-gray-50 p-8 rounded-xl border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Get More Free Rerolls in The Forge</h2>
        <p>
          Besides using the codes listed above, players can earn free race rerolls by completing daily quests and finding hidden chests in the <strong>Volcanic Depths</strong>. 
          If you are looking to get a Legendary race like the <strong>Dragonborn</strong> or <strong>Angel</strong>, make sure to save up your Gems.
        </p>
        <p>
          Don&apos;t forget to check our <Link href="/wiki/race-tier-list" className="text-amber-600 hover:underline">Race Tier List</Link> to see which race you should aim for before using your rerolls!
        </p>

        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Troubleshooting: Why Codes Might Not Work</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Case Sensitivity:</strong> Roblox codes are often case-sensitive. Make sure &apos;BETA&apos; is capitalized.</li>
          <li><strong>Expired:</strong> Codes like &apos;RELEASE&apos; have expired as of {currentMonth} {currentYear}.</li>
          <li><strong>Typo:</strong> Ensure there are no spaces before or after the code.</li>
        </ul>
      </div>

      {/* Expired Codes (SEO Food - Keep them but visually muted) */}
      {expiredCodes.length > 0 && (
        <div className="opacity-70">
          <h2 className="text-xl font-bold mb-4 text-gray-600">Expired Codes (Archive)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {expiredCodes.map((code, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded border border-gray-200">
                <span className="font-mono font-semibold text-gray-500 line-through block">{code.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
