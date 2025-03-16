import type { Block, Field } from 'payload';

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
      name: 'media',
      type: 'relationship',
      relationTo: ['images', 'videos'],
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
