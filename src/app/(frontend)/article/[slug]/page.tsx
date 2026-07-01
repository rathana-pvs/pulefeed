import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getArticles, getRelatedArticles } from '@/lib/api-server'
import { ReadingBar } from '@/components/ui/ReadingBar'
import { InfiniteArticleScroll } from '@/components/layout/InfiniteArticleScroll'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Allow older articles not in generateStaticParams to be rendered on-demand and cached
export const dynamicParams = true

// Pre-generate the 30 most recent articles as static pages at deploy time
export async function generateStaticParams() {
  try {
    const articles = await getArticles({ limit: 30 })
    return articles.docs.map((a) => ({ slug: a.slug }))
  } catch (error) {
    console.warn('⚠️ Postgres connection failed in generateStaticParams (expected during build):', error)
    return []
  }
}

// ISR: revalidate every 5 seconds — do NOT combine with force-dynamic
// (force-dynamic disables caching entirely, which hurts TTFB and Core Web Vitals)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }

  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'
  const title = article.meta?.title || article.title
  const description = article.meta?.description || article.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/article/${slug}`,
      siteName: 'Pulefeed',
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author?.name || 'Pulefeed Staff'],
      // opengraph-image.tsx auto-injects the og:image tag
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // opengraph-image.tsx auto-injects twitter:image tag
    },
  }
}

export const revalidate = 60

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'
  
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.id)

  const heroImage = article.coverImage?.url || 'https://picsum.photos/seed/article/1400/900'

  const keywords = article.tags?.map((t) => t.tag).join(', ') ?? ''
  const articleSection = article.tags?.[0]?.tag ?? 'News'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/article/${slug}`,
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
