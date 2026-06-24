'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'
import { AuthorChip } from '@/components/ui/AuthorChip'
import { BreakingBadge } from '@/components/ui/BreakingBadge'

import { dict } from '@/lib/i18n'

interface HeroSectionProps {
  hero: Article | null
  secondary: Article[]
}

export function HeroSection({ hero, secondary }: HeroSectionProps) {


  if (!hero) return null

  const heroImage = hero.coverImage?.url || 'https://picsum.photos/seed/hero/1200/800'

  return (
    <section className="w-full relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px" style={{ borderColor: 'var(--border)' }}>

          {/* Hero Article — 60% */}
          <motion.div
            className="lg:col-span-3 overflow-hidden cursor-pointer group border-b lg:border-b-0 pb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={`/article/${hero.slug}`} className="block h-full">
              {/* Hero Image - stacked on top */}
              <div className="relative w-full overflow-hidden mb-6" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={heroImage}
                  alt={hero.coverImage?.alt || hero.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-700"
                />
              </div>

              {/* Content Below */}
              <div className="flex flex-col justify-end px-2">
                <motion.div
                  className="flex gap-3 mb-2 items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {hero.isBreaking && (
                    <span
                      className="font-mono font-bold uppercase tracking-[0.2em]"
                      style={{ fontSize: 10, color: 'var(--accent-red)' }}
                    >
                      {dict.breaking}
                    </span>
                  )}
                </motion.div>

                {/* Headline — large bold serif */}
                <motion.h1
                  className="font-card-title font-bold leading-tight mb-3"
                  style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', color: 'var(--text-primary)', lineHeight: 1.15 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <span className="underline-hover pb-[2px]">{hero.title}</span>
                </motion.h1>

                {/* Excerpt — high contrast */}
                <motion.p
                  className="text-base leading-relaxed mb-4 line-clamp-2 max-w-xl"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  {hero.excerpt}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <AuthorChip 
                    author={hero.author || null} 
                    date={hero.publishedAt} 
                    readTime={hero.readTime}
                    className="hero-author-chip"
                  />
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Articles — 40% */}
          <div className="lg:col-span-2 flex flex-col border-t lg:border-t-0 lg:border-l border-border lg:pl-6">
            {secondary.slice(0, 2).map((article, i) => {
              return (
                <motion.div
                  key={article.id}
                  className="relative cursor-pointer group flex-1"
                  style={{
                    background: 'transparent',
                    borderBottom: i === 0 ? '1px solid var(--border)' : 'none',
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <Link href={`/article/${article.slug}`} className="flex h-full py-4 lg:py-0">
                    <div className="relative w-40 flex-shrink-0 overflow-hidden">
                      <Image
                        src={article.coverImage?.url || `https://picsum.photos/seed/${article.id}/400/300`}
                        alt={article.coverImage?.alt || article.title}
                        fill
                        sizes="160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-5 pl-6 min-w-0">
                      <h2
                        className="font-card-title leading-tight line-clamp-3 mb-2"
                        style={{ fontSize: 15, color: 'var(--text-primary)' }}
                      >
                        <span className="underline-hover pb-[2px]">{article.title}</span>
                      </h2>
                      <AuthorChip author={article.author || null} date={article.publishedAt} size="sm" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
