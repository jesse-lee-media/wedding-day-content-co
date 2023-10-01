/* eslint-disable react/display-name */
'use client';

import { forwardRef } from 'react';

import * as Accordion from '@radix-ui/react-accordion';

import { classes } from '@/lib/utils/classes';

import Icon from './Icon';

export type AppAccordionProps = {
  className?: string;
  children?: React.ReactNode;
  id: string;
};

const AccordionItem = forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Accordion.Item
    {...props}
    className={classes(className, 'group/item focus:outline-none focus:ring-2 focus:ring-orange-300/80')}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Accordion.Trigger
    className={classes(
      className,
      'group grid w-full grid-cols-[1fr_1.25rem] gap-2 border-2 border-orange-200 border-opacity-80 bg-orange-100/80 p-4 text-left font-semibold text-pink-800 hover:bg-orange-100 hover:text-pink-900 focus:relative focus:outline-none focus:ring-2 focus:ring-orange-300/80 group-first/item:rounded-t-xl group-[&:not(:first-of-type)]/item:border-t-[1px] group-[&:not(:last-of-type)]/item:border-b-[1px] data-[state=closed]:group-last/item:rounded-b-xl data-[state=open]:group-last/item:!border-b-[1px]',
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
    <Icon name="plus" className="mt-[2px] text-xl transition-transform group-data-[state=open]:rotate-45" />
  </Accordion.Trigger>
));

const AccordionContent = forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Accordion.Content
    className={classes(
      className,
      'overflow-hidden border-x-2 border-y border-orange-200 border-opacity-80 p-4 group-last/item:rounded-b-xl group-last/item:border-b-2',
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export const AccordionRoot = ({ className, children, id }: AppAccordionProps) => {
  return (
    <Accordion.Root type="single" collapsible defaultValue={`${id}-0`} className={classes(className, 'rounded-2xl')}>
      {children}
    </Accordion.Root>
  );
};

const Root = AccordionRoot;
const Item = AccordionItem;
const Trigger = AccordionTrigger;
const Content = AccordionContent;

export { Root, Item, Trigger, Content };
