import type { SerializedParagraphNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';

export const paragraphConverter: JSXConverter<SerializedParagraphNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => {
  const children = nodesToJSX({ nodes: node.children });

  if (!children.length) {
    return <br />;
  }

  return (
    <p className={overrideClass || cn('my-3 text-lg first:mt-0 last:mb-0', additionalClass)}>
      {children}
    </p>
  );
};
