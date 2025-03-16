import type { Field } from 'payload';

export const background: Field = {
  name: 'background',
  type: 'select',
  interfaceName: 'PayloadBackgroundField',
  required: true,
  defaultValue: 'default',
  options: [
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ],
};
