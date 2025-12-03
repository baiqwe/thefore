/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 开启静态导出：生成纯 HTML/CSS/JS 文件，适合 Cloudflare Pages
  output: 'export',
  
  // 图片优化设置
  images: {
    // ⚠️ 重要：Cloudflare Pages 免费版不支持 Next.js 的默认图片优化服务器
    // 设置为 unoptimized 直接使用原图，不进行压缩转换
    // 这能解决部署报错，但会导致图片体积大，影响 LCP 性能
    //
    // 📌 优化建议：
    // 1. 手动压缩所有图片到 100KB 以下（使用 TinyPNG 或 Squoosh）
    // 2. 优先使用 WebP 格式（比 JPG 小 25-35%）
    // 3. 考虑使用 Cloudflare Image Resizing（需要付费版）或第三方 CDN（如 Cloudinary）
    // 4. 详细说明请查看 CLOUDFLARE_OPTIMIZATION.md
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

