import Link from 'next/link';

import { Button } from './button';
import Icons from './icons';
import { PayloadFieldButtonLink } from '../types/payload';
import { linkProps } from '../utils';

export type PayloadButtonLinkProps = PayloadFieldButtonLink & {
  className?: string;
};

export default function PayloadButtonLink({ link, ...rest }: PayloadButtonLinkProps) {
  return (
    <Button asChild {...rest}>
      <Link {...linkProps(link)}>
        {rest.iconPosition !== 'center' && link.text}
        {rest.icon && <Icons name={rest.icon} size={rest.size} />}
      </Link>
    </Button>
  );
}
