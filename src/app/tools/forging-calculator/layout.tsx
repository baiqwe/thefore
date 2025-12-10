import { Metadata } from 'next'

export const metadata: Metadata = {
    // 强调 "Best" 和 "Updated"
    title: 'The Forge Calculator (Best Weapon Builder) - Winter 2025 Updated',
    description: 'The most accurate crafting calculator for The Forge Roblox. Updated for the Winter 2025 Weight System. Calculate stats, multipliers, and traits accurately.',
    keywords: ['The Forge Calculator', 'Best Forge Calculator', 'The Forge Weapon Builder', 'Weight System Calculator'],
}

export default function ForgingCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
