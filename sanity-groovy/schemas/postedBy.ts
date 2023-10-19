import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'postedBy',
  title: 'Posted By',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'User Name',
      type: 'string',
    }),
    // Add more fields as needed for the 'postedBy' type
  ],
})
