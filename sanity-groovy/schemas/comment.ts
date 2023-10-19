import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'comment'}], // Reference to the "postedBy" type
    }),
  ],
})
