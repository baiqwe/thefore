/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 开启静态导出：生成纯 HTML/CSS/JS 文件，适合 Cloudflare Pages
  output: 'export',
  
  // 图片优化设置
  images: {
    // Cloudflare Pages 免费版不支持 Next.js 的默认图片优化服务器
    // 设置为 unoptimized 直接使用原图，不进行压缩转换
    // 这能解决部署报错，且彻底停止消耗图片优化额度
    unoptimized: true,
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  
  // 静态导出时禁用 trailing slash（Cloudflare Pages 兼容性）
  trailingSlash: false,
}

module.exports = nextConfig

