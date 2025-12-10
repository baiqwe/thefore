import { Metadata } from 'next'

export const metadata: Metadata = {
    // 标题直接带上 "Squareweb Alternative" 吸引点击
    title: 'The Forge Crafting Calculator (Better than Squareweb) - Weapon Builder',
    description: 'The ultimate crafting calculator for The Forge Roblox. More accurate than Squareweb. Calculate ore weights, weapon stats, and discover secret recipes instantly.',
    keywords: [
        'The Forge Calculator',
        'Squareweb The Forge', // 直接埋入竞品词
        'The Forge Crafting Calculator',
        'The Forge Weapon Builder',
        'The Forge Ore Calculator',
        'The Forge Winter 2025'
    ],
}

export default function ForgingCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
