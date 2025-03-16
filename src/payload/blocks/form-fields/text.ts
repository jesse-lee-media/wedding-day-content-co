import type { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';

export const Text: Block = {
  slug: 'text',
  interfaceName: 'PayloadTextBlock',
  fields: baseFormFields,
};
