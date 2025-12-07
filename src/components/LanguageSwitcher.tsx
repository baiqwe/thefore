'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { languages, type Locale } from '@/i18n/config'

interface LanguageSwitcherProps {
    currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Get path without locale prefix
    const getPathWithoutLocale = () => {
        const segments = pathname.split('/')
        segments.splice(1, 1) // Remove locale segment
        return segments.join('/') || '/'
    }

    // Set locale cookie and navigate
    const handleLocaleChange = (locale: Locale) => {
        document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000` // 1 year
        setIsOpen(false)
    }

    const currentLang = languages[currentLocale]
    const pathWithoutLocale = getPathWithoutLocale()

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Select language"
            >
                <Globe className="h-5 w-5" />
                <span className="hidden sm:inline">{currentLang.flag} {currentLang.nativeName}</span>
                <span className="sm:hidden">{currentLang.flag}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {Object.entries(languages).map(([code, lang]) => {
                        const locale = code as Locale
                        const isActive = locale === currentLocale

                        return (
                            <Link
                                key={code}
                                href={`/${locale}${pathWithoutLocale}`}
                                onClick={() => handleLocaleChange(locale)}
                                className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-amber-50 dark:bg-amber-900/20' : ''
                                    }`}
                            >
                                <span className="text-2xl">{lang.flag}</span>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                        {lang.nativeName}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {lang.name}
                                    </div>
                                </div>
                                {isActive && (
                                    <svg
                                        className="h-5 w-5 text-amber-600 dark:text-amber-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
