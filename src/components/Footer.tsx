import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-amber-500 mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-zinc-400">
              The ultimate resource for The Forge Roblox game. Find codes, guides, tier lists, and more!
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {siteConfig.mainNav.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/wiki"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  Wiki Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/codes"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  Codes
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/reroll-simulator"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  Reroll Simulator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.links.trello}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  Trello
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Roblox or The Forge developers.</p>
        </div>
      </div>
    </footer>
  )
}
