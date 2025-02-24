import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { revalidatePath, revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  FieldHook,
} from 'payload';

import { slugify } from '@/lib/utils/slugify';
import { Role, hasRole, hasRoleOrPublished } from '@/payload/access';
import { ButtonLink } from '@/payload/blocks/button-link';
import { Form } from '@/payload/blocks/form';
import { Gallery } from '@/payload/blocks/gallery';
import { Hero } from '@/payload/blocks/hero';
import { ImageLinks } from '@/payload/blocks/image-links';
import { Section } from '@/payload/blocks/section';
import type { PayloadPagesCollection } from '@/payload/payload-types';
import { generatePreviewPath } from '@/payload/utils/generate-preview-path';

const useSlug: FieldHook<PayloadPagesCollection, string | undefined, PayloadPagesCollection> = ({
  operation,
  siblingData,
}) => {
  if (operation === 'create' || operation === 'update') {
    return slugify(siblingData?.title);
  }
};

const revalidatePageAfterChange: CollectionAfterChangeHook<PayloadPagesCollection> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`;

    payload.logger.info(`Revalidating path: ${path}`);
    revalidatePath(path);
    revalidateTag('pages-sitemap');
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`;

    payload.logger.info(`Revalidating previous path: ${oldPath}`);
    revalidatePath(oldPath);
    revalidateTag('pages-sitemap');
  }

  return doc;
};

export const revalidatePageAfterDelete: CollectionAfterDeleteHook<PayloadPagesCollection> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`;

    revalidatePath(path);
    revalidateTag('pages-sitemap');
  }

  return doc;
};

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  typescript: {
    interface: 'PayloadPagesCollection',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
  },
  access: {
    read: hasRoleOrPublished(Role.Admin, Role.Editor),
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin),
  },
  hooks: {
    afterChange: [revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  defaultPopulate: {
    breadcrumbs: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          BlocksFeature({ blocks: [Hero, Section, Gallery, ImageLinks, ButtonLink, Form] }),
        ],
      }),
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => !!data?.slug,
      },
      hooks: {
        beforeValidate: [useSlug],
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ siblingData }) => ({
        slug: {
          // @ts-expect-error – valid field
          not_equals: siblingData?.slug,
        },
      }),
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        hidden: true,
        position: 'sidebar',
        readOnly: true,
        components: {
          RowLabel: {
            path: '@/payload/components/row-label.tsx',
            exportName: 'RowLabel',
            clientProps: {
              path: 'label',
              fallback: 'Breadcrumb',
            },
          },
        },
      },
      fields: [
        {
          name: 'url',
          label: 'Path',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
};
