import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import guidesData from "@/data/guides.json"
import racesData from "@/data/races.json"
import { TierList } from "@/components/TierList"
import { OreChart } from "@/components/OreChart"

interface PageProps {
  params: {
    slug: string
  }
}

function extractHeadings(content: string): string[] {
  const headingRegex = /^###? (.*)$/gm
  const matches = content.match(headingRegex)
  return matches ? matches.map((match) => match.replace(/^###? /, "")) : []
}

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const guide = guidesData.find((g) => g.slug === params.slug)
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
  if (params.slug === "lost-cat-quest") {
    baseKeywords.push("Lost Cat Guide", "Lost Cat Quest")
  }
  if (params.slug === "race-tier-list") {
    baseKeywords.push("The Forge Tier List", "Roblox The Forge Races")
  }

  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.title, ...baseKeywords],
  }
}

export default function GuidePage({ params }: PageProps) {
  const guide = guidesData.find((g) => g.slug === params.slug)

  if (!guide) {
    notFound()
  }

  const headings = extractHeadings(guide.content)

  // Render content based on slug
  let content = null
  if (params.slug === "race-tier-list") {
    content = <TierList races={racesData} />
  } else if (params.slug === "ore-depths-guide") {
    content = <OreChart />
  } else {
    // Render markdown-like content
    const lines = guide.content.split("\n")
    content = (
      <div className="prose prose-invert max-w-none">
        {lines.map((line, index) => {
          if (line.startsWith("# ")) {
            return (
              <h1 key={index} className="text-4xl font-bold mb-4 text-zinc-100">
                {line.replace(/^# /, "")}
              </h1>
            )
          } else if (line.startsWith("## ")) {
            return (
              <h2
                key={index}
                id={line.replace(/^## /, "").toLowerCase().replace(/\s+/g, "-")}
                className="text-3xl font-bold mt-8 mb-4 text-zinc-100 scroll-mt-20"
              >
                {line.replace(/^## /, "")}
              </h2>
            )
          } else if (line.startsWith("### ")) {
            return (
              <h3
                key={index}
                id={line.replace(/^### /, "").toLowerCase().replace(/\s+/g, "-")}
                className="text-2xl font-semibold mt-6 mb-3 text-zinc-200 scroll-mt-20"
              >
                {line.replace(/^### /, "")}
              </h3>
            )
          } else if (line.startsWith("- ")) {
            return (
              <li key={index} className="text-zinc-300 ml-6 mb-1">
                {line.replace(/^- /, "")}
              </li>
            )
          } else if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={index} className="font-semibold text-zinc-200 mb-2">
                {line.replace(/\*\*/g, "")}
              </p>
            )
          } else if (line.trim() === "") {
            return <br key={index} />
          } else {
            return (
              <p key={index} className="text-zinc-300 mb-4 leading-relaxed">
                {line}
              </p>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
        <Link href="/" className="hover:text-amber-500 transition-colors flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/wiki" className="hover:text-amber-500 transition-colors">
          Wiki
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-zinc-300">{guide.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-extrabold mb-4 text-zinc-100">
                  {guide.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <span>By {guide.author}</span>
                  <span>•</span>
                  <span>{guide.category}</span>
                  <span>•</span>
                  <span>{guide.difficulty}</span>
                </div>
              </div>
              {content}
            </CardContent>
          </Card>
        </div>

        {/* Table of Contents Sidebar */}
        {headings.length > 0 && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-zinc-100">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => {
                      const id = heading.toLowerCase().replace(/\s+/g, "-")
                      return (
                        <a
                          key={index}
                          href={`#${id}`}
                          className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors py-1"
                        >
                          {heading}
                        </a>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

