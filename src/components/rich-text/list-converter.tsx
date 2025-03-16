import type { SerializedListNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';

export const listConverter: JSXConverter<SerializedListNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => (
  <node.tag
    className={
      overrideClass ||
      cn(
        'my-3 flex flex-col gap-2 pl-8',
        node.listType === 'bullet' ? 'list-disc' : 'list-decimal',
        additionalClass,
      )
    }
  >
    {nodesToJSX({ nodes: node.children })}
  </node.tag>
);
