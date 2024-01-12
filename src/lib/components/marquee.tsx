import { HTMLAttributes, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Marquee = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'group relative flex flex-row gap-6 overflow-x-scroll whitespace-nowrap motion-safe:overflow-x-hidden',
      className,
    )}
    {...props}
  />
));
Marquee.displayName = 'Marquee';

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

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof marqueeContentVariants> & {
    asChild?: boolean;
    duplicate?: boolean;
  };

const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>(
  ({ asChild = false, className, duplicate = false, speed, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        ref={ref}
        aria-hidden={duplicate}
        className={cn(marqueeContentVariants({ speed }), className)}
        {...props}
      />
    );
  },
);
MarqueeContent.displayName = 'MarqueeContent';

const marqueeFadeVariants = cva('pointer-events-none absolute inset-y-0 w-1/6 from-white dark:from-black md:w-1/5', {
  variants: {
    side: {
      left: 'left-0 bg-gradient-to-r',
      right: 'right-0 bg-gradient-to-l',
    },
  },
});

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof marqueeFadeVariants>;

const MarqueeFade = forwardRef<HTMLDivElement, MarqueeFadeProps>(({ className, side, ...props }, ref) => (
  <div ref={ref} className={cn(marqueeFadeVariants({ side }), className)} {...props} />
));
MarqueeFade.displayName = 'MarqueeFade';

export { Marquee, MarqueeContent, MarqueeFade };
