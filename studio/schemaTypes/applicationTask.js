import { defineField, defineType } from 'sanity'

export const applicationTaskType = defineType({
  name: 'applicationTask',
  title: 'Application Task',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'icon', title: 'Icon', type: 'image', options: { hotspot: false } }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
  },
})
