import path from 'path';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { env } from '@/env/server';
import { Role } from '@/payload/access';
import { Faqs } from '@/payload/collections/faqs';
import { Forms } from '@/payload/collections/forms';
import { Media } from '@/payload/collections/media';
import { Pages } from '@/payload/collections/pages';
import { Users } from '@/payload/collections/users';
import { linkFields } from '@/payload/fields/link';
import { Footer } from '@/payload/globals/footer';
import { Navigation } from '@/payload/globals/navigation';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const whitelist = [env.SERVER_URL];

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Media, Faqs, Forms, Users],
  cors: whitelist,
  csrf: whitelist,
  db: postgresAdapter({
    pool: {
      connectionString: env.POSTGRES_CONNECTION_STRING,
    },
    migrationDir: path.join(dirname, 'migrations'),
    idType: 'uuid',
  }),
  editor: lexicalEditor({
    features: () => [
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SuperscriptFeature(),
      SubscriptFeature(),
      AlignFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature({ fields: linkFields }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  email: resendAdapter({
    defaultFromAddress: env.DEFAULT_FROM_ADDRESS,
    defaultFromName: env.DEFAULT_FROM_NAME,
    apiKey: env.RESEND_API_KEY,
  }),
  globals: [Navigation, Footer],
  graphQL: {
    disable: true,
  },
  plugins: [
    nestedDocsPlugin({
      collections: ['pages'],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, doc) => doc?.title as string,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc?.slug}`, ''),
    }),
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: env.R2_BUCKET,
      config: {
        endpoint: env.R2_ENDPOINT,
        credentials: {
          accessKeyId: env.R2_ACCESS_KEY_ID,
          secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        },
        region: 'auto',
      },
    }),
  ],
  onInit: async (payload) => {
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (users.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: env.PAYLOAD_ADMIN_USER,
          password: env.PAYLOAD_ADMIN_PASSWORD,
          roles: [Role.Admin],
        },
      });
    }
  },
  secret: env.PAYLOAD_SECRET,
  serverURL: env.SERVER_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
