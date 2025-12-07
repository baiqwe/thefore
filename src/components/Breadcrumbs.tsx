import { ChevronRight, Home } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/seo'
import { siteConfig } from '@/config/site'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * 面包屑导航组件
 * 根据 Moz SEO 最佳实践：
 * - 使用结构化数据 (BreadcrumbList Schema)
 * - 清晰的视觉导航
 * - 关键词丰富的结构
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // 生成结构化数据
  const breadcrumbSchema = generateBreadcrumbSchema(items)

  return (
    <>
      {/* 注入结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 视觉面包屑导航 */}
      <nav
        className={`flex items-center gap-2 text-sm text-gray-600 mb-6 ${className}`}
        aria-label="Breadcrumb"
      >
        <a
          href="/"
          className="hover:text-amber-600 transition-colors flex items-center gap-1"
          aria-label="Home"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </a>
        {items.slice(1).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {index === items.length - 2 ? (
              <span className="font-semibold text-gray-800">{item.name}</span>
            ) : (
              <a
                href={item.url}
                className="hover:text-amber-600 transition-colors"
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}





