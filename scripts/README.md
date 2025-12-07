# 图片优化脚本使用说明

## 功能

批量转换 `public` 文件夹下的图片为 WebP 格式并压缩到 100KB 以下，提升 Core Web Vitals 的 LCP 分数。

## 安装依赖

```bash
npm install sharp --save-dev
```

## 使用方法

```bash
npm run optimize-images
```

或者直接运行：

```bash
node scripts/optimize-images.js
```

## 工作原理

1. **扫描图片**：递归扫描 `public` 文件夹下的所有图片文件（.jpg, .jpeg, .png, .gif, .bmp, .tiff）
2. **转换格式**：将图片转换为 WebP 格式
3. **智能压缩**：
   - 从质量 90 开始，逐步降低直到文件大小 ≤ 100KB
   - 如果仍然太大，自动调整图片尺寸
4. **保留原图**：原始图片不会被删除，WebP 文件会保存在同一目录

## 输出

脚本会在原图同目录下生成 `.webp` 文件，例如：
- `public/icon.png` → `public/icon.webp`
- `public/favicon.jpg` → `public/favicon.webp`

## 后续步骤

1. **检查质量**：查看生成的 WebP 文件，确保质量可接受
2. **更新代码**：将代码中的图片引用从 `.jpg/.png` 改为 `.webp`
3. **删除原图**（可选）：如果 WebP 质量满意，可以删除原始图片以节省空间

## 注意事项

- 脚本不会覆盖已存在的 WebP 文件（除非原图更大）
- SVG 文件不会被处理（已经是矢量格式，体积小）
- 如果图片已经是 WebP 格式，会被跳过


