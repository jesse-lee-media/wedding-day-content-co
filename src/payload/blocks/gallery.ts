import type { Block } from 'payload';

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'PayloadGalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: ['images'],
      required: true,
      hasMany: true,
      minRows: 1,
    },
  ],
};
