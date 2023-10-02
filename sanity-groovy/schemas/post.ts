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
      title: 'Groover',
      type: 'reference',
      to: [{type: 'user'}], // Replace 'user' with the actual type for the author
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
      of: [{type: 'text'}], // Assuming you have a 'comment' type
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
      title: 'title',
      user: 'user.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {user} = selection
      return {...selection, subtitle: user && `by ${user}`}
    },
  },
})
