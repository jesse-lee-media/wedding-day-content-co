import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

import { Role, hasRole, hasRoleOrPublished } from '@/payload/access';

export const Faqs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  typescript: {
    interface: 'PayloadFaqCollection',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  access: {
    read: hasRoleOrPublished(Role.Admin, Role.Editor),
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin),
  },
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
  ],
};
