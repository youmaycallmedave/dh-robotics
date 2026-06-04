import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'productSeries' }],
      validation: r => r.required(),
    }),
    defineField({ name: 'order', title: 'Order within series', type: 'number', initialValue: 0 }),
    defineField({ name: 'subtitle', title: 'Subtitle / Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'unit', title: 'Unit (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'icon', title: 'Icon', type: 'image' }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'series.title', media: 'image' },
  },
  orderings: [{ name: 'orderAsc', title: 'Order', by: [{ field: 'order', direction: 'asc' }] }],
})
