import { cn } from '@/lib/utils';

import IconArrowRight from './IconArrowRight';
import IconArrowUpRight from './IconArrowUpRight';
import IconChevronDown from './IconChevronDown';
import IconInstagram from './IconInstagram';
import IconMenu from './IconMenu';
import IconTikTok from './IconTikTok';
import IconX from './IconX';
import { BaseProps } from '../../types/base-props';

const icons = {
  arrowRight: IconArrowRight,
  arrowUpRight: IconArrowUpRight,
  instagram: IconInstagram,
  menu: IconMenu,
  chevronDown: IconChevronDown,
  tikTok: IconTikTok,
  x: IconX,
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
