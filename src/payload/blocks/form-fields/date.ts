import type { Block } from 'payload';

import { baseFormFields } from '@/payload/fields/base-form-fields';

export const Date: Block = {
  slug: 'date',
  interfaceName: 'PayloadDateBlock',
  fields: baseFormFields(
    {
      defaultValue: [
        {
          name: 'defaultDateValue',
          label: 'Default Value',
          type: 'date',
          admin: {
            condition: (_, siblingData) => siblingData?.mode === 'single',
            width: '50%',
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
            width: '50%',
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
            width: '50%',
          },
          fields: [
            {
              name: 'defaultDateFromValue',
              label: 'Default From Value',
              type: 'date',
              admin: {
                condition: (_, siblingData) => siblingData?.mode === 'range',
                width: '50%',
              },
            },
            {
              name: 'defaultDateToValue',
              label: 'Default To Value',
              type: 'date',
              admin: {
                condition: (_, siblingData) => siblingData?.mode === 'range',
                width: '50%',
              },
            },
          ],
        },
      ],
    },
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
  ),
};
