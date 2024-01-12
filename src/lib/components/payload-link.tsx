import Link from 'next/link';

import { PayloadFieldLink } from '../types/payload';
import { linkProps } from '../utils';

export type PayloadLinkProps = PayloadFieldLink & {
  className?: string;
};

const PayloadLink = ({ className, ...link }: PayloadLinkProps) => (
  <Link {...linkProps(link)} className={className}>
    {link.text}
  </Link>
);

export { PayloadLink };
