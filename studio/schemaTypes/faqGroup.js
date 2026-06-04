import { defineField, defineType } from 'sanity'

export const faqGroupType = defineType({
  name: 'faqGroup',
  title: 'FAQ Group',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Group Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: r => r.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', validation: r => r.required() }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'order' },
  },
  orderings: [{ name: 'orderAsc', title: 'Order', by: [{ field: 'order', direction: 'asc' }] }],
})
