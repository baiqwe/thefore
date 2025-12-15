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
  const [showVideo, setShowVideo] = useState(false)

  // 从 YouTube URL 提取 video ID
  const extractVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : url
  }

  const finalVideoId = extractVideoId(videoId)
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`

  if (!showVideo) {
    return (
      <div
        className="relative w-full aspect-video bg-gray-900 rounded-lg cursor-pointer group overflow-hidden shadow-lg border border-gray-800"
        onClick={() => setShowVideo(true)}
      >
        {/* 显示封面图 - 极轻量 */}
        <Image
          src={thumbnailUrl}
          alt={`Play ${title}`}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        {/* 播放按钮图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

