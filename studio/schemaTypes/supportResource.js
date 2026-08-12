import { defineField, defineType } from 'sanity'

export const supportResourceType = defineType({
  name: 'supportResource',
  title: 'Support Hub',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'resourceType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video tutorials', value: 'video' },
          { title: 'Articles', value: 'article' },
          { title: 'Webinars', value: 'webinar' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'series',
      title: 'Cobot Series',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productSeries' }] }],
      description: 'Серии, к которым относится материал — используется фильтром на /support',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Programming', value: 'Programming' },
          { title: 'Interface & Communication', value: 'Interface & Communication' },
          { title: 'Safety', value: 'Safety' },
          { title: 'Hardware', value: 'Hardware' },
        ],
      },
    }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Для типов Video tutorials и Webinars',
      hidden: ({ parent }) => parent?.resourceType === 'article',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video',
          fields: [
            defineField({ name: 'url', title: 'Video URL', type: 'url' }),
            defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image' }),
            defineField({ name: 'duration', title: 'Duration (e.g. 03:30)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'downloads',
      title: 'Related downloads',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'download' }] }],
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Date, new → old', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Date, old → new', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'resourceType', media: 'coverImage' },
  },
})
