'use client'

import { useEffect, useRef } from 'react'

interface AdsterraSidebarProps {
  conf: string // Adsterra 提供的 key
  side: 'left' | 'right' // 指定是左边还是右边
}

export default function AdsterraSidebar({ conf, side }: AdsterraSidebarProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 避免重复加载
    if (adRef.current && !adRef.current.querySelector('script')) {
      // 创建配置脚本
      const confScript = document.createElement('script')
      confScript.type = 'text/javascript'
      confScript.innerHTML = `
        atOptions = {
          'key' : '${conf}',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `
      
      // 创建 Adsterra 调用脚本
      const invokeScript = document.createElement('script')
      invokeScript.type = 'text/javascript'
      invokeScript.src = `//www.highperformanceformat.com/${conf}/invoke.js`
      invokeScript.setAttribute('data-adsterra-sidebar', side)
      
      // 静默错误处理 - 完全静默，不输出任何警告或错误到控制台
      invokeScript.onerror = () => {
        // 静默处理广告加载失败，自动隐藏广告容器
        if (adRef.current) {
          adRef.current.style.display = 'none'
        }
      }
      
      // 添加到容器
      adRef.current.appendChild(confScript)
      adRef.current.appendChild(invokeScript)
    }
  }, [conf, side])

  // 样式说明：
  // fixed: 固定定位，随页面滚动
  // top-1/2 -translate-y-1/2: 垂直居中
  // hidden 2xl:block: 默认隐藏，只有在超大屏幕(2xl, 1536px+)下显示
  // z-10: 确保在底层，不遮挡弹窗
  
  const sideClass = side === 'left' ? 'left-4' : 'right-4'

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 ${sideClass} z-10 hidden 2xl:block`}
      style={{ 
        // 只在屏幕宽度足够时显示，确保不遮挡内容
        // 2xl 断点是 1536px，加上左右各 160px 广告 + 间距，足够内容区域使用
      }}
    >
      <div 
        ref={adRef} 
        style={{ 
          width: '160px', 
          height: '600px',
          minWidth: '160px',
          minHeight: '600px'
        }} 
        className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
        id={`adsterra-sidebar-${side}`}
        aria-label={`Advertisement ${side}`}
      />
    </div>
  )
}

