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
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm">
              {siteConfig.links.twitter && (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 block"
                >
                  Twitter
                </a>
              )}
              {siteConfig.links.github && (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 block"
                >
                  GitHub
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

