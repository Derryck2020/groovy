import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userId',
      title: 'UserId',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}], // Reference the 'postedBy' schema type
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}], // Replace 'user' with the actual type for users
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}], // Assuming you have a 'comment' type
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Add more fields as needed for the 'post' type
  ],

  preview: {
    select: {
      title: 'title', // You should replace this with the actual title field in your 'post' type
      user: 'postedBy.name', // Reference the 'name' field in the 'postedBy' type
      media: 'mainImage', // Replace this with the actual image field
    },
    prepare(selection) {
      const {user} = selection
      return {...selection, subtitle: user && `by ${user}`}
    },
  },
})
