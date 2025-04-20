import type { CollectionAfterChangeHook, CollectionConfig, Field } from 'payload';

import { Role, hasRole } from '@/payload/access';
import { linkGroup } from '@/payload/fields/link';
import type { PayloadImagesCollection } from '@/payload/payload-types';
import { createDataUrl } from '@/payload/utils/create-data-url';
import { deepMerge } from '@/payload/utils/deep-merge';

const addDataUrl: CollectionAfterChangeHook<PayloadImagesCollection> = async ({
  context,
  doc,
  req,
}) => {
  if (!doc.url || context?.ignoreAddDataUrl) {
    return doc;
  }

  const dataUrl = await createDataUrl(doc.url, doc.mimeType);

  return req.payload.update({
    collection: 'images',
    id: doc.id,
    data: {
      dataUrl,
    },
    context: {
      ignoreAddDataUrl: true,
    },
    req,
  });
};

export const Images: CollectionConfig<'images'> = {
  slug: 'images',
  typescript: {
    interface: 'PayloadImagesCollection',
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin),
  },
  hooks: {
    afterChange: [addDataUrl],
  },
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
      },
      {
        name: 'preview',
        height: 1080,
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'alt',
      label: 'Description',
      type: 'textarea',
    },
    deepMerge<Field>(linkGroup, {
      admin: {
        condition: (_, siblingData) => !!siblingData?.hasLink,
      },
    }),
    {
      name: 'dataUrl',
      label: 'Data URL',
      type: 'text',
      maxLength: 1_000_000,
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => !!data?.dataUrl,
      },
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'hasLink',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'displayOriginal',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
};
