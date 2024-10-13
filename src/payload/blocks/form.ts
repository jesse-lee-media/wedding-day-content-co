import { Block } from 'payload';

export const Form: Block = {
  slug: 'formBlock',
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
