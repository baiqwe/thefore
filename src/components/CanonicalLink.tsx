'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { useEffect } from 'react'

export default function CanonicalLink() {
  const pathname = usePathname()
  const canonicalUrl = `${siteConfig.url}${pathname === '/' ? '' : pathname}`

  useEffect(() => {
    // 确保在浏览器环境中运行
    if (typeof window === 'undefined' || !document.head) {
      return
    }

    // 移除旧的 canonical 标签（如果有）
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical && existingCanonical.parentNode) {
      try {
        existingCanonical.parentNode.removeChild(existingCanonical)
      } catch (error) {
        // 如果移除失败，尝试使用 remove() 方法
        try {
          existingCanonical.remove()
        } catch (e) {
          // 忽略错误，继续执行
        }
      }
    }

    // 创建新的 canonical 标签
    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = canonicalUrl
    
    // 安全地添加到 head
    if (document.head) {
      document.head.appendChild(link)
    }

    return () => {
      // 清理函数 - 添加安全检查
      try {
        const canonical = document.querySelector('link[rel="canonical"]')
        if (canonical && canonical.parentNode) {
          canonical.parentNode.removeChild(canonical)
        } else if (canonical) {
          // 如果 parentNode 不存在，尝试使用 remove() 方法
          try {
            canonical.remove()
          } catch (e) {
            // 忽略错误
          }
        }
      } catch (error) {
        // 忽略清理错误，避免影响页面导航
      }
    }
  }, [canonicalUrl])

  return null
}


