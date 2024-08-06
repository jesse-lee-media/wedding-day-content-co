import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';

const Spinner = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'size-5 animate-spin rounded-full border border-black/25 border-t-black/10 dark:border-white/50 dark:border-t-white/25',
        className,
      )}
      {...props}
    />
  ),
);
Spinner.displayName = 'Spinner';

export { Spinner };
