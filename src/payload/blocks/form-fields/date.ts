import { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';
import { required } from '@/payload/fields/required';

export const Date: Block = {
  slug: 'date',
  interfaceName: 'PayloadDateBlock',
  fields: [
    ...baseFormFields.filter(
      // @ts-expect-error – valid filter
      (field) => field?.name !== 'required' && field?.name !== 'defaultValue',
    ),
    {
      type: 'row',
      fields: [
        {
          name: 'mode',
          type: 'select',
          admin: {
            width: '50%',
          },
          required: true,
          defaultValue: 'single',
          options: [
            {
              label: 'Single',
              value: 'single',
            },
            {
              label: 'Multiple',
              value: 'multiple',
            },
            {
              label: 'Range',
              value: 'range',
            },
          ],
        },
        {
          name: 'allowedDates',
          type: 'select',
          admin: {
            width: '50%',
          },
          required: true,
          defaultValue: 'any',
          options: [
            {
              label: 'Any dates',
              value: 'any',
            },
            {
              label: 'Previous dates',
              value: 'previous',
            },
            {
              label: 'Future dates',
              value: 'future',
            },
          ],
        },
      ],
    },
    {
      name: 'defaultDateValue',
      label: 'Default Value',
      type: 'date',
      admin: {
        condition: (_, siblingData) => siblingData?.mode === 'single',
      },
    },
    {
      name: 'defaultDateValues',
      label: 'Default Values',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.mode === 'multiple',
        components: {
          RowLabel: {
            path: '@/payload/components/row-label.tsx',
            exportName: 'RowLabel',
            clientProps: {
              path: 'value',
              fallback: 'Date',
            },
          },
        },
      },
      fields: [
        {
          name: 'value',
          type: 'date',
        },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.mode === 'range',
      },
      fields: [
        {
          name: 'defaultDateFromValue',
          label: 'Default From Value',
          type: 'date',
          admin: {
            condition: (_, siblingData) => siblingData?.mode === 'range',
          },
        },
        {
          name: 'defaultDateToValue',
          label: 'Default To Value',
          type: 'date',
          admin: {
            condition: (_, siblingData) => siblingData?.mode === 'range',
          },
        },
      ],
    },
    required,
  ],
};
