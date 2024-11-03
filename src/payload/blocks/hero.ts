import { Block, Field } from 'payload';

import { buttonLinkArray } from '@/payload/fields/buttonLink';
import { deepMerge } from '@/payload/utils/deep-merge';

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'PayloadHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      maxRows: 2,
      minRows: 2,
      required: true,
    },
    deepMerge<Field>(buttonLinkArray, {
      required: true,
      minRows: 1,
    }),
  ],
};
