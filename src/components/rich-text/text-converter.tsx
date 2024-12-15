import type { SerializedTextNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';

export const textConverter: JSXConverter<SerializedTextNode> = ({ node }) => {
  switch (node.format) {
    case 1: // bold
      return <strong>{node.text}</strong>;
    case 1 << 1: // italic
      return <em>{node.text}</em>;
    case 1 << 2: // strikethrough
      return <span className="line-through">{node.text}</span>;
    case 1 << 3: // underline
      return <span className="underline underline-offset-4">{node.text}</span>;
    case 1 << 4: // code
      return <code>{node.text}</code>;
    case 1 << 5: // subscript
      return <sub>{node.text}</sub>;
    case 1 << 6: // superscript
      return <sup>{node.text}</sup>;
    default:
      return node.text;
  }
};
