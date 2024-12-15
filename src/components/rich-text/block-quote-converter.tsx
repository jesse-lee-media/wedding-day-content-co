import type { SerializedQuoteNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';

export const blockQuoteConverter: JSXConverter<SerializedQuoteNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => (
  <blockquote className={overrideClass || additionalClass}>
    {nodesToJSX({ nodes: node.children })}
  </blockquote>
);
