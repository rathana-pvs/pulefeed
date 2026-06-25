'use client'

import { serializeLexical } from './serialize'
import AdskeeperWidget from '@/components/ads/AdskeeperWidget'

export type RichTextProps = {
  content: any
  className?: string
  adWidgetId?: string
}

export const RichText = ({ content, className, adWidgetId }: RichTextProps) => {
  if (!content) return null

  // Lexical content structure: { root: { children: [...] } }
  const nodes = content.root?.children || []

  if (!adWidgetId || nodes.length <= 3) {
    return (
      <div className={`rich-text ${className || ''}`}>
        {serializeLexical(nodes)}
      </div>
    )
  }

  // Split and inject the ad widget after the first 3 paragraphs/nodes
  const firstHalf = nodes.slice(0, 3)
  const secondHalf = nodes.slice(3)

  return (
    <div className={`rich-text ${className || ''}`}>
      {serializeLexical(firstHalf)}
      <AdskeeperWidget widgetId={adWidgetId} className="my-8" />
      {serializeLexical(secondHalf)}
    </div>
  )
}
