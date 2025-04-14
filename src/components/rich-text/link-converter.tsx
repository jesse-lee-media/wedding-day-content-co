import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import Link from 'next/link';

import type { JSXConverter } from '@/components/rich-text';
import type { PayloadLinkGroupField } from '@/payload/payload-types';
import { cn } from '@/utils/cn';
import { linkProps } from '@/utils/link';

export const linkConverter: JSXConverter<SerializedLinkNode> = ({
  additionalClass,
  node,
  nodesToJSX,
  overrideClass,
}) => (
  <Link
    {...linkProps(node.fields as unknown as PayloadLinkGroupField)}
    className={
      overrideClass ||
      cn(
        'underline underline-offset-2 hover:text-dusty-rose-800 dark:hover:text-dusty-rose-300',
        additionalClass,
      )
    }
  >
    {nodesToJSX({ nodes: node.children })}
  </Link>
);
