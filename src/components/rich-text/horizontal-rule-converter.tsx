import type { SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical';

import type { JSXConverter } from '@/components/rich-text';
import { cn } from '@/utils/cn';

export const horizontalRuleConverter: JSXConverter<SerializedHorizontalRuleNode> = ({
  additionalClass,
  overrideClass,
}) => (
  <hr
    className={
      overrideClass ||
      cn('my-6 border-t-2 border-t-neutral-200 first:mt-0 last:mb-0', additionalClass)
    }
  />
);
