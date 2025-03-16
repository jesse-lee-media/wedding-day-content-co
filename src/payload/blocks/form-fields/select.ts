import type { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';
import { required } from '@/payload/fields/required';
import type { PayloadSelectBlock } from '@/payload/payload-types';

export const Select: Block = {
  slug: 'select',
  interfaceName: 'PayloadSelectBlock',
  fields: [
    ...baseFormFields.filter(
      // @ts-expect-error – valid filter
      (field) => field?.name !== 'required' && field?.name !== 'defaultValue',
    ),
    {
      name: 'options',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: '@/payload/components/row-label.tsx',
            exportName: 'RowLabel',
            clientProps: {
              path: 'label',
              fallback: 'Option',
            },
          },
        },
      },
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'defaultValue',
      type: 'text',
      validate: (value: any, { siblingData }: { siblingData: Partial<PayloadSelectBlock> }) => {
        if (!value) {
          return true;
        }

        const option = siblingData?.options?.find((option) => option.value === value);

        if (!option) {
          return 'Field must equal the value from one of the options';
        }

        return true;
      },
    },
    required,
  ],
};
