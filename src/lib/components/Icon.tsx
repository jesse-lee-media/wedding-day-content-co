import { BaseProps } from '../types/base-props';
import { classes } from '../utils/classes';

export type IconProps = Omit<BaseProps, 'children'> & {
  name: string;
};

export default function Icon({ className, name, style }: IconProps) {
  return <i className={classes(className, `ti ti-${name} text-2xl leading-none`)} style={style}></i>;
}
