import { classes } from '@/lib/utils/classes';

import Icon from './Icon';

export type TagProps = {
  children: React.ReactNode;
  className?: string;
  icon?: string;
  iconPosition?: 'left' | 'right' | 'none';
};

export default function Tag({ children, className, icon, iconPosition = 'none' }: TagProps) {
  const iconPositionClass = {
    left: 'pl-2 pr-3 flex-row',
    right: 'pl-3 pr-2 flex-row-reverse',
    none: 'px-3 flex-row',
  };

  return (
    <span
      className={classes(
        className,
        iconPositionClass[iconPosition],
        'flex h-7 w-fit items-center gap-1 rounded-full border-2 border-orange-200 border-opacity-80 bg-orange-100/80 text-xs font-semibold leading-none text-orange-900 backdrop-blur-md',
      )}
    >
      {icon && <Icon name={icon} className="text-base leading-none" />}
      {children}
    </span>
  );
}
