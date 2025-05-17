import { z } from 'zod';

import { REQUIRED_MESSAGE } from '@/components/blocks/form/constants';
import { RadioField } from '@/components/blocks/form/fields/radio-field';
import type { FieldConfig } from '@/components/blocks/form/types';
import type { PayloadRadioBlock } from '@/payload/payload-types';

export const radioConfig: FieldConfig<PayloadRadioBlock> = {
  defaultValue: (m) => m.defaultValue || '',
  schema: (m) =>
    m.required ? z.string().min(1, { message: REQUIRED_MESSAGE }) : z.string().min(0),
  Renderer: RadioField,
  format: (m, v) => {
    const selected = m.options.find((o) => o.value === v);

    return selected?.label ?? '';
  },
};
