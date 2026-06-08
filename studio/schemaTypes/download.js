import { defineField, defineType } from 'sanity'

export const downloadType = defineType({
  name: 'download',
  title: 'Download',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'version', title: 'Version', type: 'string' }),
    defineField({
      name: 'fileFormat',
      title: 'File Format',
      type: 'string',
      options: { list: ['PDF', 'STEP', 'ZIP', 'EXE', 'DXF', 'IGS', 'STL', 'Other'] },
    }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'fileUrl', title: 'File URL', type: 'url' }),
    defineField({ name: 'file', title: 'File (upload)', type: 'file' }),
    defineField({
      name: 'tab',
      title: 'Tab / Type',
      type: 'string',
      options: {
        list: [
          { title: 'Product Manuals', value: 'product-manuals' },
          { title: '3D Model', value: '3d-model' },
          { title: 'User Guides', value: 'user-guides' },
          { title: 'Plugin', value: 'plugin' },
          { title: 'Dexterous Hand', value: 'dexterous-hand' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (optional)',
      description: 'Link to a category if this download applies to all series in it',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'series',
      title: 'Series (optional)',
      type: 'reference',
      to: [{ type: 'productSeries' }],
    }),
    defineField({
      name: 'product',
      title: 'Product Model (optional)',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'pages',
      title: 'Show on pages',
      description: 'Where this download should appear (besides Download Center)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'User Control Software page', value: 'software' },
        ],
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tab', description: 'series.title' },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: [subtitle, description].filter(Boolean).join(' · ') }
    },
  },
  orderings: [{ name: 'dateDesc', title: 'Date (newest)', by: [{ field: 'date', direction: 'desc' }] }],
})
