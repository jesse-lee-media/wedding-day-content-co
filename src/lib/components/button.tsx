import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex w-full items-center justify-center border-opacity-75 font-medium !no-underline transition focus:outline-none focus:ring-2 focus:ring-black/75 dark:focus:ring-white/75 xs:w-fit',
  {
    variants: {
      variant: {
        solid:
          'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white disabled:bg-black/10 disabled:text-black/25 disabled:border-black/20 disabled:dark:bg-white/10 disabled:dark:text-white/25 disabled:dark:border-white/25',
        outlined:
          'bg-white text-black border border-black dark:bg-black dark:text-white dark:border-white disabled:text-black/25 disabled:border-black/20 disabled:dark:text-white/50 disabled:dark:border-white/25',
      },
      size: {
        sm: 'h-10 text-sm gap-1.5 rounded-lg',
        md: 'h-12 text-base gap-2 rounded-xl',
        lg: 'h-14 text-lg gap-2.5 rounded-xl',
      },
      iconPosition: {
        left: 'flex-row-reverse',
        right: 'flex-row',
        center: 'flex-row',
        none: 'flex-row',
      },
    },
    compoundVariants: [
      {
        iconPosition: 'none',
        size: 'sm',
        className: 'px-4',
      },
      {
        iconPosition: 'none',
        size: 'md',
        className: 'px-6',
      },
      {
        iconPosition: 'none',
        size: 'lg',
        className: 'px-8',
      },
      {
        iconPosition: 'left',
        size: 'sm',
        className: 'px-4 xs:pr-4 xs:pl-3',
      },
      {
        iconPosition: 'left',
        size: 'md',
        className: 'px-6 xs:pr-6 xs:pl-5',
      },
      {
        iconPosition: 'left',
        size: 'lg',
        className: 'px-8 xs:pr-8 xs:pl-7',
      },
      {
        iconPosition: 'right',
        size: 'sm',
        className: 'px-4 xs:pl-4 xs:pr-3',
      },
      {
        iconPosition: 'right',
        size: 'md',
        className: 'px-6 xs:pl-6 xs:pr-5',
      },
      {
        iconPosition: 'right',
        size: 'lg',
        className: 'px-8 xs:pl-8 xs:pr-7',
      },
      {
        iconPosition: 'center',
        size: 'sm',
        className: 'xs:!w-10',
      },
      {
        iconPosition: 'center',
        size: 'md',
        className: 'xs:!w-12',
      },
      {
        iconPosition: 'center',
        size: 'lg',
        className: 'xs:!w-14',
      },
    ],
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, iconPosition = 'none', variant, size, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        {...props}
        className={cn(
          buttonVariants({ variant, size, className, iconPosition }),
          asChild
            ? 'hover:border-opacity-100 hover:bg-pink-100 hover:text-black hover:!no-underline hover:shadow-lg dark:hover:bg-pink-200 dark:hover:text-black'
            : 'hover:enabled:border-opacity-100 hover:enabled:bg-pink-100 hover:enabled:text-black hover:enabled:!no-underline hover:enabled:shadow-lg dark:hover:enabled:bg-pink-200 dark:hover:enabled:text-black',
        )}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
