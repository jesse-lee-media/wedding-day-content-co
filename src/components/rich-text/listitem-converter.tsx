import type { SerializedListItemNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';

export const listitemConverter: JSXConverter<SerializedListItemNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => <li className={overrideClass || additionalClass}>{nodesToJSX({ nodes: node.children })}</li>;
