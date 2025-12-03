# Cloudflare Pages 部署配置说明

## 构建配置

在 Cloudflare Pages 控制台中，使用以下配置：

- **Framework Preset**: Next.js (Static HTML Export) 或 None
- **Build command**: `npm run build`
- **Output directory**: `out`
- **Root directory**: `/` (默认)

## 环境变量

通常不需要额外的环境变量（因为是完全静态的）。

## 部署步骤

1. 将代码推送到 GitHub
2. 在 Cloudflare Dashboard -> Workers & Pages -> Create Application -> Pages -> Connect to Git
3. 选择你的仓库
4. 使用上面的构建配置
5. 点击 Save and Deploy

## 注意事项

- 构建完成后，所有静态文件会在 `out` 目录中
- Cloudflare Pages 会自动提供 HTTPS 和全球 CDN
- 静态资源请求是无限免费的



