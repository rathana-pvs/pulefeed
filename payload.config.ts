import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { 
  lexicalEditor, 
  FixedToolbarFeature, 
  HeadingFeature, 
  HorizontalRuleFeature,
  InlineCodeFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
  BlocksFeature
} from '@payloadcms/richtext-lexical'
import { VideoEmbed } from './src/blocks/VideoEmbed'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { cloudinaryStorage } from 'payload-cloudinary'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Articles } from './src/collections/Articles'
import { Authors } from './src/collections/Authors'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Pulefeed CMS',
    },
  },
  collections: [Articles, Authors, Media, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      HorizontalRuleFeature(),
      BlocksFeature({
        blocks: [VideoEmbed],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://pulefeed:pulefeed123@localhost:5434/pulefeed',
    },
  }),
  plugins: [
    seoPlugin({
      collections: ['articles'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: any }) => doc?.title ? `${doc.title} — Pulefeed` : 'Pulefeed',
      generateDescription: ({ doc }: { doc: any }) => doc?.excerpt || '',
    }),
    ...(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
      ? [
          cloudinaryStorage({
            collections: {
              media: true,
            },
            disableLocalStorage: true,
            config: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            },
          }),
        ]
      : []),
  ],
  serverURL: siteUrl,
  cors: [
    siteUrl,
    'https://pulefeed.com',
    'https://www.pulefeed.com',
  ],
  csrf: [
    siteUrl,
    'https://pulefeed.com',
    'https://www.pulefeed.com',
  ],
})
