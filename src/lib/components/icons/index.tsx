import type { ComponentProps, JSX } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { IconArrowLeft } from '@/lib/components/icons/arrow-left';
import { IconArrowRight } from '@/lib/components/icons/arrow-right';
import { IconArrowUpRight } from '@/lib/components/icons/arrow-up-right';
import { IconCalendar } from '@/lib/components/icons/calendar';
import { IconCalendarCheck } from '@/lib/components/icons/calendar-check';
import { IconCircle } from '@/lib/components/icons/circle';
import { IconInstagram } from '@/lib/components/icons/instagram';
import { IconMenu } from '@/lib/components/icons/menu';
import { IconNavArrowDown } from '@/lib/components/icons/nav-arrow-down';
import { IconNavArrowDownSmall } from '@/lib/components/icons/nav-arrow-down-small';
import { IconNavArrowLeft } from '@/lib/components/icons/nav-arrow-left';
import { IconNavArrowRight } from '@/lib/components/icons/nav-arrow-right';
import { IconNavArrowUp } from '@/lib/components/icons/nav-arrow-up';
import { IconQuoteSolid } from '@/lib/components/icons/quote-solid';
import { IconTikTok } from '@/lib/components/icons/tiktok';
import { IconXMark } from '@/lib/components/icons/x-mark';
import { cn } from '@/lib/utils/cn';
import type { PayloadIconField } from '@/payload/payload-types';

type IconName = NonNullable<PayloadIconField>;

type IconFunction = (props: ComponentProps<'svg'>) => JSX.Element;

const icons: Record<IconName, IconFunction> = {
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  arrowUpRight: IconArrowUpRight,
  calendar: IconCalendar,
  calendarCheck: IconCalendarCheck,
  chevronDown: IconNavArrowDown,
  circle: IconCircle,
  instagram: IconInstagram,
  menu: IconMenu,
  navArrowDown: IconNavArrowDown,
  navArrowDownSmall: IconNavArrowDownSmall,
  navArrowLeft: IconNavArrowLeft,
  navArrowRight: IconNavArrowRight,
  navArrowUp: IconNavArrowUp,
  quoteSolid: IconQuoteSolid,
  tikTok: IconTikTok,
  x: IconXMark,
};

const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props extends Omit<ComponentProps<'svg'>, 'children'>, VariantProps<typeof iconVariants> {
  name: IconName;
}

export function Icons({ className, name, size, ...rest }: Props) {
  const Icon = icons[name];

  return <Icon className={cn(iconVariants({ size }), className)} {...rest} />;
}
