import { defineField, defineType } from 'sanity'

export const productSeriesType = defineType({
  name: 'productSeries',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: r => r.required(),
    }),
    defineField({ name: 'order', title: 'Order within category', type: 'number', initialValue: 0 }),
    defineField({ name: 'subtitle', title: 'Subtitle / Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
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
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      description: 'Rows shown in the specs table',
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', media: 'heroImage' },
  },
  orderings: [{ name: 'orderAsc', title: 'Order', by: [{ field: 'order', direction: 'asc' }] }],
})
