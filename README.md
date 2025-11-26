# Survive Overnight Wiki

A Next.js-based static site generator for game wikis. This template is designed for "Survive Overnight in a Mega Store" game wiki.

## Features

- ✅ **Static Site Generation (SSG)** - All pages are pre-rendered at build time
- ✅ **SEO Optimized** - Dynamic metadata for each item page
- ✅ **Fast Performance** - Pure static HTML, no database needed
- ✅ **Easy to Customize** - Just update `src/config/site.ts` and `src/data/items.json`
- ✅ **Modern UI** - Built with Tailwind CSS
- ✅ **TypeScript** - Full type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This will generate static HTML files for all pages in the `.next` directory.

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── items/             # Items list page
│   ├── item/[slug]/       # Dynamic item detail pages (SSG)
│   └── locations/         # Locations page
├── components/            # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ItemTable.tsx
│   └── FeatureCard.tsx
├── config/               # Site configuration
│   └── site.ts
└── data/                # Data source
    └── items.json       # All game items
```

## Customization

### 1. Update Site Configuration

Edit `src/config/site.ts` to change:
- Site name and description
- Navigation menu
- Social links
- Theme colors

### 2. Update Data

Edit `src/data/items.json` to add/modify items. Each item should have:
- `slug`: URL-friendly identifier
- `name`: Display name
- `location`: Where to find it
- `type`: Item category
- `description`: Detailed description
- `stats`: Object with additional properties (rarity, etc.)

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and build your site
4. All pages will be statically generated at build time

## How SSG Works

The key is in `src/app/item/[slug]/page.tsx`:

1. `generateStaticParams()` tells Next.js which pages to generate at build time
2. It reads `items.json` and creates a page for each item
3. All pages are pre-rendered as static HTML
4. No server needed - just serve static files!

## License

MIT

