'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YouTubeVideoProps {
  videoId: string
  title: string
  thumbnail?: string
}

/**
 * YouTube 视频嵌入组件
 * 使用懒加载优化性能
 */
export default function YouTubeVideo({ videoId, title, thumbnail }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // 从 YouTube URL 提取 video ID
  const extractVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : url
  }

  const finalVideoId = extractVideoId(videoId)
  const embedUrl = `https://www.youtube.com/embed/${finalVideoId}`
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <Image
            src={thumbnailUrl}
            alt={`${title} - Click to play video`}
            className="w-full h-full object-cover opacity-50"
            width={480}
            height={360}
            unoptimized
          />
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            aria-label={`Play ${title}`}
          >
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
      {isLoaded && (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      )}
    </div>
  )
}

