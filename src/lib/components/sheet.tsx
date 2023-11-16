'use client';

import { forwardRef } from 'react';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Xmark } from 'iconoir-react';
import Link from 'next/link';

import { cn } from '../utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-white/75 backdrop-blur-sm',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {}

const SheetContent = forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-y-0 right-0 z-50 h-full w-full max-w-xs gap-4 border-l border-black border-opacity-75 bg-white transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          className,
        )}
        {...props}
      >
        <div className="flex h-16 flex-row items-center justify-between pl-4 pr-2">
          <Link href="/">Wedding Day Content Co.</Link>
          <SheetPrimitive.Close asChild>
            <button
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/5 focus:outline-none focus:ring-[1.5px] focus:ring-black/75 dark:focus:ring-white/75"
            >
              <Xmark className="h-6 w-6" />
            </button>
          </SheetPrimitive.Close>
        </div>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent };
