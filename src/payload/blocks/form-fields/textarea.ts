import { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';

export const Textarea: Block = {
  slug: 'textarea',
  interfaceName: 'PayloadTextareaBlock',
  fields: baseFormFields,
};
