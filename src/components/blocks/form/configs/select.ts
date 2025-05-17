import { z } from 'zod';

import { REQUIRED_MESSAGE } from '@/components/blocks/form/constants';
import { SelectField } from '@/components/blocks/form/fields/select-field';
import type { FieldConfig } from '@/components/blocks/form/types';
import type { PayloadSelectBlock } from '@/payload/payload-types';

export const selectConfig: FieldConfig<PayloadSelectBlock> = {
  defaultValue: (m) => m.defaultValue || '',
  schema: (m) =>
    m.required ? z.string().min(1, { message: REQUIRED_MESSAGE }) : z.string().min(0),
  Renderer: SelectField,
  format: (m, v) => {
    const selected = m.options.find((o) => o.value === v);

    return selected?.label ?? '';
  },
};
