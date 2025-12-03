import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Users, Target, Award, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us - The Forge Wiki',
  description: 'Learn about The Forge Wiki team. We are experienced players and community members dedicated to providing comprehensive guides and resources for The Forge Roblox game.',
  keywords: ['About Us', 'The Forge Wiki', 'Team', 'Community', 'E-E-A-T'],
  canonicalUrl: '/about',
})

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl 2xl:px-[192px]">
      <SEOHead
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
          About {siteConfig.name}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          We are a community-driven resource dedicated to helping players master <strong>The Forge</strong>, one of Roblox&apos;s most engaging RPG experiences.
        </p>
      </div>

      <section className="mb-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <Users className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            Who We Are
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <strong>{siteConfig.name}</strong> is created and maintained by a team of dedicated <strong>The Forge</strong> players who have spent hundreds of hours exploring the game, testing strategies, and documenting every aspect of the gameplay experience.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our team consists of experienced players who have achieved high-level progression, completed all major quests, and mastered the game&apos;s complex systems including forging, mining, race selection, and combat mechanics.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We understand the challenges players face when starting <strong>The Forge</strong>, and we&apos;re committed to providing accurate, up-to-date information to help both new and experienced players succeed.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <Target className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          Our Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Comprehensive Guides</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We provide detailed, step-by-step guides for all aspects of <strong>The Forge</strong>, from beginner tutorials to advanced strategies for end-game content.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Accurate Information</h3>
            <p className="text-gray-700 dark:text-gray-300">
              All our guides are tested in-game and regularly updated to reflect the latest game changes and patches.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Community Support</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We foster a supportive community where players can share strategies, ask questions, and help each other improve.
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Free Resources</h3>
            <p className="text-gray-700 dark:text-gray-300">
              All our content is free to access. We believe knowledge should be shared freely within the gaming community.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          Our Expertise (E-E-A-T)
        </h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Following Google&apos;s E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness), we ensure our content meets the highest standards:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">🎮 Experience</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our team has extensive hands-on experience with <strong>The Forge</strong>. We&apos;ve completed all quests, tested every race, mined at all depths, and crafted countless weapons. Our guides are written from real gameplay experience, not theory.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">🎓 Expertise</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We specialize in <strong>The Forge</strong> gameplay mechanics, optimization strategies, and community knowledge. Our content creators have deep understanding of game systems, meta strategies, and player needs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">🏆 Authoritativeness</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We are recognized as a trusted resource within <strong>The Forge</strong> community. Our guides are referenced by players, content creators, and community forums. We maintain relationships with the official game developers and stay updated on all game changes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">✅ Trustworthiness</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We are transparent about our methods, sources, and updates. All information is verified in-game before publication. We clearly identify when content is based on community reports versus our own testing. Our <Link href="/privacy" className="text-amber-600 dark:text-amber-400 hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-amber-600 dark:text-amber-400 hover:underline">Terms of Service</Link> demonstrate our commitment to user trust and data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <Heart className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">📋 Complete Code Database</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Regularly updated list of all active and expired codes with detailed reward information.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">🏃 Race Tier Lists</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Comprehensive race statistics, tier rankings, and recommendations based on playstyle.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">🔨 Forging Guides</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Step-by-step tutorials for mastering the manual forging minigame and crafting powerful weapons.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">📜 Quest Walkthroughs</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Detailed guides for all quests including Bard&apos;s Guitar, Goblin King, and Lost Cat.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">⛏️ Mining Resources</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Complete ores database with prices, depths, and mining strategies.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">🎲 Interactive Tools</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Reroll Simulator and other tools to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Get Involved</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We&apos;re always looking for community contributions! Found a new code? Discovered a better strategy? Want to help improve our guides?
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Contact us at <a href="mailto:developwebtheforge@2925.com" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">developwebtheforge@2925.com</a> or visit our <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Contact page</Link>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/codes"
              className="bg-white dark:bg-gray-800 border border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Codes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

