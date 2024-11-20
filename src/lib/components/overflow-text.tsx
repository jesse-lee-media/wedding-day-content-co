import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils/cn';

export type OverflowTextProps = ComponentProps<'span'> & {
  asChild?: boolean;
};

const OverflowText = ({ asChild, className, ...props }: OverflowTextProps) => {
  const Component = asChild ? Slot : 'span';

  return (
    <Component
      className={cn('overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
    />
  );
};

export { OverflowText };
