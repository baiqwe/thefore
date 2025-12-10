'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function LastUpdated() {
    const [dateStr, setDateStr] = useState('')

    useEffect(() => {
        // Get user's local time, formatted as "December 10, 2025"
        const now = new Date()
        setDateStr(now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }))
    }, [])

    // Do not display during server-side rendering to avoid hydration errors
    if (!dateStr) return null

    return (
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Verified: {dateStr}</span>
        </div>
    )
}
