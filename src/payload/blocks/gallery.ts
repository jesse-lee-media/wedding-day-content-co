import { Block } from 'payload';

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
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: true,
      minRows: 1,
    },
  ],
};
