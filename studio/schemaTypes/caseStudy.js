import { defineField, defineType } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Client Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'logo', title: 'Client Logo', type: 'image' }),
    defineField({
      name: 'media',
      title: 'Media (videos & images)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: { list: [{ title: 'Video', value: 'video' }, { title: 'Image', value: 'image' }] },
            validation: r => r.required(),
          }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'image', title: 'Full Image (for image type)', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'videoUrl', title: 'Video URL (for video type)', type: 'url' }),
          defineField({ name: 'duration', title: 'Duration (e.g. 03:30)', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'type', media: 'thumbnail' } },
      }],
    }),
    defineField({
      name: 'applicationProduct',
      title: 'Application Product',
      type: 'object',
      fields: [
        defineField({
          name: 'series',
          title: 'Series',
          type: 'reference',
          to: [{ type: 'productSeries' }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'logo' },
  },
})
