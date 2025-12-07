export interface BlogPost {
    slug: string
    title: string
    description: string
    content: string
    author: {
        name: string
        role: string
        avatar?: string
    }
    publishedAt: string
    updatedAt?: string
    category: string
    tags: string[]
    featuredImage?: string
    readingTime: number // in minutes
    lang: string
}

export interface BlogCategory {
    id: string
    name: string
    description: string
    slug: string
}

export const blogCategories: BlogCategory[] = [
    {
        id: 'guides',
        name: 'Guides',
        description: 'Comprehensive gameplay guides and tutorials',
        slug: 'guides',
    },
    {
        id: 'tips',
        name: 'Tips & Tricks',
        description: 'Expert tips and strategies',
        slug: 'tips',
    },
    {
        id: 'updates',
        name: 'Game Updates',
        description: 'Latest game updates and patch notes',
        slug: 'updates',
    },
    {
        id: 'analysis',
        name: 'Analysis',
        description: 'In-depth game mechanics analysis',
        slug: 'analysis',
    },
]
