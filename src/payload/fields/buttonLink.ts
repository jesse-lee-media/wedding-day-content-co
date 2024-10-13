import { Field } from 'payload';

import { linkGroup } from '@/payload/fields/link';

export const fields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'variant',
        type: 'select',
        required: true,
        defaultValue: 'primary',
        options: [
          {
            label: 'Primary',
            value: 'primary',
          },
          {
            label: 'Secondary',
            value: 'secondary',
          },
        ],
      },
      {
        name: 'size',
        type: 'select',
        required: true,
        defaultValue: 'md',
        options: [
          {
            label: 'Small',
            value: 'sm',
          },
          {
            label: 'Medium',
            value: 'md',
          },
          {
            label: 'Large',
            value: 'lg',
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'icon',
        type: 'select',
        admin: {
          isClearable: true,
          width: '50%',
        },
        options: [
          {
            label: 'Arrow right',
            value: 'arrowRight',
          },
          {
            label: 'Arrow up right',
            value: 'arrowUpRight',
          },
          {
            label: 'Instagram',
            value: 'instagram',
          },
          {
            label: 'Menu',
            value: 'menu',
          },
          {
            label: 'Chevron down',
            value: 'chevronDown',
          },
          {
            label: 'TikTok',
            value: 'tikTok',
          },
          {
            label: 'X',
            value: 'x',
          },
        ],
      },
      {
        name: 'iconPosition',
        type: 'select',
        admin: {
          condition: (_, siblingData) => !!siblingData?.icon,
          width: '50%',
        },
        required: true,
        defaultValue: 'none',
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Right',
            value: 'right',
          },
          {
            label: 'Center',
            value: 'center',
          },
        ],
      },
    ],
  },
  linkGroup,
];

export const buttonLinkGroup: Field = {
  name: 'buttonLink',
  type: 'group',
  interfaceName: 'PayloadButtonLinkGroupField',
  fields,
};

export const buttonLinkArray: Field = {
  name: 'buttonLinks',
  type: 'array',
  interfaceName: 'PayloadButtonLinkArrayField',
  admin: {
    components: {
      RowLabel: {
        path: '@/payload/components/row-label.tsx',
        exportName: 'RowLabel',
        clientProps: {
          path: 'link.text',
          fallback: 'Button Link',
        },
      },
    },
  },
  fields,
};
