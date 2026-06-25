import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getRelatedArticles } from '@/lib/api-server'
import { ReadingBar } from '@/components/ui/ReadingBar'
import { InfiniteArticleScroll } from '@/components/layout/InfiniteArticleScroll'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Use dynamic rendering
export const dynamic = 'force-dynamic'

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

export const revalidate = 5

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'
  
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.id)

  const heroImage = article.coverImage?.url || 'https://picsum.photos/seed/article/1400/900'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [heroImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{
      '@type': 'Person',
      name: article.author?.name || 'Pulefeed Staff',
      url: `${siteUrl}/about`,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Pulefeed',
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
