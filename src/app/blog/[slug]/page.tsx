import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog'
import Breadcrumbs from '@/components/Breadcrumbs'
import SEOHead from '@/components/SEOHead'
import { Clock, Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} - The Forge Wiki`,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author.name }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author.name],
            tags: post.tags,
            url: `/blog/${post.slug}`,
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <SEOHead
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Blog', url: '/blog' },
                    { name: post.title, url: `/blog/${post.slug}` },
                ]}
            />

            <article className="container mx-auto px-4 py-12 max-w-4xl">
                <Breadcrumbs
                    items={[
                        { name: 'Home', url: '/' },
                        { name: 'Blog', url: '/blog' },
                        { name: post.title, url: `/blog/${post.slug}` },
                    ]}
                />

                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:gap-3 transition-all mb-8 font-medium"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {post.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    {post.author.name}
                                </div>
                                <div className="text-sm">{post.author.role}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span>{post.readingTime} min read</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex items-center gap-3 mt-4 flex-wrap">
                            <Tag className="h-4 w-4 text-gray-400" />
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-h1:text-4xl prose-h1:mb-4
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
          prose-ul:my-6 prose-ul:space-y-2
          prose-ol:my-6 prose-ol:space-y-2
          prose-li:text-gray-700 dark:prose-li:text-gray-300
          prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/10 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded
          prose-table:w-full prose-table:my-8
          prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800
          prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-gray-100 prose-th:border-b-2 prose-th:border-gray-300 dark:prose-th:border-gray-600
          prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-200 dark:prose-td:border-gray-700
          prose-tr:hover:bg-gray-50 dark:prose-tr:hover:bg-gray-800/50
        ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                            Found this helpful?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Check out more expert guides and strategies on our blog.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                href="/blog"
                                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                More Articles
                            </Link>
                            <Link
                                href="/"
                                className="inline-block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
