import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { BlogPost } from '@/types/blog'
import itemsData from '@/data/items.json'
import guidesData from '@/data/guides.json'
import codesData from '@/data/codes.json'
import questsData from '@/data/quests.json'
import { getAllBlogPosts } from '@/lib/blog'

/**
 * 动态生成 Sitemap.xml
 * 根据 Moz SEO 最佳实践，包含所有页面和更新频率
 * 
 * 重要：避免虚假的 lastModified 更新
 * - 静态页面：不设置 lastModified，让 Google 自己判断
 * - 动态页面：使用数据源中的真实 lastUpdated 时间
 * - 只有真正更新内容时才更新 lastModified
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // 使用固定的基准时间，而不是每次构建都更新
  // 这样可以避免虚假更新，只有真正修改内容时才更新这个时间
  const baseBuildDate = new Date('2024-12-01').toISOString()

  // 静态页面 - 不设置 lastModified，让 Google 根据实际抓取判断
  // 这样可以避免每次部署都触发 Google 重新抓取
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      // 不设置 lastModified，让 Google 自己判断
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/codes`,
      // Codes 页面可能经常更新，但只在真正更新时才设置 lastModified
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wiki`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      // [High Priority] New Meta Page
      url: `${baseUrl}/wiki/best-builds`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wiki/races`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki/forging`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki/ores`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/quests`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/reroll-simulator`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/ore-depth-finder`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/forging-calculator`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/items`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      // 法律页面很少更新，使用固定时间
      lastModified: baseBuildDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: baseBuildDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // 动态页面：Items - 只使用数据源中的真实 lastUpdated
  const itemPages: MetadataRoute.Sitemap = itemsData.map((item) => {
    const lastUpdated = (item as any).lastUpdated
    return {
      url: `${baseUrl}/item/${item.slug}`,
      // 只有数据源中有 lastUpdated 时才设置，否则不设置让 Google 自己判断
      ...(lastUpdated ? { lastModified: new Date(lastUpdated).toISOString() } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  // 动态页面：Guides - 使用数据源中的真实 lastUpdated
  const guidePages: MetadataRoute.Sitemap = guidesData.map((guide) => {
    const lastUpdated = (guide as any).lastUpdated
    return {
      url: `${baseUrl}/wiki/${guide.slug}`,
      // 只有数据源中有 lastUpdated 时才设置
      ...(lastUpdated ? { lastModified: new Date(lastUpdated).toISOString() } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // 动态页面：Blog Posts - 使用真实 publishedAt
  const blogPosts = getAllBlogPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...itemPages, ...guidePages, ...blogPages]
}

