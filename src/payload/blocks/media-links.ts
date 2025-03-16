import type { Block } from 'payload';

import { linkGroup } from '@/payload/fields/link';

export const MediaLinks: Block = {
  slug: 'mediaLinks',
  interfaceName: 'PayloadMediaLinksBlock',
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
          name: 'media',
          type: 'relationship',
          relationTo: ['images', 'videos'],
          required: true,
        },
        linkGroup,
      ],
    },
  ],
};
