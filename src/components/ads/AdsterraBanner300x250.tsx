'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdsterraBanner300x250() {
    return (
        <div>
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</div>
            <div className="adsterra-banner-300x250-container w-[300px] h-[250px] bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto flex items-center justify-center overflow-hidden">
                <Script
                    id="adsterra-banner-300x250-config"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
            var atOptions = {
              'key' : 'bb4cb7415f19c686383d4cf6a460582f',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `,
                    }}
                />
                <Script
                    type="text/javascript"
                    src="https://www.highperformanceformat.com/bb4cb7415f19c686383d4cf6a460582f/invoke.js"
                    strategy="lazyOnload"
                />
            </div>
        </div>
    )
}
