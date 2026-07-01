import { Article, PaginatedArticles } from '@/types'
import { getPayloadClient } from './payload'
import { unstable_cache } from 'next/cache'

export const getArticles = unstable_cache(
  async (params?: {
    limit?: number
    page?: number
    where?: Record<string, any>
  }): Promise<PaginatedArticles> => {
    try {
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
    } catch (error) {
      console.warn('⚠️ Postgres connection failed in getArticles (expected during build):', error instanceof Error ? error.message : error)
      return {
        docs: [],
        totalDocs: 0,
        limit: params?.limit || 12,
        totalPages: 1,
        page: params?.page || 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      } as unknown as PaginatedArticles
    }
  },
  ['articles-list'],
  { tags: ['articles'] }
)

export const getArticle = unstable_cache(
  async (slug: string): Promise<Article | null> => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as unknown as Article) || null
    } catch (error) {
      console.warn(`⚠️ Postgres connection failed in getArticle for slug "${slug}" (expected during build):`, error instanceof Error ? error.message : error)
      return null
    }
  },
  ['article'],
  { tags: ['articles'] }
)

export const getFeatured = unstable_cache(
  async (): Promise<{ hero: Article | null; secondary: Article[] }> => {
    try {
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
    } catch (error) {
      console.warn('⚠️ Postgres connection failed in getFeatured (expected during build):', error instanceof Error ? error.message : error)
      return { hero: null, secondary: [] }
    }
  },
  ['featured-articles'],
  { tags: ['articles'] }
)

export const getBreakingArticles = unstable_cache(
  async (): Promise<Article[]> => {
    try {
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
    } catch (error) {
      console.warn('⚠️ Postgres connection failed in getBreakingArticles (expected during build):', error instanceof Error ? error.message : error)
      return []
    }
  },
  ['breaking-articles'],
  { tags: ['articles'] }
)

export const getRelatedArticles = unstable_cache(
  async (articleId: string | number): Promise<Article[]> => {
    try {
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
    } catch (error) {
      console.warn(`⚠️ Postgres connection failed in getRelatedArticles for ID "${articleId}" (expected during build):`, error instanceof Error ? error.message : error)
      return []
    }
  },
  ['related-articles'],
  { tags: ['articles'] }
)
