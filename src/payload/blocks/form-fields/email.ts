import type { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';

export const Email: Block = {
  slug: 'email',
  interfaceName: 'PayloadEmailBlock',
  fields: baseFormFields,
};
