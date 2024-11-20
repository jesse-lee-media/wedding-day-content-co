import type { Block } from 'payload';

import { linkGroup } from '@/payload/fields/link';

export const ImageLinks: Block = {
  slug: 'imageLinks',
  interfaceName: 'PayloadImageLinksBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: '@/payload/components/row-label.tsx',
            exportName: 'RowLabel',
            clientProps: {
              path: 'link.text',
              fallback: 'Link',
            },
          },
        },
      },
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        linkGroup,
      ],
    },
  ],
};
