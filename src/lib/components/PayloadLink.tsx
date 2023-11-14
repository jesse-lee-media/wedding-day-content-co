import Link from 'next/link';

import Icons from './Icons';
import { PayloadFieldLink } from '../types/payload';
import { cn, linkProps } from '../utils';

export type PayloadLinkProps = PayloadFieldLink & {
  className?: string;
};

export default function PayloadLink(props: PayloadLinkProps) {
  const { className, ...link } = props;

  const iconPositionClass = {
    left: 'flex-row',
    right: 'flex-row-reverse',
    center: 'flex-row',
  };

  return (
    <Link
      {...linkProps(link)}
      className={cn(
        'flex w-fit items-center gap-2 transition-all dark:hover:text-pink-200',
        iconPositionClass[link.iconPosition ?? 'center'],
        className,
      )}
    >
      {link.icon && <Icons name={link.icon} />}
      {link.text}
    </Link>
  );
}
