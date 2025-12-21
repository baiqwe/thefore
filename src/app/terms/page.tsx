import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service - The Forge Wiki',
  description: 'Terms of Service for The Forge Wiki. Read our terms and conditions for using our website, guides, and resources.',
  keywords: ['Terms of Service', 'Terms and Conditions', 'The Forge Wiki', 'User Agreement'],
  canonicalUrl: '/terms',
})

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ]}
      />

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
          Terms of Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">1. Acceptance of Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing and using <strong>{siteConfig.name}</strong> ({siteConfig.url}), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            These terms apply to all visitors, users, and others who access or use our website. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">2. Description of Service</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>{siteConfig.name}</strong> is a community-driven wiki and resource website dedicated to <strong>The Forge</strong>, a Roblox game developed by Fireatacck. Our service provides:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Comprehensive game guides and walkthroughs</li>
            <li>Active and expired game codes</li>
            <li>Race tier lists and statistics</li>
            <li>Item locations and descriptions</li>
            <li>Quest walkthroughs and strategies</li>
            <li>Interactive tools (e.g., Reroll Simulator)</li>
            <li>Community resources and tips</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">3. User Conduct</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Transmit any viruses, malware, or harmful code</li>
            <li>Scrape, copy, or reproduce content without permission</li>
            <li>Use automated systems to access the website in a way that could harm or overload our servers</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            <li>Interfere with or disrupt the website or servers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">4. Intellectual Property</h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">4.1 Our Content</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, guides, and software, is the property of <strong>{siteConfig.name}</strong> or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use our content without our prior written permission.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">4.2 Game Content</h3>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>The Forge</strong> is a game developed by Fireatacck and published on Roblox. All game-related content, including but not limited to game mechanics, items, races, and codes, are the intellectual property of Fireatacck and Roblox Corporation. Our website provides information and guides about the game but does not claim ownership of the game content itself.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">5. Accuracy of Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any content on our website. Game codes, item locations, and game mechanics may change without notice.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> Game codes may expire at any time. We update our code list regularly, but we cannot guarantee that all listed codes are currently active. Always verify codes in-game before reporting issues.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">6. Third-Party Links and Services</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our website may contain links to third-party websites, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Roblox official website and game pages</li>
            <li>Social media platforms (YouTube, X/Twitter, Discord)</li>
            <li>Official game community pages</li>
            <li>Google AdSense and other advertising networks</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            We are not responsible for the content, privacy policies, or practices of any third-party websites. Your interactions with third-party websites are solely between you and the third party.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">7. Disclaimer of Warranties</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            THE WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy, completeness, or reliability of content</li>
            <li>Uninterrupted or error-free operation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">9. Limitation of Liability</h2>
          <p className="text-gray-700 dark:text-gray-300">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE WEBSITE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">10. Indemnification</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You agree to indemnify and hold harmless <strong>{siteConfig.name}</strong>, its operators, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the website or violation of these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">11. Termination</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to terminate or suspend your access to the website at any time, without prior notice, for any reason, including but not limited to violation of these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">12. Changes to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by updating the &quot;Last Updated&quot; date. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">13. Governing Law</h2>
          <p className="text-gray-700 dark:text-gray-300">
            These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">14. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> <a href="mailto:developwebtheforge@2925.com" className="text-blue-600 dark:text-blue-400 hover:underline">developwebtheforge@2925.com</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <strong>Website:</strong> <a href={siteConfig.url} className="text-blue-600 dark:text-blue-400 hover:underline">{siteConfig.url}</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

