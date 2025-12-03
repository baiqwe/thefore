# 🔧 图片管理系统 - 技术实现文档

## 1. 系统架构

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                   图片管理系统架构                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│  │  YouTube     │───▶│  视频下载    │───▶│ 帧提取   │ │
│  │  搜索模块    │    │  模块        │    │ 模块     │ │
│  └──────────────┘    └──────────────┘    └──────────┘ │
│         │                    │                  │        │
│         │                    │                  ▼        │
│         │                    │          ┌──────────────┐ │
│         │                    │          │  图片处理    │ │
│         │                    │          │  模块        │ │
│         │                    │          └──────────────┘ │
│         │                    │                  │        │
│         └────────────────────┴──────────────────┘        │
│                            │                             │
│                            ▼                             │
│                   ┌──────────────┐                      │
│                   │  数据更新    │                      │
│                   │  模块        │                      │
│                   └──────────────┘                      │
│                            │                             │
│                            ▼                             │
│              ┌─────────────────────────┐                │
│              │  前端展示组件           │                │
│              │  - GuideImage          │                │
│              │  - SectionImage        │                │
│              └─────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

### 1.2 模块划分

1. **图片管理工具层** (`src/lib/image-utils.ts`)
2. **UI 组件层** (`src/components/GuideImage.tsx`, `SectionImage.tsx`)
3. **自动化脚本层** (`scripts/auto-extract-guide-images.js`)
4. **数据更新层** (`scripts/update-guide-images.js`)
5. **存储层** (`public/images/`)

## 2. 核心模块实现

### 2.1 图片管理工具模块

#### 2.1.1 接口定义
```typescript
interface ImageConfig {
  src: string
  alt: string
  width?: number
  height?: number
}
```

#### 2.1.2 核心函数

**getGuideCoverImage(slug: string, fallbackUrl?: string): ImageConfig**
- **功能**: 获取指南封面图配置
- **优先级**: 本地图片 > 外部URL > 占位符
- **返回**: 图片配置对象（src, alt, width, height）

**getItemImage(slug: string, fallbackUrl?: string): ImageConfig**
- **功能**: 获取物品图片配置
- **逻辑**: 同封面图，路径为 `/images/items/{slug}.jpg`

**getPlaceholderImage(width: number, height: number, text?: string): string**
- **功能**: 生成占位符URL
- **服务**: via.placeholder.com
- **用途**: 开发阶段快速预览布局

### 2.2 UI 组件实现

#### 2.2.1 GuideImage 组件

**技术栈**: React + Next.js Image

**核心逻辑**:
```typescript
1. 使用 useState 管理图片加载状态
2. 使用 useEffect 在客户端检查图片存在性
3. 图片加载失败时显示占位符
4. 使用 Next.js Image 组件优化加载
```

**关键特性**:
- 客户端错误处理
- 自动降级到占位符
- 响应式设计（aspect ratio）
- 懒加载支持

#### 2.2.2 SectionImage 组件

**核心逻辑**:
```typescript
1. 简单包装 Next.js Image 组件
2. 加载失败时自动隐藏（不显示）
3. 固定 4:3 比例
4. 懒加载优化
```

### 2.3 自动化提取脚本

#### 2.3.1 脚本结构

```javascript
scripts/auto-extract-guide-images.js
├── 配置常量 (CONFIG)
├── checkDependencies() - 检查工具安装
├── searchYouTubeVideo() - 搜索视频
├── downloadVideo() - 下载视频
├── extractFrames() - 提取帧
├── processImages() - 处理图片
├── generateImageMapping() - 生成映射
└── cleanup() - 清理临时文件
```

#### 2.3.2 关键实现细节

**YouTube 搜索**:
```javascript
// 使用 yt-dlp 搜索（无需 API）
const command = `yt-dlp --flat-playlist --print "%(id)s|%(title)s|%(url)s" "ytsearch5:${query}"`

// 解析结果
const results = output.split('\n')
  .map(line => parseVideoInfo(line))
  .filter(video => video.id)
```

**视频下载**:
```javascript
// 限制质量以节省时间
const command = `yt-dlp -f "best[height<=1080]" -o "${outputPath}" "${videoUrl}"`

// 执行下载
execSync(command, { stdio: 'inherit' })
```

**帧提取**:
```javascript
// 每10秒提取一帧
const fps = 0.1 // frames per second
const command = `ffmpeg -i "${videoPath}" -vf "fps=${fps}" "${outputDir}/frame_%04d.jpg"`

// 执行提取
execSync(command)
```

