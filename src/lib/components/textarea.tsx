import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => (
  <textarea
    className={cn(
      'w-full rounded-sm border-2 border-neutral-200 bg-neutral-50 p-4 text-lg text-neutral-800 shadow-sm shadow-black/10 transition placeholder:text-neutral-500 hover:border-neutral-600/75 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-400/75 focus-visible:outline-hidden',
      className,
    )}
    rows={4}
    {...props}
  />
);

export { Textarea };
