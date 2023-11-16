import Link from 'next/link';

import { PayloadFieldLink } from '../types/payload';
import { linkProps } from '../utils';

export type PayloadLinkProps = PayloadFieldLink & {
  className?: string;
};

export default function PayloadLink({ className, ...link }: PayloadLinkProps) {
  return (
    <Link {...linkProps(link)} className={className}>
      {link.text}
    </Link>
  );
}
