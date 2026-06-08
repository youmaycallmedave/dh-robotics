import { defineField, defineType } from 'sanity'

export const industryType = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
          defineField({ name: 'videoUrl', title: 'Video URL (YouTube)', type: 'url' }),
          defineField({ name: 'image', title: 'Image (fallback)', type: 'image', options: { hotspot: true } }),
          defineField({
            name: 'series',
            title: 'Related Series',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'productSeries' }] }],
          }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'relatedActions',
      title: 'Related Tasks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'action' }] }],
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
