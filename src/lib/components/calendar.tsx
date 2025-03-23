'use client';

import type { ComponentProps } from 'react';

import { DayPicker } from 'react-day-picker';

import { Icons } from '@/lib/components/icons';
import { cn } from '@/lib/utils/cn';

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: ComponentProps<typeof DayPicker>) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn('p-2', className)}
    // prettier-ignore
    classNames={{
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      nav: 'space-x-1 flex items-center',
      nav_button: 'h-7 w-7 bg-transparent p-0 inline-flex transition items-center justify-center rounded-xs text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-600/75',
      nav_button_previous: 'absolute left-1',
      nav_button_next: 'absolute right-1',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell: 'text-neutral-600 rounded-xs w-9 font-normal text-sm',
      row: 'flex w-full mt-2',
      cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
      day: 'h-9 w-9 p-0 font-normal rounded-xs [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:hover:bg-neutral-200 [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:hover:text-black [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:hover:rounded-xs transition focus:ring-2 focus:ring-neutral-600/75 focus:outline-hidden',
      day_range_start: 'day-range-start rounded-l-xs rounded-r-none bg-dusty-rose-200 text-dusty-rose-950 hover:bg-dusty-rose-300 transition',
      day_range_end: 'day-range-end rounded-r-xs rounded-l-none bg-dusty-rose-200 text-dusty-rose-950 hover:bg-dusty-rose-300 transition',
      day_selected: 'font-medium! day-selected [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:rounded-xs [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:bg-dusty-rose-200 [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:text-dusty-rose-950 [&:not(.day-disabled,.day-range-start,.day-range-end,.day-range-middle)]:hover:bg-dusty-rose-300 transition',
      day_outside: 'day-outside font-light! text-neutral-600 aria-selected:bg-neutral-100 aria-selected:text-neutral-600 [&.day-range-start]:bg-dusty-rose-200 [&.day-range-start]:text-dusty-rose-950 [&.day-range-start]:hover:bg-dusty-rose-300 [&.day-range-end]:bg-dusty-rose-200 [&.day-range-end]:text-dusty-rose-950 [&.day-range-end]:hover:bg-dusty-rose-300 transition',
      day_disabled: 'day-disabled font-light! text-neutral-400',
      day_range_middle: 'day-range-middle rounded-none aria-selected:bg-dusty-rose-100 aria-selected:hover:bg-dusty-rose-200 aria-selected:text-dusty-rose-800 aria-selected:font-medium',
      day_hidden: 'invisible',
      ...classNames,
    }}
    components={{
      IconLeft: () => <Icons name="navArrowLeft" size="sm" />,
      IconRight: () => <Icons name="navArrowRight" size="sm" />,
    }}
    {...props}
  />
);

export { Calendar };
