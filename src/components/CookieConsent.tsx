'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        } else if (consent === 'accepted') {
            // Check if user previously consented, and re-apply consent on load
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted'
                });
            }
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)

        // Active notification to Google Analytics that user has consented
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
            console.log('GA Consent Granted');
        }
    }

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50 p-4 md:p-6 transform transition-transform duration-300 ease-in-out">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 pr-8">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        We value your privacy
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={declineCookies}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Decline
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                    >
                        Accept All
                    </button>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}
