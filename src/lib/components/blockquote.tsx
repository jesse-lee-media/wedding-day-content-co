import type { ComponentProps } from 'react';

import { QuoteSolid } from 'iconoir-react';

import { cn } from '@/lib/utils/cn';

const Blockquote = ({ children, className, ...props }: ComponentProps<'blockquote'>) => (
  <blockquote
    className={cn(
      'group relative isolate flex w-full flex-col items-center gap-4 overflow-hidden rounded bg-neutral-50/75 p-4 text-center shadow-lg ring-2 shadow-black/10 ring-neutral-200 md:p-6 dark:bg-neutral-800 dark:shadow-white/5 dark:ring-neutral-700',
      className,
    )}
    {...props}
  >
    <QuoteSolid aria-hidden className="size-12 drop-shadow-lg dark:text-neutral-300" />
    {children}
    <div className="bg-dusty-rose-300/25 dark:bg-dusty-rose-800/25 absolute -z-10 h-64 w-56 rotate-45 rounded-full blur-3xl group-odd:top-1/4 group-odd:-right-1/4 group-even:top-1/2 group-even:right-1/4"></div>
  </blockquote>
);

const BlockquoteBody = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className="my-auto flex flex-grow flex-col">
    <div className={cn('text-lg italic', className)} {...props} />
  </div>
);

const BlockquoteFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('text-xl font-medium drop-shadow-lg dark:text-neutral-300', className)}
    {...props}
  />
);

export { Blockquote, BlockquoteBody, BlockquoteFooter };
