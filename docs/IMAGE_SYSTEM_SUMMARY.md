# 📊 图片管理系统 - 项目总结

## 项目概述

为 Next.js Wiki 网站构建的完整图片管理系统，支持从 YouTube 视频自动提取截图并智能关联到文章章节。

## 文档索引

1. **需求文档**: `IMAGE_SYSTEM_REQUIREMENTS.md`
   - 功能需求
   - 非功能需求
   - 工作流程
   - 技术约束

2. **技术实现文档**: `IMAGE_SYSTEM_TECHNICAL.md`
   - 系统架构
   - 模块实现
   - API 设计
   - 数据流
   - 扩展点

## 核心功能

### 1. 图片管理
- 统一图片路径管理
- 多优先级图片源（本地 > 外部URL > 占位符）
- 自动错误处理和降级

### 2. 自动提取
- YouTube 视频搜索
- 视频下载和处理
- 关键帧提取
- 图片裁剪和优化

### 3. 智能关联
- 自动分配图片到章节
- 生成图片映射文件
- 自动更新 JSON 数据

### 4. UI 组件
- 封面图组件（GuideImage）
- 章节图片组件（SectionImage）
- 自动占位符显示

## 技术要点

### 依赖工具
- **yt-dlp**: YouTube 视频搜索和下载
- **ffmpeg**: 视频处理和帧提取

### 技术栈
- Next.js 14 + TypeScript
- React + Tailwind CSS
- Node.js 脚本

### 图片规格
- 封面图: 1200x630px (16:9)
- 章节图: 800x600px (4:3)
- 格式: JPG
- 大小: < 500KB

## 使用流程

```bash
# 1. 安装依赖
pip install yt-dlp
brew install ffmpeg

# 2. 提取图片
node scripts/auto-extract-guide-images.js <guide-slug>

# 3. 更新数据
node scripts/update-guide-images.js <guide-slug>
```

## 文件结构

```
src/
├── lib/
│   └── image-utils.ts        # 图片工具函数
└── components/
    ├── GuideImage.tsx        # 封面图组件
    └── SectionImage.tsx      # 章节图片组件

scripts/
├── auto-extract-guide-images.js  # 自动提取脚本
├── update-guide-images.js        # 数据更新脚本
└── test-image-extraction.js      # 测试脚本

public/images/
├── guides/    # 指南图片
├── items/     # 物品图片
└── quests/    # 任务图片
```

## 关键特性

1. **无需 API Key** - 使用 yt-dlp 直接搜索，无需 YouTube API
2. **自动化** - 一键完成搜索、下载、提取、关联全流程
3. **灵活扩展** - 支持多种图片来源和处理方式
4. **错误处理** - 完善的错误处理和降级策略

## 扩展方向

- AI 图片生成集成
- 更智能的帧选择算法
- 批量处理支持
- CDN 集成
- 图片版本管理

---

**详细文档请参考**:
- `IMAGE_SYSTEM_REQUIREMENTS.md` - 完整需求文档
- `IMAGE_SYSTEM_TECHNICAL.md` - 详细技术文档





