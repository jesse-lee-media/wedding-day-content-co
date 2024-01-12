import { ComponentProps, forwardRef } from 'react';

import Link from 'next/link';

import { Button } from './button';
import Icons from './icons';
import { PayloadFieldButtonLink } from '../types/payload';
import { linkProps } from '../utils';

const PayloadButtonLink = forwardRef<HTMLButtonElement, ComponentProps<typeof Button> & PayloadFieldButtonLink>(
  ({ link, icon, ...rest }, ref) => (
    <Button ref={ref} asChild {...rest}>
      <Link {...linkProps(link)}>
        {rest.iconPosition !== 'center' && link.text}
        {icon && <Icons name={icon} size={rest.size} />}
      </Link>
    </Button>
  ),
);
PayloadButtonLink.displayName = 'PayloadButtonLink';

export { PayloadButtonLink };
