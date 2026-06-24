import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'

import { MostRead } from '@/components/sections/MostRead'
import { LatestNewsGrid } from '@/components/sections/LatestNewsGrid'
import { AdBanner } from '@/components/ads/AdBanner'
import { getArticles, getFeatured } from '@/lib/api-server'
import { Article } from '@/types'
import { dict } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Pulefeed — Independent Political & Tech Feed',
  description: 'Breaking news, parliament coverage, and deep investigations from Pulefeed.',
}

export const revalidate = 10

export default async function HomePage() {
  const [{ hero, secondary }, allArticles] = await Promise.all([
    getFeatured(),
    getArticles({ limit: 40 }),
  ])

  const articles = allArticles.docs as Article[]



  // Editor's picks (first 3 non-featured)
  const editorPicks = articles.filter((a) => !a.isFeatured).slice(0, 3)

  // Mock "most read" as top 5
  const mostRead = articles.slice(0, 5)




  return (
    <>
      {/* Hero */}
      <HeroSection hero={hero} secondary={secondary} />

      {/* Ad Spot */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <AdBanner format="728x90" label="Sponsor Spotlight" />
      </div>

      {/* Latest News Divider */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4 py-8">
          <h2 className="label-caps !text-[var(--text-primary)] tracking-[0.2em] whitespace-nowrap">
            {dict.latestNews}
          </h2>
          <div className="h-[1px] w-full bg-border" style={{ background: 'var(--border)' }} />
        </div>
      </div>

      <LatestNewsGrid articles={articles.slice(0, 8)} />

      {/* Second Ad Spot */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <AdBanner format="728x90" label="Global News Sponsor" />
      </div>




      {/* Most Read + Editor's Picks */}
      <MostRead editorPicks={editorPicks} mostRead={mostRead} />
    </>
  )
}
