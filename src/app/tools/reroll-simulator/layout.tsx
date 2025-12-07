import { Metadata } from "next"

const date = new Date()
const currentMonth = date.toLocaleString('default', { month: 'long' })
const currentYear = date.getFullYear()

export const metadata: Metadata = {
  title: `The Forge Race Reroll Simulator (${currentMonth} ${currentYear}) - Test Your Luck`,
  description: `Simulate rolling for races in The Forge Roblox. Test your chances of getting Legendary races like Angel or Demon before spending reroll tokens. Updated ${currentMonth} ${currentYear}.`,
  keywords: [
    'The Forge Reroll Simulator',
    'The Forge Race Reroll',
    'Roblox The Forge Reroll',
    'The Forge Race Simulator',
    'The Forge Legendary Race',
    'The Forge Reroll Calculator',
  ],
}

export default function RerollSimulatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}





