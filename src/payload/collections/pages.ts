import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { revalidatePath, revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload';

import { slugify } from '@/lib/utils/slugify';
import { Role, hasRole, hasRoleOrPublished } from '@/payload/access';
import { ButtonLink } from '@/payload/blocks/button-link';
import { Form } from '@/payload/blocks/form';
import { Gallery } from '@/payload/blocks/gallery';
import { Hero } from '@/payload/blocks/hero';
import { MediaLinks } from '@/payload/blocks/media-links';
import { Section } from '@/payload/blocks/section';
import type { PayloadPagesCollection } from '@/payload/payload-types';
import { generatePreviewPath } from '@/payload/utils/generate-preview-path';

const setSlugAndPath: CollectionAfterChangeHook<PayloadPagesCollection> = ({
  context,
  doc,
  req,
}) => {
  if (!doc?.title || !doc?.breadcrumbs?.length || context?.ignoreSetSlugAndPath) {
    return doc;
  }

  const slug = slugify(doc.title);
  const path = doc.breadcrumbs?.length
    ? doc.breadcrumbs[doc.breadcrumbs.length - 1].url
    : `/${slug}`;

  if (doc.path === path && doc.slug === slug) {
    return doc;
  }

  return req.payload.update({
    collection: 'pages',
    id: doc.id,
    data: {
      path,
      slug,
    },
    context: {
      ignoreSetSlugAndPath: true,
    },
    req,
  });
};

const revalidatePageAfterChange: CollectionAfterChangeHook<PayloadPagesCollection> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published' && doc.path) {
    payload.logger.info(`Revalidating path: ${doc.path}`);
    revalidatePath(doc.path);
    revalidateTag('pages-sitemap');
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published' && previousDoc.path) {
    payload.logger.info(`Revalidating previous path: ${previousDoc.path}`);
    revalidatePath(previousDoc.path);
    revalidateTag('pages-sitemap');
  }

  return doc;
};

export const revalidatePageAfterDelete: CollectionAfterDeleteHook<PayloadPagesCollection> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc.path) {
    revalidatePath(doc.path);
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
        interval: 250,
      },
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          path: typeof data?.path === 'string' ? data.path : '',
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        path: typeof data?.path === 'string' ? data.path : '',
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
    afterChange: [setSlugAndPath, revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  defaultPopulate: {
    slug: true,
    path: true,
    breadcrumbs: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
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
          BlocksFeature({ blocks: [Hero, Section, Gallery, MediaLinks, ButtonLink, Form] }),
        ],
      }),
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'path',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
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
        path: {
          // @ts-expect-error – valid field
          not_equals: siblingData?.path,
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
