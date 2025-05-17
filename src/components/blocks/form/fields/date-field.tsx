import { useCallback, useMemo } from 'react';

import type { ControllerRenderProps } from 'react-hook-form';

import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { InputButton } from '@/components/ui/input';
import { OverflowText } from '@/components/ui/overflow-text';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { PayloadDateBlock } from '@/payload/payload-types';
import { formatDateShort } from '@/utils/format-date';

type Props = {
  meta: PayloadDateBlock;
  field: ControllerRenderProps;
};

export function DateField({ meta, field }: Props) {
  const value = useMemo<string | null>(() => {
    switch (meta.mode) {
      case 'single': {
        const value = field.value as Date | null;

        return formatDateShort(value) || null;
      }
      case 'multiple': {
        const value = field.value as Date[] | null;

        return value?.length ? value.map(formatDateShort).join(', ') : null;
      }
      case 'range': {
        const value = field.value as { from: Date | null; to?: Date | null } | null;

        if (!value?.from) {
          return null;
        }

        const from = formatDateShort(value.from);

        return value.to ? `${from} – ${formatDateShort(value.to)}` : from;
      }
      default:
        return null;
    }
  }, [meta.mode, field.value]);

  const disabled = useCallback(
    (date: Date) => {
      const todaysDate = new Date();

      switch (meta.allowedDates) {
        case 'previous':
          return date > todaysDate;
        case 'future':
          return date < todaysDate;
        default:
          return false;
      }
    },
    [meta.allowedDates],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <InputButton displayChildren={!!value} icon={value ? 'calendarCheck' : 'calendar'}>
            <OverflowText>{value}</OverflowText>
          </InputButton>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={meta.mode}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          selected={field.value}
          onSelect={field.onChange}
          disabled={disabled}
          numberOfMonths={1}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
