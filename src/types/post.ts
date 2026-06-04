export type PostBlock =
  | { type: 'text'; heading?: string; paragraphs: string[] }
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; intro?: string; items: string[]; ordered?: boolean }
