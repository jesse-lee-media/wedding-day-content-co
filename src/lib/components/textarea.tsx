import { TextareaHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    rows={4}
    className={cn(
      'w-full rounded-xl border border-black/75 bg-white p-5 text-lg text-black transition form-sizing-content placeholder:text-black/75 hover:border-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/75 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-white/75 dark:hover:bg-white/5 dark:focus:ring-white/75',
      className,
    )}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
