import { ArrowRight, ArrowUpRight, Menu, NavArrowDown, Xmark } from 'iconoir-react';

import { cn } from '@/lib/utils';

import IconInstagram from './IconInstagram';
import IconTikTok from './IconTikTok';
import { BaseProps } from '../../types/base-props';

const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  chevronDown: NavArrowDown,
  instagram: IconInstagram,
  menu: Menu,
  tikTok: IconTikTok,
  x: Xmark,
};

export type IconProps = Omit<BaseProps, 'children'> & {
  name: keyof typeof icons;
  size?: 'sm' | 'md' | 'lg';
};

export default function Icons(props: IconProps) {
  const { className, name, size = 'md', ...rest } = props;
  const iconClass = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const IconComponent = icons[name];

  return IconComponent && <IconComponent {...rest} className={cn(iconClass[size], className)} />;
}
