import { ComponentProps } from 'react';

import { QuoteSolid } from 'iconoir-react';

import { cn } from '@/lib/utils/cn';

const Blockquote = ({ children, className, ...props }: ComponentProps<'blockquote'>) => (
  <blockquote
    className={cn(
      'group relative isolate flex w-full flex-col items-center gap-4 overflow-hidden rounded bg-neutral-50/75 p-4 text-center shadow-lg shadow-black/10 ring-2 ring-neutral-200 md:p-6',
      className,
    )}
    {...props}
  >
    <QuoteSolid aria-hidden className="size-12 drop-shadow-lg" />
    {children}
    <div className="absolute -z-10 h-64 w-56 rotate-45 rounded-full bg-dusty-rose-300/25 blur-3xl group-odd:-right-1/4 group-odd:top-1/4 group-even:right-1/4 group-even:top-1/2"></div>
  </blockquote>
);

const BlockquoteBody = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className="my-auto flex flex-grow flex-col">
    <div className={cn('text-lg italic', className)} {...props} />
  </div>
);

const BlockquoteFooter = ({ className, ...props }: ComponentProps<'footer'>) => (
  <footer className={cn('text-xl font-medium drop-shadow-lg', className)} {...props} />
);

export { Blockquote, BlockquoteBody, BlockquoteFooter };
