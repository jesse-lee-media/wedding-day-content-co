import type { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';

export const PhoneNumber: Block = {
  slug: 'phoneNumber',
  interfaceName: 'PayloadPhoneNumberBlock',
  fields: baseFormFields(),
};
