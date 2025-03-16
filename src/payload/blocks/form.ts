import type { Block } from 'payload';

export const Form: Block = {
  slug: 'form',
  interfaceName: 'PayloadFormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
};
