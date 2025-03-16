import type { ComponentProps } from 'react';

import Link from 'next/link';

import { Button } from '@/lib/components/button';
import { Icons } from '@/lib/components/icons';
import { linkProps } from '@/lib/utils/link';
import type { PayloadButtonLinkGroupField } from '@/payload/payload-types';

export type PayloadButtonLinkProps = ComponentProps<typeof Button> & PayloadButtonLinkGroupField;

const PayloadButtonLink = ({
  link,
  icon,
  iconPosition,
  size,
  ...props
}: PayloadButtonLinkProps) => (
  <Button asChild iconPosition={iconPosition} size={size} {...props}>
    <Link {...linkProps(link)}>
      {iconPosition !== 'center' ? link.text : null}
      {icon && <Icons name={icon} size={size} />}
    </Link>
  </Button>
);

export { PayloadButtonLink };
