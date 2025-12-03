'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { useEffect } from 'react'

export default function CanonicalLink() {
  const pathname = usePathname()
  const canonicalUrl = `${siteConfig.url}${pathname === '/' ? '' : pathname}`

  useEffect(() => {
    // 移除旧的 canonical 标签（如果有）
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // 创建新的 canonical 标签
    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = canonicalUrl
    document.head.appendChild(link)

    return () => {
      // 清理函数
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.remove()
      }
    }
  }, [canonicalUrl])

  return null
}

