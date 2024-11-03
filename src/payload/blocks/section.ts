import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, Field } from 'payload';

import { ButtonLink } from '@/payload/blocks/button-link';
import { Gallery } from '@/payload/blocks/gallery';
import { ImageStack } from '@/payload/blocks/image-stack';
import { MessagesMarquee } from '@/payload/blocks/messages-marquee';
import { Quotes } from '@/payload/blocks/quotes';
import { Stepper } from '@/payload/blocks/stepper';
import { background } from '@/payload/fields/background';
import { deepMerge } from '@/payload/utils/deep-merge';

const singleColumnBlocks: Block[] = [
  ButtonLink,
  Gallery,
  ImageStack,
  MessagesMarquee,
  Quotes,
  Stepper,
];
const multiColumnBlocks: Block[] = [ButtonLink, ImageStack];

const richTextField = (columns: '1' | '2'): Field => ({
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      BlocksFeature({
        blocks: columns === '1' ? singleColumnBlocks : multiColumnBlocks,
      }),
    ],
  }),
});

export const Section: Block = {
  slug: 'section',
  interfaceName: 'PayloadSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'columns',
      type: 'radio',
      admin: {
        layout: 'horizontal',
      },
      required: true,
      defaultValue: '1',
      options: [
        {
          label: 'One',
          value: '1',
        },
        {
          label: 'Two',
          value: '2',
        },
      ],
    },
    background,
    deepMerge<Field>(richTextField('1'), {
      admin: {
        condition: (_, siblingData) => siblingData.columns === '1',
      },
    }),
    deepMerge<Field>(richTextField('2'), {
      name: 'contentColumnOne',
      admin: {
        condition: (_, siblingData) => siblingData.columns === '2',
      },
    }),
    deepMerge<Field>(richTextField('2'), {
      name: 'contentColumnTwo',
      admin: {
        condition: (_, siblingData) => siblingData.columns === '2',
      },
    }),
  ],
};
