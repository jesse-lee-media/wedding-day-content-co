import { HTMLAttributes, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

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

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  duplicate?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
};

const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>(
  ({ asChild = false, className, duplicate = false, speed = 'normal', ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    const speedClass = {
      slow: 'animate-marquee-slow',
      normal: 'animate-marquee-normal',
      fast: 'animate-marquee-fast',
    };

    return (
      <Component
        ref={ref}
        aria-hidden={duplicate}
        className={cn('whitespace-nowrap group-hover:[animation-play-state:paused]', speedClass[speed], className)}
        {...props}
      />
    );
  },
);
MarqueeContent.displayName = 'MarqueeContent';

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

const MarqueeFade = forwardRef<HTMLDivElement, MarqueeFadeProps>(({ className, side, ...props }, ref) => {
  const slideClass = {
    left: 'left-0 bg-gradient-to-r',
    right: 'right-0 bg-gradient-to-l',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-y-0 w-1/6 from-white dark:from-black md:w-1/5',
        slideClass[side],
        className,
      )}
      {...props}
    />
  );
});
MarqueeFade.displayName = 'MarqueeFade';

export { Marquee, MarqueeContent, MarqueeFade };
