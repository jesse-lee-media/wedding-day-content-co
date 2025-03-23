import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const Marquee = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    tabIndex={-1}
    className={cn(
      'group relative flex flex-row gap-8 overflow-x-scroll whitespace-nowrap motion-safe:overflow-x-hidden',
      className,
    )}
    {...props}
  />
);

const marqueeContentVariants = cva('whitespace-nowrap group-hover:[animation-play-state:paused]', {
  variants: {
    speed: {
      slow: 'animate-marquee-slow',
      normal: 'animate-marquee-normal',
      fast: 'animate-marquee-fast',
    },
  },
  defaultVariants: {
    speed: 'normal',
  },
});

export type MarqueeContentProps = ComponentProps<'div'> &
  VariantProps<typeof marqueeContentVariants> & {
    asChild?: boolean;
    duplicate?: boolean;
  };

const MarqueeContent = ({
  asChild = false,
  className,
  duplicate = false,
  speed,
  ...props
}: MarqueeContentProps) => {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      aria-hidden={duplicate}
      className={cn(marqueeContentVariants({ speed }), className)}
      {...props}
    />
  );
};

const marqueeFadeVariants = cva(
  'pointer-events-none absolute inset-y-0 w-1/6 from-neutral-50 md:w-1/5 dark:from-black',
  {
    variants: {
      side: {
        left: 'left-0 bg-linear-to-r',
        right: 'right-0 bg-linear-to-l',
      },
    },
  },
);

export type MarqueeFadeProps = ComponentProps<'div'> & VariantProps<typeof marqueeFadeVariants>;

const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div className={cn(marqueeFadeVariants({ side }), className)} {...props} />
);

export { Marquee, MarqueeContent, MarqueeFade };
