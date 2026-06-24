import { Article, PaginatedArticles } from '@/types'
import { getPayloadClient } from './payload'

export async function getArticles(params?: {
  limit?: number
  page?: number
  where?: Record<string, any>
}): Promise<PaginatedArticles> {
  const payload = await getPayloadClient()
  
  const whereClause: any = {
    status: { equals: 'published' },
    ...(params?.where || {}),
  }

  const result = await payload.find({
    collection: 'articles',
    limit: params?.limit || 12,
    page: params?.page || 1,
    where: whereClause,
    depth: 2,
    sort: '-publishedAt',
  })

  return result as unknown as PaginatedArticles
}

export async function getArticle(slug: string): Promise<Article | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (result.docs[0] as unknown as Article) || null
}

export async function getFeatured(): Promise<{ hero: Article | null; secondary: Article[] }> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: {
      isFeatured: { equals: true },
      status: { equals: 'published' },
    },
    limit: 3,
    depth: 2,
    sort: '-publishedAt',
  })
  const docs = result.docs as unknown as Article[]
  return { hero: docs[0] || null, secondary: docs.slice(1, 3) }
}

export async function getBreakingArticles(): Promise<Article[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: {
      isBreaking: { equals: true },
      status: { equals: 'published' },
    },
    limit: 5,
    depth: 2,
  })
  return result.docs as unknown as Article[]
}

export async function getRelatedArticles(articleId: string | number): Promise<Article[]> {
  const payload = await getPayloadClient()
  const where: any = {
    status: { equals: 'published' },
    id: { not_equals: articleId },
  }

  const result = await payload.find({
    collection: 'articles',
    where,
    limit: 3,
    depth: 2,
  })
  return result.docs as unknown as Article[]
}
