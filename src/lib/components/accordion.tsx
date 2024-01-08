'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { NavArrowDown } from 'iconoir-react';

import { cn, slugify } from '../utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('group border-b border-black border-opacity-75 last:border-b-0 dark:border-white', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionHeader = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header ref={ref} className={cn('flex', className)} {...props} />
));
AccordionHeader.displayName = AccordionPrimitive.Header.displayName;

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    data-umami-event="Accordion trigger"
    data-umami-event-id={slugify(JSON.stringify(children))}
    className={cn(
      'flex flex-1 justify-between overflow-clip py-4 text-left text-xl font-normal hover:underline hover:underline-offset-8 focus:outline-white group-first:pt-0 [&[data-state=open]>svg]:rotate-180',
      className,
    )}
    {...props}
  >
    {children}
    <NavArrowDown className="shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0 group-last:pb-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
