import { InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-14 w-full rounded-xl border border-black/75 bg-white px-5 text-lg text-black transition placeholder:text-black/75 hover:border-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/75 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-white/75 dark:hover:bg-white/5 dark:focus:ring-white/75',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