**图片处理**:
```javascript
// 裁剪为封面尺寸
const command = `ffmpeg -i "${inputPath}" -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" "${outputPath}"`

// 执行裁剪
execSync(command)
```

#### 2.3.3 章节分配算法

```javascript
// 平均分配帧到章节
const framesPerSection = Math.ceil(totalFrames / sections.length)

sections.forEach((section, index) => {
  const frameIndex = Math.min(
    index * framesPerSection, 
    frames.length - 1
  )
  const frame = frames[frameIndex]
  // 分配给章节
})
```

### 2.4 数据更新脚本

#### 2.4.1 更新流程

```javascript
1. 读取图片映射文件 ({slug}-images.json)
2. 读取原始 JSON 数据 (guides.json)
3. 查找对应指南
4. 更新 coverImage 字段
5. 遍历章节，更新每个章节的 image 字段
6. 保存更新后的 JSON 文件
```

#### 2.4.2 JSON 结构扩展

**原始结构**:
```json
{
  "slug": "race-tier-list",
  "title": "...",
  "content": [
    { "section": "...", "text": "..." }
  ]
}
```

**扩展后结构**:
```json
{
  "slug": "race-tier-list",
  "title": "...",
  "coverImage": "/images/guides/race-tier-list.jpg",
  "content": [
    { 
      "section": "...", 
      "text": "...",
      "image": "/images/guides/race-tier-list-section.jpg"
    }
  ]
}
```

### 2.5 图片映射文件格式

```json
{
  "guideSlug": "race-tier-list",
  "coverImage": "race-tier-list.jpg",
  "sectionImages": {
    "Getting Started": "race-tier-list-getting-started.jpg",
    "Essential Items": "race-tier-list-essential-items.jpg"
  }
}
```

## 3. 文件结构

### 3.1 目录结构

```
项目根目录/
├── public/
│   └── images/
│       ├── guides/          # 指南图片
│       ├── items/           # 物品图片
│       └── quests/          # 任务图片
├── src/
│   ├── lib/
│   │   └── image-utils.ts   # 图片工具函数
│   └── components/
│       ├── GuideImage.tsx   # 封面图组件
│       └── SectionImage.tsx # 章节图片组件
├── scripts/
│   ├── auto-extract-guide-images.js  # 自动提取脚本
│   ├── update-guide-images.js        # 数据更新脚本
│   ├── test-image-extraction.js      # 测试脚本
│   └── generate-placeholder-images.js # 占位符生成
└── temp/
    └── videos/              # 临时视频文件
```

### 3.2 文件命名规范

- **指南封面**: `{guide-slug}.jpg`
- **章节图片**: `{guide-slug}-{section-slug}.jpg`
- **物品图片**: `{item-slug}.jpg`
- **映射文件**: `{guide-slug}-images.json`

**slug 转换规则**:
```javascript
sectionSlug = sectionName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
```

## 4. 技术栈

### 4.1 前端技术
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **UI**: React + Tailwind CSS
- **图片优化**: Next.js Image 组件

### 4.2 后端/脚本技术
- **运行时**: Node.js 18+
- **脚本语言**: JavaScript (Node.js)
- **视频工具**: yt-dlp, ffmpeg
- **文件操作**: Node.js fs 模块

### 4.3 外部依赖
- **yt-dlp**: YouTube 视频下载（Python）
- **ffmpeg**: 视频处理（系统工具）

## 5. API 设计

### 5.1 图片工具函数 API

```typescript
// 获取指南封面图
function getGuideCoverImage(
  slug: string, 
  fallbackUrl?: string
): ImageConfig

// 获取物品图片
function getItemImage(
  slug: string, 
  fallbackUrl?: string
): ImageConfig

// 生成占位符
function getPlaceholderImage(
  width: number, 
  height: number, 
  text?: string
): string

// 检查图片存在性（客户端）
function imageExists(src: string): Promise<boolean>
```

### 5.2 组件 Props API

```typescript
// GuideImage 组件
interface GuideImageProps {
  slug: string
  title: string
  fallbackUrl?: string
  className?: string
}

// SectionImage 组件
interface SectionImageProps {
  src: string
  alt: string
  className?: string
}
```

## 6. 数据流

### 6.1 图片提取流程

```
1. 用户输入: guide-slug
           ↓
2. 读取指南数据 (guides.json)
           ↓
3. 构建搜索查询 (title + description)
           ↓
4. 搜索 YouTube 视频 (yt-dlp)
           ↓
5. 选择最佳视频
           ↓
6. 下载视频 (临时目录)
           ↓
7. 提取关键帧 (ffmpeg)
           ↓
