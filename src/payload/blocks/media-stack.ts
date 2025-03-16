import type { Block } from 'payload';

export const MediaStack: Block = {
  slug: 'mediaStack',
  interfaceName: 'PayloadMediaStackBlock',
  fields: [
    {
      name: 'media',
      type: 'relationship',
      relationTo: ['images', 'videos'],
      hasMany: true,
      maxRows: 2,
      minRows: 2,
      required: true,
    },
  ],
};
