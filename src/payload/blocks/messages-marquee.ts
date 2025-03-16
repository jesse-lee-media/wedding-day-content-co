import type { Block } from 'payload';

export const MessagesMarquee: Block = {
  slug: 'messagesMarquee',
  interfaceName: 'PayloadMessagesMarqueeBlock',
  fields: [
    {
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};
