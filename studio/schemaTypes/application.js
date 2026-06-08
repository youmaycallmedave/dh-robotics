import { defineField, defineType } from 'sanity'

export const applicationType = defineType({
  name: 'application',
  title: 'Application',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Industry', value: 'industry' },
          { title: 'Task', value: 'task' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, hidden: ({ document }) => document?.category !== 'industry' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, hidden: ({ document }) => document?.category !== 'industry' }),
    defineField({ name: 'icon', title: 'Icon', type: 'image', hidden: ({ document }) => document?.category !== 'task' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === 'industry' ? 'Industry' : 'Task',
      media,
    }),
  },
})
