import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * 生成 robots.txt
 * 根据 Moz SEO 最佳实践，允许所有爬虫抓取，但屏蔽管理路径
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/search'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}



