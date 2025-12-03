import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

/**
 * SEO 工具函数库
 * 根据 Moz SEO 最佳实践自动生成 Meta Tags
 */

export interface SEOOptions {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article' | 'video'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  canonicalUrl?: string
  noindex?: boolean
}

/**
 * 自动生成 Meta Description
 * 如果没有提供描述，从内容中截取前 160 个字符
 */
export function generateMetaDescription(
  description?: string,
  content?: string
): string {
  if (description) {
    return description.length > 160 ? description.slice(0, 157) + '...' : description
  }

  if (content) {
    // 移除 HTML 标签和多余空格
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    
    // 尝试在句号处截断
    const sentences = cleanContent.match(/[^.!?]+[.!?]+/g) || []
    let result = ''
    
    for (const sentence of sentences) {
      if ((result + sentence).length <= 160) {
        result += sentence
      } else {
        break
      }
    }
    
    if (result) {
      return result.trim()
    }
    
    // 如果无法在句号处截断，直接截取
    return cleanContent.slice(0, 157) + '...'
  }

  return siteConfig.description
}

/**
 * 生成优化的 Title Tag
 * 如果标题包含 'Codes'，自动添加 'Latest Codes & Rewards'
 */
export function generateTitle(title: string): string {
  const baseTitle = title.includes('Codes')
    ? `${title} - Latest Codes & Rewards`
    : title
  
  // 确保标题不超过 60 个字符（SEO 最佳实践）
  if (baseTitle.length > 60) {
    return baseTitle.slice(0, 57) + '...'
  }
  
  return baseTitle
}

/**
 * 生成完整的 Metadata 对象
 */
export function generateMetadata(options: SEOOptions): Metadata {
  const title = generateTitle(options.title)
  const description = generateMetaDescription(options.description)
  
  // 修复 canonical URL 逻辑：确保所有 URL 都是绝对路径
  let canonicalUrl = options.canonicalUrl || ''
  if (canonicalUrl && !canonicalUrl.startsWith('http')) {
    // 确保路径以 / 开头
    if (!canonicalUrl.startsWith('/')) canonicalUrl = `/${canonicalUrl}`
    canonicalUrl = `${siteConfig.url}${canonicalUrl}`
  } else if (!canonicalUrl) {
    canonicalUrl = siteConfig.url
  }
  
  const ogImage = options.image || siteConfig.ogImage

  return {
    title,
    description,
    keywords: options.keywords || [
      'The Forge Roblox',
      'The Forge Wiki',
      'Roblox RPG',
    ],
    authors: options.author ? [{ name: options.author }] : undefined,
    openGraph: {
      type: options.type || 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(options.type === 'article' && options.publishedTime && {
        publishedTime: options.publishedTime,
      }),
      ...(options.type === 'article' && options.modifiedTime && {
        modifiedTime: options.modifiedTime,
      }),
    } as any,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    ...(options.canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(options.noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

/**
 * 生成面包屑导航的 JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

/**
 * 生成文章页面的 JSON-LD Schema
 */
export function generateArticleSchema(options: {
  title: string
  description: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  image?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    image: options.image || siteConfig.ogImage,
    datePublished: options.publishedTime,
    dateModified: options.modifiedTime || options.publishedTime,
    author: {
      '@type': 'Organization',
      name: options.author || 'The Forge Wiki',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${options.url}`,
    },
    about: {
      '@type': 'VideoGame',
      name: 'The Forge',
      gamePlatform: 'Roblox',
      publisher: {
        '@type': 'Organization',
        name: 'Fireatacck',
      },
    },
  }
}

/**
 * 生成游戏 Wiki 页面的 JSON-LD Schema
 */
export function generateVideoGameSchema(options: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: options.name,
    description: options.description,
    gamePlatform: 'Roblox',
    url: `${siteConfig.url}${options.url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Fireatacck',
    },
  }
}

/**
 * 生成 FAQ 页面的 JSON-LD Schema
 */
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

/**
 * 生成视频的 JSON-LD Schema (VideoObject)
 * 用于 YouTube 视频的富文本搜索结果
 */
export function generateVideoSchema(options: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl: string
  embedUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: options.name,
    description: options.description,
    thumbnailUrl: options.thumbnailUrl,
    uploadDate: options.uploadDate,
    duration: options.duration,
    contentUrl: options.contentUrl,
    embedUrl: options.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  }
}

