'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdsterraNative() {
    return (
        <div>
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</div>
            <div className="adsterra-native-container min-h-[250px] max-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                <Script
                    async
                    data-cfasync="false"
                    src="https://pl28305233.effectivegatecpm.com/6f2a8a233ead954c49e7358a3ad22fd5/invoke.js"
                    strategy="lazyOnload"
                />
                <div id="container-6f2a8a233ead954c49e7358a3ad22fd5"></div>
            </div>
        </div>
    )
}
