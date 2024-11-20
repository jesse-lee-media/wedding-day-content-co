import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => (
  <textarea
    className={cn(
      'w-full rounded border-2 border-neutral-200 bg-white p-4 text-lg text-black shadow shadow-black/10 transition placeholder:text-neutral-500 hover:border-neutral-600/75 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600/75 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      className,
    )}
    rows={4}
    {...props}
  />
);

export { Textarea };
