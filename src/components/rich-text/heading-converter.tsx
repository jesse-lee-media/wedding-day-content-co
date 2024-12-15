import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

const headingClasses = (node: SerializedHeadingNode) => {
  switch (node.tag) {
    case 'h1':
      return 'mt-10 mb-8 text-4xl xs:text-5xl';
    case 'h2':
      return 'mt-8 mb-6 text-3xl xs:text-4xl';
    case 'h3':
      return 'mt-6 mb-4 text-2xl xs:text-3xl';
    default:
      return 'mt-4 mb-2 text-xl xs:text-2xl';
  }
};

export const headingConverter: JSXConverter<SerializedHeadingNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => (
  <node.tag
    // @ts-expect-error – valid key
    id={slugify(node.children?.map((c) => c.text).join(' '))}
    className={overrideClass || cn('first:mt-0 last:mb-0', headingClasses(node), additionalClass)}
  >
    {nodesToJSX({ nodes: node.children })}
  </node.tag>
);
