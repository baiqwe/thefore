import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'The Forge Calculator: Custom Weapon Builder | Winter 2025',
    description: 'Design your custom weapon build in The Forge Roblox. Calculate stats, check active traits, and optimize ore combinations with our updated weight-based calculator.',
    keywords: ['The Forge Calculator', 'The Forge Weapon Builder', 'The Forge Ore Calculator', 'The Forge Winter 2025'],
}

export default function ForgingCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
