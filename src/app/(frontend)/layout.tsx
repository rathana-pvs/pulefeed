import type { Metadata } from 'next'
import Script from 'next/script'
import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BreakingTicker } from '@/components/layout/BreakingTicker'
import { getBreakingArticles } from '@/lib/api-server'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NavigationProgress } from '@/components/layout/NavigationProgress'

const envUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteUrl = envUrl && !envUrl.includes('placeholder.com') ? envUrl : 'https://pulefeed.tech'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pulefeed — Independent Political & Tech Feed',
    template: '%s — Pulefeed',
  },
  description: 'Pulefeed delivers sharp, independent news coverage. Parliament, elections, tech, and more.',
  keywords: ['politics', 'news', 'parliament', 'elections', 'pulefeed'],
  openGraph: {
    siteName: 'Pulefeed',
    type: 'website',
    url: siteUrl,
    // opengraph-image.tsx auto-injects the og:image tag
  },
  twitter: {
    card: 'summary_large_image',
    // opengraph-image.tsx auto-injects twitter:image tag
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon_192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon_512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [breakingArticles] = await Promise.all([
    getBreakingArticles(),
  ])

  return (
    <html lang="en">
      <body>
        <NavigationProgress />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <BreakingTicker articles={breakingArticles} />
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Script src="https://jsc.adskeeper.com/site/1101571.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
