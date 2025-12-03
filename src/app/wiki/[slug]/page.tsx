import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import guidesData from "@/data/guides.json"
import racesData from "@/data/races.json"
import { TierList } from "@/components/TierList"
import { OreChart } from "@/components/OreChart"
import { AuthorInfo } from "@/components/AuthorInfo"
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import SEOHead from '@/components/SEOHead'
import Breadcrumbs from '@/components/Breadcrumbs'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}


export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guidesData.find((g) => g.slug === slug)
  if (!guide) {
    return {
      title: "Guide Not Found",
    }
  }
  const baseKeywords = [
    "The Forge",
    "Roblox The Forge",
    "The Forge Wiki",
    guide.category,
  ]

  // Add specific keywords based on guide slug
  if (slug === "lost-cat-quest") {
    baseKeywords.push("Lost Cat Guide", "Lost Cat Quest")
  }
  if (slug === "race-tier-list") {
    baseKeywords.push("The Forge Tier List", "Roblox The Forge Races")
  }

  return generateSEOMetadata({
    title: guide.title,
    description: guide.description,
    keywords: [guide.title, ...baseKeywords],
    canonicalUrl: `${siteConfig.url}/wiki/${slug}`,
    type: 'article',
  })
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = guidesData.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  // Render content based on slug
  let content = null
  let headings: string[] = []
  
  if (slug === "race-tier-list") {
    content = <TierList races={racesData} />
  } else if (slug === "ore-depths-guide") {
    content = <OreChart />
  } else {
    // Render content array
    const contentArray = Array.isArray(guide.content) ? guide.content : []
    headings = contentArray.map((item: any) => item.section).filter(Boolean)
    
    content = (
      <div className="prose prose-invert max-w-none">
        {contentArray.map((item: any, index: number) => {
          if (item.section) {
            return (
              <div key={index} className="mb-6">
                <h2
                  id={item.section.toLowerCase().replace(/\s+/g, "-")}
                  className="text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100 scroll-mt-20"
                >
                  {item.section}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {item.text}
                </p>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 2xl:px-[192px]">
      {/* SEO Head with Schema */}
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: guide.title, url: `/wiki/${slug}` },
        ]}
        article={{
          title: guide.title,
          description: guide.description,
          url: `/wiki/${slug}`,
          author: 'The Forge Wiki',
        }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki' },
          { name: guide.title, url: `/wiki/${slug}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">
                  {guide.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>By {guide.author}</span>
                  <span>•</span>
                  <span>{guide.category}</span>
                  <span>•</span>
                  <span>{guide.difficulty}</span>
                </div>
              </div>
              {content}
              <AuthorInfo
                author={guide.author}
                authorBio={(guide as any).authorBio}
                lastUpdated={(guide as any).lastUpdated}
              />
            </CardContent>
          </Card>
        </div>

        {/* Table of Contents Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => {
                      const id = heading.toLowerCase().replace(/\s+/g, "-")
                      return (
                        <a
                          key={index}
                          href={`#${id}`}
                          className="block text-sm text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1"
                        >
                          {heading}
                        </a>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            )}

            {/* --- 新增：侧边栏热门推荐 (增加 PV 的关键) --- */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-5">
                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                  🔥 Popular Now
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/codes" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 block transition-colors">
                      → Latest Redeem Codes
                    </Link>
                  </li>
                  <li>
                    <Link href="/wiki/race-tier-list" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 block transition-colors">
                      → S-Tier Race List
                    </Link>
                  </li>
                  <li>
                    <Link href="/wiki/forging" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 block transition-colors">
                      → How to Forge Masterworks
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/reroll-simulator" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 block transition-colors">
                      → Reroll Simulator
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            {/* ------------------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  )
}

