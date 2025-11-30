import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-gray-600">{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-gray-600 hover:text-blue-600">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Official Links</h4>
            <div className="space-y-2 text-sm">
              {siteConfig.links.game && (
                <a
                  href={siteConfig.links.game}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-600 block flex items-center gap-2"
                >
                  <span>🎮</span>
                  <span>Play The Forge</span>
                </a>
              )}
              {siteConfig.links.youtube && (
                <a
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 block flex items-center gap-2"
                >
                  <span>📺</span>
                  <span>YouTube</span>
                </a>
              )}
              {siteConfig.links.x && (
                <a
                  href={siteConfig.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 block flex items-center gap-2"
                >
                  <span>𝕏</span>
                  <span>X (Twitter)</span>
                </a>
              )}
              {siteConfig.links.robloxGroup && (
                <a
                  href={siteConfig.links.robloxGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 block flex items-center gap-2"
                >
                  <span>👥</span>
                  <span>Roblox Group</span>
                </a>
              )}
              {siteConfig.links.discord && (
                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 block flex items-center gap-2"
                >
                  <span>💬</span>
                  <span>Discord</span>
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Wiki Links</h4>
            <div className="space-y-2 text-sm">
              {siteConfig.links.officialWiki && (
                <a
                  href={siteConfig.links.officialWiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-600 block flex items-center gap-2"
                >
                  <span>📚</span>
                  <span>Official Wiki</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

