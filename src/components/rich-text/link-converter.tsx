import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import Link from 'next/link';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/lib/utils/cn';
import { linkProps } from '@/lib/utils/link';
import type { PayloadLinkGroupField } from '@/payload/payload-types';

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
        'hover:text-dusty-rose-800 hover:dark:text-dusty-rose-300 underline underline-offset-2',
        additionalClass,
      )
    }
  >
    {nodesToJSX({ nodes: node.children })}
  </Link>
);
