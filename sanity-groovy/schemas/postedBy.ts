import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'postedBy',
  title: 'Posted By',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    // Add more fields as needed for the 'postedBy' type
  ],
})
