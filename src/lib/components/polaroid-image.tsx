import { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils/cn';

export type PolaroidImageProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

export const PolaroidImage = ({ asChild, className, ...props }: PolaroidImageProps) => {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      className={cn(
        'rounded bg-white p-4 pb-16 shadow-lg shadow-black/10 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:shadow-white/5 dark:ring-neutral-700',
        className,
      )}
      {...props}
    />
  );
};
