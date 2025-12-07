#!/usr/bin/env node

/**
 * 图片优化脚本
 * 批量转换 public 文件夹下的图片为 WebP 格式并压缩到 100KB 以下
 * 
 * 使用方法：
 * npm install sharp --save-dev
 * node scripts/optimize-images.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const MAX_SIZE_KB = 100
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']
const OUTPUT_FORMAT = 'webp'

// 统计信息
let stats = {
  processed: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
}

/**
 * 递归查找所有图片文件
 */
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 等目录
      if (!file.startsWith('.') && file !== 'node_modules') {
        findImageFiles(filePath, fileList)
      }
    } else {
      const ext = path.extname(file).toLowerCase()
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath)
      }
    }
  })
  
  return fileList
}

/**
 * 优化单张图片
 */
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase()
    const dir = path.dirname(filePath)
    const basename = path.basename(filePath, ext)
    const outputPath = path.join(dir, `${basename}.${OUTPUT_FORMAT}`)
    
    // 如果已经是 WebP 格式，跳过
    if (ext === `.${OUTPUT_FORMAT}`) {
      console.log(`⏭️  跳过（已是 WebP）: ${path.relative(PUBLIC_DIR, filePath)}`)
      stats.skipped++
      return
    }
    
    // 如果 WebP 版本已存在，检查是否需要重新生成
    if (fs.existsSync(outputPath)) {
      const originalSize = fs.statSync(filePath).size
      const webpSize = fs.statSync(outputPath).size
      
      // 如果原图更小或 WebP 已经很小，跳过
      if (originalSize < webpSize || webpSize < MAX_SIZE_BYTES) {
        console.log(`⏭️  跳过（已优化）: ${path.relative(PUBLIC_DIR, filePath)}`)
        stats.skipped++
        return
      }
    }
    
    // 读取原图大小
    const originalSize = fs.statSync(filePath).size
    stats.totalSizeBefore += originalSize
    
    // 获取图片信息
    const metadata = await sharp(filePath).metadata()
    
    // 计算目标质量（从 90 开始，逐步降低直到文件大小符合要求）
    let quality = 90
    let outputBuffer
    
    do {
      outputBuffer = await sharp(filePath)
        .webp({ 
          quality,
          effort: 6, // 压缩努力程度 (0-6, 6 最慢但压缩最好)
        })
        .toBuffer()
      
      // 如果文件大小符合要求或质量已经很低，退出循环
      if (outputBuffer.length <= MAX_SIZE_BYTES || quality <= 50) {
        break
      }
      
      quality -= 10
    } while (quality > 50)
    
    // 如果压缩后仍然太大，尝试调整尺寸
    if (outputBuffer.length > MAX_SIZE_BYTES && metadata.width && metadata.height) {
      const scale = Math.sqrt(MAX_SIZE_BYTES / outputBuffer.length) * 0.9 // 留 10% 余量
      const newWidth = Math.floor(metadata.width * scale)
      const newHeight = Math.floor(metadata.height * scale)
      
      outputBuffer = await sharp(filePath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ 
          quality: 85,
          effort: 6,
        })
        .toBuffer()
    }
    
    // 写入 WebP 文件
    fs.writeFileSync(outputPath, outputBuffer)
    
    const newSize = outputBuffer.length
    stats.totalSizeAfter += newSize
    stats.converted++
    
    const sizeReduction = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    console.log(`✅ 转换成功: ${path.relative(PUBLIC_DIR, filePath)}`)
    console.log(`   ${(originalSize / 1024).toFixed(2)} KB → ${(newSize / 1024).toFixed(2)} KB (减少 ${sizeReduction}%)`)
    
  } catch (error) {
    console.error(`❌ 转换失败: ${path.relative(PUBLIC_DIR, filePath)}`)
    console.error(`   错误: ${error.message}`)
    stats.errors++
  }
  
  stats.processed++
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始优化图片...\n')
  console.log(`📁 扫描目录: ${PUBLIC_DIR}`)
  console.log(`🎯 目标格式: ${OUTPUT_FORMAT.toUpperCase()}`)
  console.log(`📏 最大文件大小: ${MAX_SIZE_KB} KB\n`)
  
  // 检查 sharp 是否已安装
  try {
    require.resolve('sharp')
  } catch (error) {
    console.error('❌ 错误: sharp 库未安装')
    console.error('   请运行: npm install sharp --save-dev')
    process.exit(1)
  }
  
  // 查找所有图片文件
  const imageFiles = findImageFiles(PUBLIC_DIR)
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  未找到需要优化的图片文件')
    return
  }
  
  console.log(`📸 找到 ${imageFiles.length} 个图片文件\n`)
  
  // 处理每张图片
  for (const filePath of imageFiles) {
    await optimizeImage(filePath)
  }
  
  // 输出统计信息
  console.log('\n' + '='.repeat(50))
  console.log('📊 优化完成统计:')
  console.log(`   处理文件数: ${stats.processed}`)
  console.log(`   成功转换: ${stats.converted}`)
  console.log(`   跳过文件: ${stats.skipped}`)
  console.log(`   错误数量: ${stats.errors}`)
  console.log(`   总大小（优化前）: ${(stats.totalSizeBefore / 1024).toFixed(2)} KB`)
  console.log(`   总大小（优化后）: ${(stats.totalSizeAfter / 1024).toFixed(2)} KB`)
  if (stats.totalSizeBefore > 0) {
    const totalReduction = ((stats.totalSizeBefore - stats.totalSizeAfter) / stats.totalSizeBefore * 100).toFixed(1)
    console.log(`   总体减少: ${totalReduction}%`)
  }
  console.log('='.repeat(50))
  
  if (stats.converted > 0) {
    console.log('\n💡 提示:')
    console.log('   1. 检查生成的 WebP 文件质量')
    console.log('   2. 如果满意，可以删除原始图片文件以节省空间')
    console.log('   3. 更新代码中的图片引用路径（.jpg/.png → .webp）')
  }
}

// 运行脚本
main().catch(error => {
  console.error('❌ 脚本执行失败:', error)
  process.exit(1)
})


