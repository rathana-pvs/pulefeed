import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'

import { MostRead } from '@/components/sections/MostRead'
import { LatestNewsGrid } from '@/components/sections/LatestNewsGrid'
import AdskeeperWidget from '@/components/ads/AdskeeperWidget'
import { getArticles, getFeatured } from '@/lib/api-server'
import { Article } from '@/types'

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

      {/* Latest News Grid */}
      <LatestNewsGrid articles={articles.slice(0, 8)} />

      {/* Adskeeper Feed Widget — natural break between news grid and most read */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <AdskeeperWidget widgetId="2043075" />
      </div>

      {/* Most Read + Editor's Picks */}
      <MostRead editorPicks={editorPicks} mostRead={mostRead} />
    </>
  )
}
