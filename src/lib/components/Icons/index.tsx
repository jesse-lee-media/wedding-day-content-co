import IconArrowRight from './IconArrowRight';
import IconArrowUpRight from './IconArrowUpRight';
import IconChevronDown from './IconChevronDown';
import IconInstagram from './IconInstagram';
import IconMenu from './IconMenu';
import IconTikTok from './IconTikTok';
import IconX from './IconX';
import { BaseProps } from '../../types/base-props';

export type IconProps = Omit<BaseProps, 'children'> & {
  name: string;
};

const icons = {
  'arrow-right': IconArrowRight,
  'arrow-up-right': IconArrowUpRight,
  instagram: IconInstagram,
  menu: IconMenu,
  'chevron-down': IconChevronDown,
  tiktok: IconTikTok,
  x: IconX,
};

export default function Icons(props: IconProps) {
  const { name, ...rest } = props;
  // @ts-expect-error valid
  const IconComponent = icons[name];

  return IconComponent && <IconComponent {...rest}></IconComponent>;
}
