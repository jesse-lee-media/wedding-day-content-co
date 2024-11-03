import { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

const baseClass =
  'h-14 w-full rounded shadow shadow-black/10 border-2 border-neutral-200 bg-white px-4 text-lg text-black transition placeholder:text-neutral-500 hover:border-neutral-600/75 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600/75 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const Input = ({ className, ...props }: ComponentProps<'input'>) => (
  <input className={cn(baseClass, className)} {...props} />
);

export type InputButtonProps = ComponentProps<'button'> & {
  displayChildren?: boolean;
  icon?: any;
  placeholder?: string;
};

const InputButton = ({
  children,
  className,
  displayChildren,
  icon,
  placeholder,
  ...props
}: InputButtonProps) => {
  const IconComponent = icon;

  return (
    <button
      className={cn(baseClass, 'group flex flex-row items-center', icon && 'pr-3', className)}
      {...props}
    >
      {placeholder && !displayChildren ? (
        <span className="text-neutral-500">{placeholder}</span>
      ) : null}
      {displayChildren ? children : null}
      <span className="flex-grow" />
      {IconComponent ? <IconComponent className="flex-shrink-0 text-neutral-500" /> : null}
    </button>
  );
};

export { Input, InputButton };
