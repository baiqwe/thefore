# Icon Files Guide

This directory contains all the icon files needed for the website. Here's what each file is for:

## Required Files

### 1. `favicon.svg` ✅ (Created)
- Modern SVG favicon that works in all modern browsers
- Scalable and looks great at any size
- Primary favicon file

### 2. `favicon.ico` ⚠️ (Needs to be created)
- Traditional favicon for older browsers
- Should be 16x16, 32x32, or 48x48 pixels
- You can generate this from the SVG using an online converter

### 3. `icon.svg` ✅ (Created)
- Large SVG icon for PWA and app icons
- Used as base for generating PNG icons

### 4. `apple-touch-icon.png` ⚠️ (Needs to be created)
- 180x180 pixels PNG
- Used when users add the site to their iOS home screen
- Generate from `icon.svg` at 180x180 size

### 5. `icon-192.png` ⚠️ (Needs to be created)
- 192x192 pixels PNG
- Used for Android home screen and PWA
- Generate from `icon.svg` at 192x192 size

### 6. `icon-512.png` ⚠️ (Needs to be created)
- 512x512 pixels PNG
- Used for PWA splash screens and high-res displays
- Generate from `icon.svg` at 512x512 size

### 7. `safari-pinned-tab.svg` ✅ (Created)
- Monochrome SVG for Safari pinned tabs
- Should be a simplified version of the icon

### 8. `og.jpg` ⚠️ (Needs to be created)
- 1200x630 pixels JPG/PNG
- Used for social media sharing (Open Graph)
- Should include site name and branding

## How to Generate Missing Files

### Option 1: Online Tools
1. Use [RealFaviconGenerator](https://realfavicongenerator.net/) - Upload `icon.svg` and it will generate all formats
2. Use [Favicon.io](https://favicon.io/) - Upload an image and generate all sizes

### Option 2: Image Editing Software
1. Open `icon.svg` in your preferred image editor
2. Export at the required sizes:
   - 180x180 → `apple-touch-icon.png`
   - 192x192 → `icon-192.png`
   - 512x512 → `icon-512.png`
   - 16x16, 32x32 → `favicon.ico` (multi-size ICO file)

### Option 3: Command Line (ImageMagick)
```bash
# Generate PNG icons from SVG
convert -background none icon.svg -resize 180x180 apple-touch-icon.png
convert -background none icon.svg -resize 192x192 icon-192.png
convert -background none icon.svg -resize 512x512 icon-512.png

# Generate ICO file
convert favicon.svg -resize 32x32 favicon.ico
```

## Current Status

✅ SVG files created (favicon.svg, icon.svg, safari-pinned-tab.svg)
⚠️ PNG files need to be generated from the SVG files
⚠️ ICO file needs to be generated
⚠️ OG image needs to be created

All the configuration in `layout.tsx` is ready - just add the missing image files!

