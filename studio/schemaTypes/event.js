import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'tag', title: 'Tag', type: 'string', options: { list: [{ title: 'Future event', value: 'future' }, { title: 'Past event', value: 'past' }] }, validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'registrationHref', title: 'Registration URL', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
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
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'text' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'heroImage' },
  },
})
