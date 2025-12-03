import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdsterraSidebar from '@/components/AdsterraSidebar'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'The Forge Roblox',
    'The Forge Codes',
    'The Forge Wiki',
    'Roblox RPG',
    'Race Tier List',
  ],
  authors: [
    {
      name: 'The Forge Wiki',
    },
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#F59E0B',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F59E0B' },
    { media: '(prefers-color-scheme: dark)', color: '#EA580C' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Adsterra 广告配置 - 左右两侧使用同一个 key
  const ADSTERRA_KEY = 'd9a4cde3510b2e6ec5918ca7b71788c3'

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2499950673294937"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TDKJYTNZYH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TDKJYTNZYH');
          `}
        </Script>
        <div className="flex flex-col min-h-screen relative">
          {/* 侧边栏广告 - 只在宽屏（2xl, 1536px+）显示 */}
          <AdsterraSidebar conf={ADSTERRA_KEY} side="left" />
          <AdsterraSidebar conf={ADSTERRA_KEY} side="right" />
          
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

