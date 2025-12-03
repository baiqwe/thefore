# Cloudflare Pages 部署指南

本网站已配置为完全静态导出模式，可以无缝部署到 Cloudflare Pages。

## 配置说明

### next.config.js 配置
- ✅ `output: 'export'` - 开启静态导出，生成纯 HTML/CSS/JS 文件
- ✅ `images.unoptimized: true` - 禁用图片优化（Cloudflare Pages 免费版不支持 Next.js 图片优化服务器）
- ✅ `trailingSlash: false` - Cloudflare Pages 兼容性设置

### 构建输出
- 构建后所有静态文件输出到 `out/` 目录
- 所有页面在构建时预渲染为静态 HTML
- 无需 Node.js 服务器，纯静态文件即可运行

## Cloudflare Pages 部署步骤

### 1. 准备工作
确保代码已推送到 GitHub 仓库。

### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com
2. 左侧菜单选择 **"Workers & Pages"**
3. 点击 **"Create Application"** → **"Pages"** → **"Connect to Git"**
4. 授权 Cloudflare 访问你的 GitHub 账户
5. 选择仓库: `baiqwe/thefore` (或你的仓库名)

### 3. 配置构建设置

在构建配置页面，填写以下信息：

**Build Settings:**
- **Framework Preset**: `None` 或留空
- **Build command**: `npm run build`
- **Output directory**: `out`
- **Root directory**: `/` (默认，留空即可)

**Environment Variables:**
- 通常不需要设置（静态网站不需要环境变量）

### 4. 部署

1. 点击 **"Save and Deploy"**
2. Cloudflare 会自动开始构建和部署
3. 部署完成后，你会获得一个 `*.pages.dev` 的免费域名

### 5. 绑定自定义域名

1. 在 Cloudflare Pages 项目页面，进入 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名: `www.theforgewiki.com`
4. Cloudflare 会自动配置 DNS 和 SSL 证书

**重要提示：**
- 如果你已经在 Cloudflare 管理域名 DNS，绑定会非常快速
- SSL 证书会自动配置，无需额外操作
- 保持域名不变，SEO 不受影响

## 迁移优势

### Vercel vs Cloudflare Pages

**Vercel 的问题：**
- Edge Requests 有限额（免费版每月 100GB）
- 每次页面访问都消耗 Edge Requests
- 图片优化也消耗 Edge Requests
- 容易超过免费额度

**Cloudflare Pages 的优势：**
- ✅ 静态资源请求 **无限免费**
- ✅ 全球 CDN，速度更快
- ✅ 无请求数限制
- ✅ 自动 HTTPS 和 SSL
- ✅ 更好的全球访问速度

### 性能对比

**迁移前 (Vercel):**
- 每次访问页面 = 1 Edge Request
- 图片加载 = 1 Edge Request (优化)
- 容易超限额

**迁移后 (Cloudflare Pages):**
- 每次访问页面 = 纯静态文件 (免费)
- 图片加载 = 纯静态资源 (免费)
- 无限制

## 验证部署

部署完成后，检查以下内容：

1. **首页访问**: `https://你的域名/`
2. **Sitemap**: `https://你的域名/sitemap.xml`
3. **动态路由**: `https://你的域名/item/arcane-pickaxe`
4. **SEO 标签**: 查看页面源代码，确认 meta 标签正常

## 故障排除

### 问题：构建失败
- 检查构建日志中的错误信息
- 确保 `npm run build` 在本地能成功运行
- 检查 Node.js 版本兼容性（推荐 Node 18+）

### 问题：404 错误
- 确保 `output directory` 设置为 `out`
- 检查构建日志确认 `out` 目录已生成

### 问题：图片不显示
- 确认 `images.unoptimized: true` 已设置
- 检查外部图片 URL 是否可访问

## 注意事项

1. **图片优化**: 由于禁用了图片优化，确保图片文件大小合理（建议 < 500KB）
2. **构建时间**: 静态导出需要构建所有页面，可能比之前稍慢，但只发生在构建时
3. **动态功能**: 完全静态导出不支持服务器端功能，但你的网站已经是纯静态的，无需担心

## 后续维护

每次更新内容后：
1. 修改 `src/data/*.json` 文件
2. 推送到 GitHub
3. Cloudflare Pages 自动重新构建和部署
4. 几分钟后更新生效

## 成本对比

**Vercel (当前):**
- 可能超限额，需要付费

**Cloudflare Pages:**
- 完全免费（静态网站）
- 无限流量和请求
- 全球 CDN 加速

---

✅ 你的网站已完美配置为 Cloudflare Pages 静态导出模式！
部署后即可享受无限免费流量和更快的全球访问速度。

