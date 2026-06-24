import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pulefeed.com'

  // Static pages
  const staticPages = ['', '/about', '/contact', '/privacy', '/live', '/search']

  // Fetch all articles
  const { docs: articles } = await payload.find({
    collection: 'articles',
    limit: 1000,
    select: {
      slug: true,
      updatedAt: true,
    },
  })
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add static pages
  staticPages.forEach((page) => {
    sitemapEntries.push({
      url: `${siteUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: page === '' ? 1 : 0.8,
    })
  })

  // Add article pages
  articles.forEach((article: any) => {
    sitemapEntries.push({
      url: `${siteUrl}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return sitemapEntries
}