8. 分配帧到章节
           ↓
9. 裁剪和优化图片
           ↓
10. 保存到 public/images/guides/
           ↓
11. 生成映射文件 ({slug}-images.json)
```

### 6.2 数据更新流程

```
1. 读取映射文件 ({slug}-images.json)
           ↓
2. 读取原始数据 (guides.json)
           ↓
3. 查找对应指南
           ↓
4. 更新 coverImage 字段
           ↓
5. 更新章节 image 字段
           ↓
6. 保存更新后的 guides.json
```

### 6.3 图片显示流程

```
1. 页面加载
           ↓
2. 调用 getGuideCoverImage()
           ↓
3. 返回图片配置 (src, alt, width, height)
           ↓
4. GuideImage 组件渲染
           ↓
5. Next.js Image 组件加载图片
           ↓
6. 成功 → 显示图片
   失败 → 显示占位符
```

## 7. 错误处理

### 7.1 图片加载失败
- **策略**: 自动降级到占位符
- **实现**: 使用 `onError` 回调
- **用户体验**: 显示友好的占位符界面

### 7.2 视频下载失败
- **策略**: 显示错误信息，提供手动URL输入
- **实现**: try-catch 包裹，提供 fallback

### 7.3 工具缺失
- **策略**: 检查并提示安装
- **实现**: `checkDependencies()` 函数

### 7.4 图片不存在
- **策略**: 显示占位符
- **实现**: 客户端检查 + 服务端404处理

## 8. 性能优化

### 8.1 图片优化
- 使用 Next.js Image 组件自动优化
- 支持 WebP 格式（浏览器支持时）
- 懒加载（loading="lazy"）
- 响应式尺寸（sizes 属性）

### 8.2 视频处理优化
- 限制下载质量（最高1080p）
- 批量处理时添加延迟
- 清理临时文件
- 支持断点续传

### 8.3 脚本优化
- 异步处理大文件
- 流式处理（避免内存溢出）
- 进度显示

## 9. 扩展点

### 9.1 可扩展的图片源
- 本地文件系统
- 外部URL（CDN）
- 占位符服务
- AI生成服务（未来）

### 9.2 可扩展的处理流程
- 自定义提取频率
- 自定义图片尺寸
- 自定义分配算法
- 自定义优化策略

### 9.3 可扩展的数据格式
- 支持多语言图片
- 支持图片版本管理
- 支持图片元数据

## 10. 部署考虑

### 10.1 静态文件部署
- 图片文件包含在构建产物中
- 支持 CDN 部署
- 支持 Git LFS（大文件）

### 10.2 CI/CD 集成
- 构建时验证图片存在性
- 自动优化图片
- 生成图片映射

### 10.3 运行时要求
- 提取脚本需要 Node.js 环境
- 需要 yt-dlp 和 ffmpeg（开发环境）
- 生产环境不需要这些工具

## 11. 测试策略

### 11.1 单元测试
- 图片工具函数测试
- 组件渲染测试
- 错误处理测试

### 11.2 集成测试
- 完整提取流程测试
- 数据更新流程测试
- 端到端测试

### 11.3 模拟测试
- 模拟视频下载
- 模拟帧提取
- 测试脚本验证

## 12. 安全考虑

### 12.1 输入验证
- 验证 slug 格式
- 验证 URL 格式
- 防止路径遍历

### 12.2 文件操作
- 限制文件大小
- 验证文件类型
- 清理临时文件

### 12.3 外部资源
- 验证外部URL
- 处理 CORS 问题
- 防止 XSS 攻击

---

## 附录：关键代码示例

### A. 图片工具函数示例

```typescript
export function getGuideCoverImage(slug: string, fallbackUrl?: string): ImageConfig {
  const localPath = `/images/guides/${slug}.jpg`
  
  if (fallbackUrl) {
    return {
      src: fallbackUrl,
      alt: `Cover image for ${slug}`,
      width: 1200,
      height: 630,
    }
  }
  
  return {
    src: localPath,
    alt: `Cover image for ${slug}`,
    width: 1200,
    height: 630,
  }
}
```

### B. 组件使用示例

```tsx
// 封面图
<GuideImage 
  slug={guide.slug} 
  title={guide.title}
  fallbackUrl={guide.coverImage}
/>

// 章节图片
{section.image && (
  <SectionImage
    src={section.image}
    alt={`${section.section} illustration`}
  />
)}
```

### C. 脚本调用示例

```bash
# 自动提取
node scripts/auto-extract-guide-images.js race-tier-list

# 更新数据
node scripts/update-guide-images.js race-tier-list
```



