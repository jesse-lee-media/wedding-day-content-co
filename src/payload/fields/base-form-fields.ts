import {
  BoldFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

import { richTextFields } from '@/payload/fields/link';
import { required } from '@/payload/fields/required';

export const baseFormFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
        },
      },
      {
        name: 'label',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'placeholder',
        type: 'text',
        admin: {
          width: '50%',
        },
      },
      {
        name: 'width',
        type: 'select',
        admin: {
          width: '50%',
        },
        required: true,
        defaultValue: 'full',
        options: [
          {
            label: 'Half',
            value: 'half',
          },
          {
            label: 'Full',
            value: 'full',
          },
        ],
      },
    ],
  },
  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: () => [
        ParagraphFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        StrikethroughFeature(),
        SuperscriptFeature(),
        SubscriptFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        LinkFeature({ fields: richTextFields }),
        InlineToolbarFeature(),
      ],
    }),
  },
  {
    name: 'defaultValue',
    type: 'text',
  },
  required,
];
