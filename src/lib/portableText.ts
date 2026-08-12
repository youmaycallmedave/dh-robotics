import { urlFor } from './sanity'
import type { PostBlock } from '../types/post'

/**
 * Sanity Portable Text → PostBlock[] для <PostContent />.
 * Общий для новостей и материалов Support Hub — структура контента у них одинаковая.
 */
export function mapContent(sanityContent: any[], imageWidth = 795): PostBlock[] {
  if (!sanityContent) return []

  const blocks: PostBlock[] = []
  let textBlock: { type: 'text'; heading?: string; paragraphs: string[] } | null = null
  let listBlock: { type: 'list'; intro?: string; items: string[]; ordered: boolean } | null = null

  function flushText() { if (textBlock) { blocks.push(textBlock); textBlock = null } }
  function flushList() { if (listBlock) { blocks.push(listBlock); listBlock = null } }

  for (const b of sanityContent) {
    if (b._type === 'block') {
      const text = b.children?.map((c: any) => c.text).join('') ?? ''
      if (!text) continue

      if (b.listItem === 'bullet' || b.listItem === 'number') {
        const ordered = b.listItem === 'number'
        flushText()
        if (!listBlock || listBlock.ordered !== ordered) {
          flushList()
          listBlock = { type: 'list', items: [], ordered }
        }
        listBlock.items.push(text)
        continue
      }

      flushList()

      if (['h2', 'h3', 'h4'].includes(b.style)) {
        flushText()
        textBlock = { type: 'text', heading: text, paragraphs: [] }
      } else {
        if (!textBlock) textBlock = { type: 'text', paragraphs: [] }
        textBlock.paragraphs.push(text)
      }
    } else if (b._type === 'image') {
      flushText(); flushList()
      blocks.push({ type: 'image', src: urlFor(b).width(imageWidth).url(), alt: b.alt ?? '' })
    } else if (b._type === 'videoEmbed') {
      flushText(); flushList()
      blocks.push({ type: 'video', src: b.thumbnail ? urlFor(b.thumbnail).width(imageWidth).url() : '', alt: b.url ?? '' })
    } else if (b._type === 'callout') {
      flushText(); flushList()
      blocks.push({ type: 'callout', text: b.text ?? '' })
    }
  }

  flushText(); flushList()
  return blocks
}
