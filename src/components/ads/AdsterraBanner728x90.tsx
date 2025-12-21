'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdsterraBanner728x90() {
    return (
        <div className="adsterra-banner-728x90-container w-full max-w-[728px] h-[90px] bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto flex items-center justify-center overflow-hidden">
            <Script
                id="adsterra-banner-728x90-config"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
            var atOptions = {
              'key' : 'db161b8b539cf6a1a11fdfc992e514c9',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `,
                }}
            />
            <Script
                type="text/javascript"
                src="https://www.highperformanceformat.com/db161b8b539cf6a1a11fdfc992e514c9/invoke.js"
                strategy="lazyOnload"
            />
        </div>
    )
}
