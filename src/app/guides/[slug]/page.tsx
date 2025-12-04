import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import guidesData from '@/data/guides.json'
import { siteConfig } from '@/config/site'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = guidesData.find((g) => g.slug === params.slug)
  if (!guide) return {}

  return {
    title: `${guide.title} - ${siteConfig.name}`,
    description: guide.description,
  }
}

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }))
}

export default function GuidePage({ params }: PageProps) {
  const guide = guidesData.find((g) => g.slug === params.slug)

  if (!guide) {
    notFound()
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    Intermediate: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
    Expert: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    'All Levels': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <a href="/" className="hover:underline">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/guides" className="hover:underline">
          Guides
        </a>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-700">{guide.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-sm font-semibold rounded bg-blue-100 text-blue-800">
            {guide.category}
          </span>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded ${difficultyColors[guide.difficulty]}`}
          >
            {guide.difficulty}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold mb-4">{guide.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{guide.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>By {guide.author}</span>
          <span>•</span>
          <span>Last updated: {guide.lastUpdated}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-8">
        {guide.content.map((section, index) => (
          <div key={index} className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{section.section}</h2>
            <p className="text-gray-700 leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Guides */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-900">Related Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidesData
            .filter(
              (g) =>
                g.slug !== guide.slug &&
                (g.category === guide.category ||
                  g.tags.some((tag) => guide.tags.includes(tag)))
            )
            .slice(0, 2)
            .map((relatedGuide) => (
              <a
                key={relatedGuide.slug}
                href={`/guides/${relatedGuide.slug}`}
                className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold mb-1">{relatedGuide.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{relatedGuide.description}</p>
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}

