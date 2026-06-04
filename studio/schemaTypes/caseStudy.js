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
      title: 'Media',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'type', title: 'Type', type: 'string', options: { list: [{ title: 'Video', value: 'video' }, { title: 'Image', value: 'image' }] } }),
          defineField({ name: 'file', title: 'File / Image', type: 'image' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'duration', title: 'Duration (video only)', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'type' } },
      }],
    }),
    defineField({
      name: 'applicationProduct',
      title: 'Application Product',
      type: 'object',
      fields: [
        defineField({ name: 'series', title: 'Series Name', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'image', title: 'Product Image', type: 'image' }),
        defineField({ name: 'href', title: 'Product Link', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'logo' },
  },
})
