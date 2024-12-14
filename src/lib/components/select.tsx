'use client';

import type { ComponentProps } from 'react';

import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { Circle, NavArrowDown, NavArrowUp } from 'iconoir-react';

import { OverflowText } from '@/lib/components/overflow-text';
import { cn } from '@/lib/utils/cn';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

const SelectTrigger = ({ className, children, ...props }: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cn(
      'flex h-14 w-full items-center justify-between rounded border-2 border-neutral-200 bg-white pl-4 pr-3 text-lg shadow shadow-black/10 transition placeholder:text-neutral-500 hover:border-neutral-600/75 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600/75 focus-visible:ring-offset-2 focus-visible:ring-offset-white [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <NavArrowDown className="flex-shrink-0 text-neutral-500" />
    </Icon>
  </Trigger>
);

const SelectScrollUpButton = ({ className, ...props }: ComponentProps<typeof ScrollUpButton>) => (
  <ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <NavArrowUp className="size-4 flex-shrink-0 text-neutral-500" />
  </ScrollUpButton>
);

const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollDownButton>) => (
  <ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <NavArrowDown className="size-4 flex-shrink-0 text-neutral-500" />
  </ScrollDownButton>
);

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border-2 border-neutral-200 bg-white text-black shadow-lg shadow-black/10 transition hover:border-neutral-600/75 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'w-full min-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <Viewport
        className={cn(
          'flex flex-col gap-1 p-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)]',
        )}
      >
        {children}
      </Viewport>
    </Content>
  </Portal>
);

const SelectLabel = ({ className, ...props }: ComponentProps<typeof Label>) => (
  <Label className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />
);

const SelectItem = ({ className, children, ...props }: ComponentProps<typeof Item>) => (
  <Item
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-3 py-2 text-lg text-neutral-800 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:text-black data-[disabled]:pointer-events-none data-[state=checked]:bg-dusty-rose-50 data-[state=checked]:text-dusty-rose-800 data-[disabled]:opacity-50 data-[state=checked]:hover:bg-dusty-rose-100 data-[state=checked]:focus-visible:bg-dusty-rose-100',
      className,
    )}
    {...props}
  >
    <OverflowText>
      <ItemText>{children}</ItemText>
    </OverflowText>
    <ItemIndicator asChild>
      <Circle className="size-2 flex-shrink-0 fill-current text-dusty-rose-700" />
    </ItemIndicator>
  </Item>
);

const SelectSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => (
  <Separator className={cn('-mx-1 my-1 h-px bg-neutral-200', className)} {...props} />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
