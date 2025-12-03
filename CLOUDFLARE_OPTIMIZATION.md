# Cloudflare Pages 优化配置指南

本文档说明如何优化 Cloudflare Pages 部署，避免从 Vercel 迁移后导致的 SEO 排名下降。

## 1. 关闭 Rocket Loader（重要！）

**问题：** Rocket Loader 会破坏 Next.js 的 Hydration（水合）过程，导致页面闪烁、布局抖动和交互失效。

**解决方法：**
1. 登录 Cloudflare Dashboard
2. 进入你的域名设置
3. 导航到 **Speed** → **Optimization**
4. 找到 **Rocket Loader** 选项
5. **关闭 Rocket Loader**（设置为 Off）

**为什么：** Next.js 已经内置了代码分割和优化，Rocket Loader 会干扰这些机制，导致性能下降。

---

## 2. 图片优化建议

**问题：** Cloudflare Pages 免费版不支持 Next.js 的图片优化服务器，导致图片体积大，影响 LCP（最大内容绘制时间）。

**当前配置：** `next.config.js` 中设置了 `images: { unoptimized: true }`

**优化方案（按优先级）：**

### 方案 A：手动压缩图片（推荐，免费）
- 使用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 压缩所有图片
- 目标：将图片压缩到 100KB 以下
- 格式：优先使用 WebP 格式（比 JPG 小 25-35%）

### 方案 B：使用 Cloudflare Image Resizing（付费）
- 需要 Cloudflare Pro 或更高版本
- 在 `next.config.js` 中配置 Cloudflare Image Resizing
- 自动优化图片尺寸和格式

### 方案 C：使用第三方图片 CDN（如 Cloudinary）
- 将图片上传到 Cloudinary
- 使用 Cloudinary 的自动优化功能
- 修改代码使用 Cloudinary URL

**检查方法：**
```bash
# 检查图片大小
find public -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -exec ls -lh {} \;
```

---

## 3. URL 结尾斜杠配置

**当前配置：** `trailingSlash: false`（URL 不带斜杠）

**验证方法：**
1. 访问 `https://www.theforgewiki.com/codes`（应该正常）
2. 访问 `https://www.theforgewiki.com/codes/`（应该 301 重定向到不带斜杠的版本）

**如果发现问题：**
- 检查 Google Search Console 的"页面索引"报告
- 查看是否有大量 404 或重定向错误
- 确保 Cloudflare 的重定向规则正确配置

---

## 4. Sitemap 时间戳优化

**已修复：** `src/app/sitemap.ts` 已优化，避免虚假的 `lastModified` 更新。

**优化策略：**
- 静态页面：不设置 `lastModified`，让 Google 自己判断
- 动态页面：只使用数据源中的真实 `lastUpdated` 时间
- 避免每次部署都更新所有页面的时间戳

**如何更新内容：**
- 修改 `src/data/items.json` 或 `src/data/guides.json` 时，更新对应项的 `lastUpdated` 字段
- 只有真正更新内容时才更新 `lastModified`

---

## 5. 自动化部署流程

**问题：** 失去 ISR（增量静态再生）后，需要手动触发部署才能更新内容。

**解决方案：** 确保 GitHub Push 自动触发 Cloudflare Build

**检查方法：**
1. 登录 Cloudflare Dashboard
2. 进入 **Pages** → 你的项目
3. 检查 **Settings** → **Builds & deployments**
4. 确认 **Production branch** 设置为 `main`
5. 确认 **Build command** 为 `npm run build`
6. 确认 **Build output directory** 为 `out`

**测试：**
```bash
# 修改任意文件并推送
git commit --allow-empty -m "test: trigger deployment"
git push
```

---

## 6. 性能监控

**关键指标：**
- **LCP (Largest Contentful Paint)**: 应该 < 2.5 秒
- **FID (First Input Delay)**: 应该 < 100 毫秒
- **CLS (Cumulative Layout Shift)**: 应该 < 0.1

**检查工具：**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Cloudflare Analytics（如果启用）

**优化目标：**
- 移动端 PageSpeed 分数 > 90
- 桌面端 PageSpeed 分数 > 95

---

## 7. 其他优化建议

### 启用 Cloudflare 缓存
- 在 Cloudflare Dashboard 中启用 **Caching** → **Configuration**
- 设置缓存级别为 **Standard**
- 静态资源（CSS/JS）缓存时间设置为 1 年

### 启用 Brotli 压缩
- Cloudflare 默认启用 Brotli 压缩
- 确保 `next.config.js` 中没有禁用压缩

### 使用 Cloudflare CDN
- Cloudflare Pages 自动使用全球 CDN
- 确保 **Network** → **HTTP/2** 和 **HTTP/3** 已启用

---

## 总结检查清单

- [ ] 关闭 Rocket Loader
- [ ] 压缩所有图片到 100KB 以下
- [ ] 验证 URL 重定向正常工作
- [ ] 检查 Sitemap 时间戳是否正确
- [ ] 确认自动部署流程正常
- [ ] 运行 PageSpeed Insights 检查性能
- [ ] 监控 Google Search Console 的索引状态

---

## 相关文档

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Core Web Vitals](https://web.dev/vitals/)

