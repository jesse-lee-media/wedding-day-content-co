import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ArrowRight, ArrowUpRight, Menu, NavArrowDown, Xmark } from 'iconoir-react';

import { IconInstagram } from '@/lib/components/icons/instagram';
import { IconTikTok } from '@/lib/components/icons/tiktok';
import type { BaseProps } from '@/lib/types/base-props';
import { cn } from '@/lib/utils/cn';

const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  chevronDown: NavArrowDown,
  instagram: IconInstagram,
  menu: Menu,
  tikTok: IconTikTok,
  x: Xmark,
};

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface IconProps extends Omit<BaseProps, 'children'>, VariantProps<typeof iconVariants> {
  name: keyof typeof icons;
}

export function Icons({ className, name, size, ...rest }: IconProps) {
  const IconComponent = icons[name];

  return <IconComponent className={cn(iconVariants({ size }), className)} {...rest} />;
}
