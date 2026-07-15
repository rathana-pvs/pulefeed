import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getArticle, getRelatedArticles } from '@/lib/api-server'
import { getPayloadClient } from '@/lib/payload'
import { ReadingBar } from '@/components/ui/ReadingBar'
import { InfiniteArticleScroll } from '@/components/layout/InfiniteArticleScroll'

interface PageProps {
  params: Promise<{ slug: string; title: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // slug = tracking key, title = article slug
  const { slug: key, title: slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }

  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'
  const title = article.meta?.title || article.title
  const description = article.meta?.description || article.excerpt

  return {
    title,
    description,
    alternates: {
      canonical: `/article/${key}/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/article/${key}/${slug}`,
      siteName: 'Pulefeed',
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author?.name || 'Pulefeed Staff'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function DynamicArticlePage({ params }: PageProps) {
  // slug = tracking key, title = article slug
  const { slug: key, title: slug } = await params
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'
  
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.id)

  // Track the click on the server side
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit/i.test(userAgent)

    if (!isBot) {
      const payload = await getPayloadClient()
      const shareLinkResult = await payload.find({
        collection: 'share-links' as any,
        where: { key: { equals: key } },
        limit: 1,
      })

      const shareLink = shareLinkResult.docs[0]
      if (shareLink) {
        await payload.update({
          collection: 'share-links' as any,
          id: shareLink.id,
          data: {
            clicks: (shareLink.clicks || 0) + 1,
          },
        })
      }
    }
  } catch (e) {
    console.error('Error tracking share link click:', e)
  }

  const heroImage = article.coverImage?.url || 'https://picsum.photos/seed/article/1400/900'
  const keywords = article.tags?.map((t) => t.tag).join(', ') ?? ''
  const articleSection = article.tags?.[0]?.tag ?? 'News'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/article/${key}/${slug}`,
    },
    headline: article.title,
    description: article.excerpt,
    image: [
      {
        '@type': 'ImageObject',
        url: heroImage,
        width: article.coverImage?.width ?? 1400,
        height: article.coverImage?.height ?? 900,
      },
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection,
    keywords,
    author: [{
      '@type': 'Person',
      name: article.author?.name || 'Pulefeed Staff',
      url: `${siteUrl}/about`,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Pulefeed',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingBar />
      <InfiniteArticleScroll initialArticle={article} initialRelated={related} />
    </>
  )
}
