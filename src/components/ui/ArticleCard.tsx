'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Article } from '@/types'
import { AuthorChip } from './AuthorChip'
import { BreakingBadge } from './BreakingBadge'
import { truncate } from '@/lib/utils'
import { dict } from '@/lib/i18n'

interface ArticleCardProps {
  article: Article
  size?: 'sm' | 'md' | 'lg'
  index?: number
  className?: string
}

export function ArticleCard({ article, size = 'md', index = 0, className }: ArticleCardProps) {

  
  const href = `/article/${article.slug}`
  const imageUrl = article.coverImage?.url || 'https://picsum.photos/seed/default/800/600'

  if (size === 'sm') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className={`group flex gap-3 border-b py-4 cursor-pointer transition-all ${className || ''}`}
        style={{ background: 'transparent', borderColor: 'var(--border)' }}
      >
        <Link href={href} className="flex gap-3 w-full">
          <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 100, height: 72 }}>
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="100px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-between min-w-0 py-0.5">
            <div>

              <h3
                className="font-card-title leading-tight line-clamp-3 text-sm"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="underline-hover pb-[2px]">{article.title}</span>
              </h3>
            </div>
            <div className="font-mono flex items-center gap-2 mt-1" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              {article.author && <span>{article.author.name}</span>}
              {article.readTime && <span>· {article.readTime} {dict.minRead}</span>}
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (size === 'lg') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className={`group border-b pb-6 cursor-pointer transition-all ${className || ''}`}
        style={{ background: 'transparent', borderColor: 'var(--border)' }}
      >
        <Link href={href}>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.2) 70%, transparent)' }}
            />
            <div className="absolute bottom-0 left-0 p-4 flex gap-2">

              {article.isBreaking && <BreakingBadge />}
            </div>
          </div>
          <div className="p-5">
            <h2
              className="font-card-title text-2xl leading-tight mb-2 line-clamp-4"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="underline-hover pb-[2px]">{article.title}</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-3"
              style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif' }}
            >
              {article.excerpt}
            </p>
            <AuthorChip author={article.author || null} date={article.publishedAt} readTime={article.readTime} />
          </div>
        </Link>
      </motion.article>
    )
  }

  // md (default)
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`group border-b pb-5 cursor-pointer transition-all ${className || ''}`}
      style={{ background: 'transparent', borderColor: 'var(--border)' }}
    >
      <Link href={href}>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
          {article.isBreaking && (
            <div className="absolute top-3 left-3">
              <BreakingBadge />
            </div>
          )}
        </div>
        <div className="p-4">

          <h3
            className="font-card-title leading-tight mb-2 line-clamp-3"
            style={{ color: 'var(--text-primary)', fontSize: '17px' }}
          >
            <span className="underline-hover pb-[2px]">{article.title}</span>
          </h3>
          <p
            className="text-sm leading-relaxed mb-3 line-clamp-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif' }}
          >
            {truncate(article.excerpt, 120)}
          </p>
          <AuthorChip
            author={article.author || null}
            date={article.publishedAt}
            readTime={article.readTime}
            size="sm"
          />
        </div>
      </Link>
    </motion.article>
  )
}
