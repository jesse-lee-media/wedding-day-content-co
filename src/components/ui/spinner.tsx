import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

const Spinner = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    className={cn(
      'size-4 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-300',
      className,
    )}
    {...props}
  />
);

export { Spinner };
