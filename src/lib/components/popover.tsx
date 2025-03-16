'use client';

import type { ComponentProps } from 'react';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';

import { cn } from '@/lib/utils/cn';

const Popover = Root;

const PopoverTrigger = Trigger;

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-sm border-2 border-neutral-200 bg-white p-2 text-black shadow-lg shadow-black/10 outline-hidden transition hover:border-neutral-600/75 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  </Portal>
);

export { Popover, PopoverTrigger, PopoverContent };
