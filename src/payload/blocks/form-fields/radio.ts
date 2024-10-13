import { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';
import { required } from '@/payload/fields/required';

export const Radio: Block = {
  slug: 'radio',
  interfaceName: 'PayloadRadioBlock',
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
      validate: (value: any, { siblingData }: any) => {
        if (!value) {
          return true;
        }

        const option = siblingData?.options?.find((option: any) => option.value === value);

        if (!option) {
          return 'Field must equal the value from one of the options';
        }

        return true;
      },
    },
    required,
  ],
};
