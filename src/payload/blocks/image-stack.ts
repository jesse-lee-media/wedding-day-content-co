import { Block } from 'payload';

export const ImageStack: Block = {
  slug: 'imageStack',
  interfaceName: 'PayloadImageStackBlock',
  fields: [
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      maxRows: 2,
      minRows: 2,
      required: true,
    },
  ],
};
