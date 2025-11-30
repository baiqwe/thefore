import { generateBreadcrumbSchema, generateArticleSchema, generateVideoSchema } from '@/lib/seo'
import { siteConfig } from '@/config/site'

interface SEOHeadProps {
  breadcrumbs?: Array<{ name: string; url: string }>
  article?: {
    title: string
    description: string
    publishedTime?: string
    modifiedTime?: string
    author?: string
    image?: string
    url: string
  }
  faq?: Array<{ question: string; answer: string }>
  video?: {
    name: string
    description: string
    thumbnailUrl: string
    uploadDate: string
    duration?: string
    contentUrl: string
    embedUrl: string
  }
  schema?: object
}

/**
 * SEO Head 组件
 * 用于注入结构化数据 (JSON-LD Schema)
 */
export default function SEOHead({ breadcrumbs, article, faq, video, schema }: SEOHeadProps) {
  const schemas: object[] = []

  // 添加面包屑导航 Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs))
  }

  // 添加文章 Schema
  if (article) {
    schemas.push(generateArticleSchema(article))
  }

  // 添加 FAQ Schema
  if (faq && faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    })
  }

  // 添加视频 Schema
  if (video) {
    schemas.push(generateVideoSchema(video))
  }

  // 添加自定义 Schema
  if (schema) {
    schemas.push(schema)
  }

  if (schemas.length === 0) {
    return null
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

