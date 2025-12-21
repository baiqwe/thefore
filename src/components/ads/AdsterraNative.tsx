'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdsterraNative() {
    return (
        <div className="adsterra-native-container min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <Script
                async
                data-cfasync="false"
                src="https://pl28305233.effectivegatecpm.com/6f2a8a233ead954c49e7358a3ad22fd5/invoke.js"
                strategy="lazyOnload"
            />
            <div id="container-6f2a8a233ead954c49e7358a3ad22fd5"></div>
        </div>
    )
}
