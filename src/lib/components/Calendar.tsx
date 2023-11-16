'use client';

import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn('p-4', className)}
    classNames={{
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption: 'flex justify-center relative items-center',
      caption_label: 'text-sm font-medium',
      nav: 'flex h-7 items-center',
      nav_button: cn(
        'h-7 w-7 inline-flex items-center rounded-md hover:bg-black/5 justify-center bg-transparent p-0 transition opacity-50 hover:opacity-100 focus:opacity-100',
      ),
      nav_button_previous: 'absolute left-0',
      nav_button_next: 'absolute right-0',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell: 'text-black/75 rounded-md w-9 font-medium text-xs',
      row: 'flex w-full mt-2',
      cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
      day: 'h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:[&:not(.day-range-start,.day-range-end,.day-range-middle)]:rounded-md hover:[&:not(.day-range-start,.day-range-end,.day-range-middle)]:bg-black/5',
      day_range_start: 'day-range-start rounded-l-md',
      day_range_end: 'day-range-end rounded-r-md',
      day_selected: 'day-selected bg-black text-white hover:!opacity-75',
      day_today: 'bg-pink-100 rounded-full text-black/75 !opacity-100',
      day_outside:
        'day-outside text-black/50 aria-selected:bg-black/25 aria-selected:text-black/75 aria-selected:opacity-75 hover:!opacity-50',
      day_disabled: 'text-black/50 !font-light',
      day_range_middle: 'day-range-middle aria-selected:bg-black/10 aria-selected:text-black',
      day_hidden: 'invisible',
      ...classNames,
    }}
    components={{
      IconLeft: () => <NavArrowLeft className="h-4 w-4" />,
      IconRight: () => <NavArrowRight className="h-4 w-4" />,
    }}
    {...props}
  />
);
Calendar.displayName = 'Calendar';

export { Calendar };
