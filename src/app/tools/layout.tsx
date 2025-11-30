import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tools",
  description: "Interactive tools for The Forge Roblox - Race reroll simulator and more",
  keywords: [
    "The Forge Tools",
    "The Forge Reroll Simulator",
    "Roblox The Forge",
    "The Forge Wiki",
  ],
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

