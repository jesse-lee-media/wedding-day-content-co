import Link from 'next/link';

import type { PayloadLinkGroupField } from '@/payload/payload-types';
import { linkProps } from '@/utils/link';

export type PayloadLinkProps = PayloadLinkGroupField & {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const PayloadLink = ({ children, className, onClick, ...link }: PayloadLinkProps) => (
  <Link {...linkProps(link)} onClick={onClick} className={className}>
    {link.text}
    {children}
  </Link>
);

export { PayloadLink };
