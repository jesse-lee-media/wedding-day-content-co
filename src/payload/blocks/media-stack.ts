import type { Block } from 'payload';

export const MediaStack: Block = {
  slug: 'mediaStack',
  interfaceName: 'PayloadMediaStackBlock',
  fields: [
    {
      name: 'media',
      type: 'relationship',
      relationTo: ['images'],
      hasMany: true,
      maxRows: 2,
      minRows: 2,
      required: true,
    },
  ],
};
