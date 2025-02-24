'use client';

import type { ComponentProps } from 'react';

import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { NavArrowDown } from 'iconoir-react';

import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

const Accordion = Root;

const AccordionItem = ({ className, ...props }: ComponentProps<typeof Item>) => (
  <Item
    className={cn('group border-b-2 border-black last:border-b-0 dark:border-white', className)}
    {...props}
  />
);

const AccordionHeader = ({ className, ...props }: ComponentProps<typeof Header>) => (
  <Header className={cn('flex', className)} {...props} />
);

const AccordionTrigger = ({ className, children, ...props }: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cn(
      '-mx-4 flex flex-1 justify-between overflow-clip rounded-sm p-4 text-left text-xl font-normal group-first:-mt-4 group-last:-mb-4 hover:underline hover:underline-offset-8 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-hidden dark:focus-visible:ring-white [&[data-state=open]>svg]:rotate-180',
      className,
    )}
    data-umami-event="Accordion trigger"
    data-umami-event-id={slugify(JSON.stringify(children))}
    {...props}
  >
    {children}
    <NavArrowDown className="shrink-0 transition-transform duration-200" />
  </Trigger>
);

const AccordionContent = ({ className, children, ...props }: ComponentProps<typeof Content>) => (
  <Content
    className={cn(
      'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 group-last:pt-4 dark:text-white/75">{children}</div>
  </Content>
);

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
