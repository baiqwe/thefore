import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import guidesData from '@/data/guides.json'
import { siteConfig } from '@/config/site'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guidesData.find((g) => g.slug === slug)
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

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = guidesData.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Expert: 'bg-red-100 text-red-800',
    'All Levels': 'bg-blue-100 text-blue-800',
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
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
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>By {guide.author}</span>
          <span>•</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {typeof guide.content === 'string' ? guide.content : JSON.stringify(guide.content)}
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-900">Related Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidesData
            .filter((g) => g.slug !== guide.slug && g.category === guide.category)
            .slice(0, 2)
            .map((relatedGuide) => (
              <Link
                key={relatedGuide.slug}
                href={`/guides/${relatedGuide.slug}`}
                className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold mb-1">{relatedGuide.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{relatedGuide.description}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

