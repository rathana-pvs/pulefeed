'use client'

import React, { useState } from 'react'
import { serializeLexical } from './serialize'
import AdskeeperWidget from '@/components/ads/AdskeeperWidget'

export type RichTextProps = {
  content: any
  className?: string
  articleTitle?: string          // Main article title for deduplication
  adWidgetId?: string            // Top in-article ad (before Continue Reading blur)
  adWidgetId2?: string           // Mid in-article ad (first ad in expanded section)
  secondAdWidgetId?: string      // Alias for adWidgetId2
  adWidgetId3?: string           // Lower in-article ad (lower ad in expanded section)
  underArticleWidgetId?: string  // Under-article native ad grid
  feedWidgetId?: string          // Feed widget
}

function extractNodeText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractNodeText).join(' ')
  }
  return ''
}

export const RichText = ({
  content,
  className,
  articleTitle,
  adWidgetId,
  adWidgetId2,
  secondAdWidgetId,
  adWidgetId3,
  underArticleWidgetId,
  feedWidgetId,
}: RichTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!content) return null

  // Lexical content structure: { root: { children: [...] } }
  const rawNodes = content.root?.children || []

  // Filter out any top nodes that duplicate articleTitle (checks top 3 blocks)
  let nodes = rawNodes
  if (articleTitle && rawNodes.length > 0) {
    const cleanTitle = articleTitle.trim().toLowerCase()
    const titlePrefix = cleanTitle.substring(0, Math.min(25, cleanTitle.length))
    nodes = rawNodes.filter((node: any, idx: number) => {
      if (idx >= 3) return true
      const text = extractNodeText(node).trim().toLowerCase()
      if (!text) return true
      if (
        text === cleanTitle || 
        (titlePrefix.length > 5 && text.startsWith(titlePrefix)) || 
        (text.length > 5 && cleanTitle.startsWith(text.substring(0, 25)))
      ) {
        return false
      }
      return true
    })
  }

  const primaryWidgetId =
    adWidgetId || process.env.NEXT_PUBLIC_ADS_KEEPER_WIDGET_IN_ARTICLE_1 || '2043077'

  const secondaryWidgetId =
    adWidgetId2 || secondAdWidgetId || process.env.NEXT_PUBLIC_ADS_KEEPER_WIDGET_IN_ARTICLE_2 || '2044156'

  const tertiaryWidgetId =
    adWidgetId3 || process.env.NEXT_PUBLIC_ADS_KEEPER_WIDGET_IN_ARTICLE_3

  const resolvedFeedWidgetId =
    feedWidgetId || process.env.NEXT_PUBLIC_ADS_KEEPER_WIDGET_FEED

  // If no primary ad configured or article is too short, render plain
  if (!primaryWidgetId || nodes.length < 2) {
    return (
      <div className={`rich-text ${className || ''}`}>
        {serializeLexical(nodes)}
      </div>
    )
  }

  // Count total paragraphs and find exact paragraph boundary indices
  let paragraphCount = 0
  let p1EndIndex = nodes.length // index after paragraph 1
  let p2EndIndex = nodes.length // index after paragraph 2
  let p3EndIndex = nodes.length // index after paragraph 3

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type === 'paragraph') {
      paragraphCount++
      if (paragraphCount === 1) p1EndIndex = i + 1
      if (paragraphCount === 2) p2EndIndex = i + 1
      if (paragraphCount === 3) p3EndIndex = i + 1
    }
  }

  // If article has fewer than 3 paragraphs, render plain with in_article_1 after P1
  if (paragraphCount < 3) {
    const p1Nodes = nodes.slice(0, p1EndIndex)
    const restNodes = nodes.slice(p1EndIndex)
    return (
      <div className={`rich-text ${className || ''}`}>
        {serializeLexical(p1Nodes, 'p1')}
        {primaryWidgetId && (
          <div key="ad-inarticle-1-wrap" className="my-3 w-full flex justify-center items-center">
            <AdskeeperWidget key="ad-inarticle-1" widgetId={primaryWidgetId} className="!my-0" />
          </div>
        )}
        {serializeLexical(restNodes, 'rest')}
      </div>
    )
  }

  // Paragraph node slices
  const p1Nodes = nodes.slice(0, p1EndIndex)
  const p2Nodes = nodes.slice(p1EndIndex, p2EndIndex)
  const p3Nodes = nodes.slice(p2EndIndex, p3EndIndex)
  const restNodes = nodes.slice(p3EndIndex)

  // ─── Collapsed state: P1 -> in_article_1 -> P2 -> Blur on P3 -> Continue Reading ───
  if (!isExpanded) {
    return (
      <div className={`rich-text relative ${className || ''}`}>
        {/* Paragraph 1 */}
        {serializeLexical(p1Nodes, 'top-p1')}

        {/* In-Article 1 Ad */}
        {primaryWidgetId && (
          <div key="ad-inarticle-1-wrap" className="my-3 w-full flex justify-center items-center">
            <AdskeeperWidget key="ad-inarticle-1" widgetId={primaryWidgetId} className="!my-0" />
          </div>
        )}

        {/* Paragraph 2 */}
        {serializeLexical(p2Nodes, 'top-p2')}

        {/* Paragraph 3 with blur & gradient fade mask */}
        {p3Nodes.length > 0 && (
          <div className="relative overflow-hidden max-h-[90px] mt-3 mb-2 select-none pointer-events-none">
            <div className="blur-[1.5px] opacity-75 line-clamp-3">
              {serializeLexical(p3Nodes, 'blurred-p3')}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/80 to-[var(--bg-primary)]" />
          </div>
        )}

        {/* Solid Red Pill Continue Reading CTA */}
        <div className="w-full flex justify-center pt-2 pb-3 mt-2 mb-1">
          <button
            onClick={() => setIsExpanded(true)}
            className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full cursor-pointer font-semibold text-sm text-white transition-all duration-200 active:scale-[0.98] shadow-md hover:shadow-lg hover:brightness-110"
            style={{
              background: 'var(--accent-red)',
            }}
          >
            <span>Continue Reading</span>
            <svg
              className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // ─── Expanded state: Full article (P1 -> in_article_1 -> P2 -> P3 -> in_article_2 -> P4..P7) ───
  return (
    <div className={`rich-text ${className || ''}`}>
      {/* Paragraph 1 */}
      {serializeLexical(p1Nodes, 'full-p1')}

      {/* In-Article 1 Ad */}
      {primaryWidgetId && (
        <div key="ad-inarticle-1-full-wrap" className="my-3 w-full flex justify-center items-center">
          <AdskeeperWidget key="ad-inarticle-1-full" widgetId={primaryWidgetId} className="!my-0" />
        </div>
      )}

      {/* Paragraph 2 */}
      {serializeLexical(p2Nodes, 'full-p2')}

      {/* Paragraph 3 (Unblurred) */}
      {serializeLexical(p3Nodes, 'full-p3')}

      {/* In-Article 2 Ad after P3 when more paragraphs exist */}
      {secondaryWidgetId && restNodes.length > 0 && (
        <div key="ad-inarticle-2-full-wrap" className="my-4 w-full flex justify-center items-center">
          <AdskeeperWidget key="ad-inarticle-2-full" widgetId={secondaryWidgetId} className="!my-0" />
        </div>
      )}

      {/* Remaining Paragraphs (P4, P5, P6, P7...) */}
      {restNodes.length > 0 && serializeLexical(restNodes, 'full-rest')}
    </div>
  )
}
