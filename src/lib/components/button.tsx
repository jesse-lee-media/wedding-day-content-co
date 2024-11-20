import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'rounded transition inline-flex w-full items-center justify-center font-medium !no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600/75 focus-visible:ring-offset-2 xs:w-fit disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-y-2 disabled:border-b-neutral-300 disabled:border-t-neutral-100',
  {
    variants: {
      variant: {
        primary:
          'bg-neutral-800 dark:bg-dusty-rose-800 text-neutral-100 dark:text-dusty-rose-50 border-y-2 border-t-neutral-600 dark:border-t-dusty-rose-600 border-b-neutral-950 dark:border-b-dusty-rose-950',
        secondary:
          'bg-neutral-100 text-neutral-900 border-y-2 border-t-neutral-50/75 border-b-neutral-200/75',
      },
      size: {
        sm: 'h-10 text-sm gap-1.5',
        md: 'h-12 text-base gap-2',
        lg: 'h-14 text-xl gap-2.5',
      },
      iconPosition: {
        left: 'flex-row-reverse',
        right: 'flex-row',
        center: 'flex-row',
        none: 'flex-row',
      },
      asChild: {
        true: 'hover:shadow-lg hover:shadow-black/10 hover:!no-underline',
        false: 'hover:enabled:shadow-lg hover:enabled:shadow-black/10 hover:enabled:!no-underline',
      },
      background: {
        default: 'focus-visible:ring-offset-white',
        dark: 'focus-visible:ring-offset-black',
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
      {
        variant: 'primary',
        asChild: true,
        className:
          'hover:bg-black dark:hover:bg-dusty-rose-900 hover:text-white dark:hover:text-dusty-rose-100',
      },
      {
        variant: 'primary',
        asChild: false,
        className:
          'hover:enabled:bg-black dark:hover:enabled:bg-dusty-rose-900 hover:enabled:text-white dark:hover:enabled:text-dusty-rose-100',
      },
      {
        variant: 'secondary',
        asChild: true,
        className: 'hover:bg-neutral-200 hover:text-black',
      },
      {
        variant: 'secondary',
        asChild: false,
        className: 'hover:enabled:bg-neutral-200 hover:enabled:text-black',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconPosition: 'none',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = ({
  asChild = false,
  background,
  className,
  iconPosition,
  variant,
  size,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      {...props}
      className={cn(
        buttonVariants({ variant, size, className, iconPosition, asChild, background }),
      )}
    />
  );
};

export { Button };
