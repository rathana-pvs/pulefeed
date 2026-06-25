import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { VideoEmbed } from '../blocks/VideoEmbed'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    description: 'News articles published on Pulefeed.',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (!req.user) return false
      if ((req.user as any).role === 'admin' || (req.user as any).role === 'editor') return true
      return { author: { equals: req.user.id } }
    },
    delete: ({ req }) => (req.user as any)?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data.slug && data.title) {
          // Note: slugify with strict:true returns "" for Khmer text.
          let generatedSlug = slugify(data.title, { lower: true, strict: true })
          
          if (!generatedSlug) {
            // Try less strict slugify
            generatedSlug = slugify(data.title, { lower: true, strict: false })
          }

          // Ensure slug is never empty
          data.slug = generatedSlug || `article-${Date.now()}`
        }
        
        if (data.content) {
          const contentStr = JSON.stringify(data.content)
          const wordCount = contentStr.split(/\s+/).length
          data.readTime = Math.max(1, Math.ceil(wordCount / 200))
        }

        // Auto-populate SEO/meta fields if not explicitly input by the user
        if (!data.meta) {
          data.meta = {}
        }
        if (!data.meta.title && data.title) {
          data.meta.title = `${data.title} — Pulefeed`
        }
        if (!data.meta.description && data.excerpt) {
          data.meta.description = data.excerpt
        }
        if (!data.meta.image && data.coverImage) {
          data.meta.image = data.coverImage
        }

        return data
      },
    ],
    afterChange: [
      ({ doc, req }) => {
        // Only revalidate if we are in a request context (prevents error during seeding)
        try {
          // Revalidate the home page
          revalidatePath('/', 'layout')
          
          // Revalidate the specific article if it's published
          if (doc.status === 'published') {
            revalidatePath(`/article/${doc.slug}`)
          }
        } catch (e) {
          // Ignore revalidation errors during seeding/CLI
        }
        
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', description: 'Auto-generated from title.' },
    },
    {
      name: 'shareLink',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/src/components/admin/ShareLinkField#ShareLinkField',
        },
      },
    },
    {
      name: 'confirmLeave',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/components/admin/ConfirmLeave#ConfirmLeave',
        },
      },
    },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 250 },
    { 
      name: 'content', 
      type: 'richText', 
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [VideoEmbed],
          }),
        ],
      }), 
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'credit', type: 'text', admin: { description: 'News source or attribution (e.g. CNN, AP, Reuters).' } },
    { name: 'author', type: 'relationship', relationTo: 'authors', admin: { position: 'sidebar' } },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'published',
      admin: { position: 'sidebar' },
    },
    { name: 'isBreaking', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'readTime', type: 'number', admin: { position: 'sidebar', description: 'Auto-calculated' } },
  ],
}
