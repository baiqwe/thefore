import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = generateSEOMetadata({
  title: `The Forge Roblox Ores & Price List (${currentMonth} ${currentYear})`,
  description: `Complete The Forge Roblox ores database with sell prices, rarity, and depth locations. Find the best ores to mine including Mythical Adamantite and Godly Luminite.`,
  keywords: [
    'The Forge Ores',
    'The Forge Mining',
    'The Forge Ore Prices',
    'The Forge Roblox Ores',
    'The Forge Ore Locations',
    'The Forge Wiki',
  ],
  canonicalUrl: `${siteConfig.url}/wiki/ores`,
  type: 'article',
})

export default function OresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}




