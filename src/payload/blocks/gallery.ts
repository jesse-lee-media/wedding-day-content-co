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
      type: 'radio',
      defaultValue: 'grid',
      admin: {
        layout: 'horizontal',
      },
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
      relationTo: ['images', 'videos'],
      required: true,
      hasMany: true,
      minRows: 1,
    },
  ],
};
