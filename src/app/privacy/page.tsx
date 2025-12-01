import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy - The Forge Wiki',
  description: 'Privacy Policy for The Forge Wiki. Learn how we collect, use, and protect your personal information, including our use of cookies and Google AdSense.',
  keywords: ['Privacy Policy', 'The Forge Wiki', 'Cookie Policy', 'Data Protection'],
  canonicalUrl: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Welcome to <strong>{siteConfig.name}</strong> ({siteConfig.url}). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information. This Privacy Policy explains our practices regarding data collection and usage.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            This website is operated by experienced players and community members who are passionate about <strong>The Forge</strong> Roblox game. We provide comprehensive guides, codes, and resources to help players enhance their gaming experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">2.1 Automatically Collected Information</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When you visit our website, we automatically collect certain information through cookies and similar technologies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>IP Address:</strong> Used for security and analytics purposes</li>
            <li><strong>Browser Type and Version:</strong> To ensure compatibility and optimize user experience</li>
            <li><strong>Device Information:</strong> Device type, operating system, and screen resolution</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths</li>
            <li><strong>Referral Sources:</strong> How you arrived at our website (search engines, direct links, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">2.2 Information You Provide</h3>
          <p className="text-gray-700 dark:text-gray-300">
            If you contact us via email or submit feedback, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Your email address</li>
            <li>Your name (if provided)</li>
            <li>Message content and any attachments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and deliver personalized content and advertisements.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">3.1 Types of Cookies We Use</h3>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Essential Cookies</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              These cookies are necessary for the website to function properly. They enable core functionality such as page navigation and access to secure areas.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Analytics Cookies</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              We use Google Analytics to understand how visitors interact with our website. This helps us improve content and user experience.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Advertising Cookies (Google AdSense)</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              <strong>Important:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies, including the DoubleClick cookie, to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Serve ads based on your previous visits to our website and other websites</li>
              <li>Measure the effectiveness of advertisements</li>
              <li>Provide personalized advertising content</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              These cookies are set by Google and are subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google&apos;s Privacy Policy</a>.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">4. How We Use Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Website Operation:</strong> To maintain and improve website functionality</li>
            <li><strong>Content Improvement:</strong> To analyze user behavior and enhance our guides and resources</li>
            <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
            <li><strong>Advertising:</strong> To display relevant advertisements through Google AdSense</li>
            <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">5. Third-Party Services</h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">5.1 Google Services</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our website uses several Google services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Google AdSense:</strong> For advertising services. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View Google&apos;s Privacy Policy</a></li>
            <li><strong>Google Analytics:</strong> For website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View Google Analytics Privacy Policy</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">6. Your Rights and Choices</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Cookie Preferences:</strong> You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</li>
            <li><strong>Opt-Out of Personalized Ads:</strong> Visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google&apos;s Ad Settings</a> to opt out of personalized advertising.</li>
            <li><strong>Data Access:</strong> Request access to your personal data by contacting us at <a href="mailto:developwebtheforge@2925.com" className="text-blue-600 dark:text-blue-400 hover:underline">developwebtheforge@2925.com</a></li>
            <li><strong>Data Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">7. Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">8. Children&apos;s Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">9. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">10. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
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

