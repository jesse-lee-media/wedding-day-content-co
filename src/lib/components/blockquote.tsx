import { HTMLAttributes, forwardRef } from 'react';

import { QuoteSolidSolid } from 'iconoir-react';

import { cn } from '../utils';

const Blockquote = forwardRef<HTMLQuoteElement, HTMLAttributes<HTMLQuoteElement>>(
  ({ children, className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        'flex w-full flex-col items-center gap-4 rounded-xl border border-black/75 bg-pink-50 p-4 text-center md:p-6',
        className,
      )}
      {...props}
    >
      <QuoteSolidSolid aria-hidden className="size-12" />
      {children}
    </blockquote>
  ),
);
Blockquote.displayName = 'Blockquote';

const BlockquoteBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-lg italic', className)} {...props} />
));
BlockquoteBody.displayName = 'BlockquoteBody';

const BlockquoteFooter = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn('text-xl font-medium', className)} {...props} />
));
BlockquoteFooter.displayName = 'BlockquoteFooter';

export { Blockquote, BlockquoteBody, BlockquoteFooter };
