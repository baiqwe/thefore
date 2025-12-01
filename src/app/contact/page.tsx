import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Mail, MessageSquare, Clock } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us - The Forge Wiki',
  description: 'Contact The Forge Wiki team. Get in touch for questions, feedback, code submissions, or partnership inquiries.',
  keywords: ['Contact', 'The Forge Wiki', 'Support', 'Feedback'],
  canonicalUrl: '/contact',
})

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' },
        ]}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          We&apos;d love to hear from you! Whether you have questions, feedback, or want to contribute to <strong>{siteConfig.name}</strong>, we&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Email Us</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For general inquiries, code submissions, feedback, or partnership opportunities, please email us at:
          </p>
          <a
            href="mailto:developwebtheforge@2925.com"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            developwebtheforge@2925.com
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Response Time</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We typically respond to emails within 24-48 hours during weekdays. For urgent matters, please include &quot;URGENT&quot; in your subject line.
          </p>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Monday - Friday, 9 AM - 6 PM EST</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">What Can We Help With?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">📝 Code Submissions</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Found a new code? Let us know! We verify all codes before adding them to our database.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">🐛 Report Errors</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Found incorrect information? Help us keep the wiki accurate by reporting errors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">💡 Suggestions</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Have ideas for new guides or features? We&apos;re always looking to improve!
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">🤝 Partnerships</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Interested in collaborating? Reach out for partnership and sponsorship opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Before You Contact Us</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
            <span>Check our <a href="/codes" className="text-amber-600 dark:text-amber-400 hover:underline">Codes page</a> to see if your code is already listed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
            <span>Review our <a href="/wiki" className="text-amber-600 dark:text-amber-400 hover:underline">Wiki guides</a> - your question might already be answered</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
            <span>For game-related issues, contact the official <a href="https://www.roblox.com/games/76558904092080/The-Forge-BETA" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">The Forge</a> developers</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

