import { PayloadButtonLink } from '@/lib/components/payload-button-link';
import type { PayloadButtonLinkBlock } from '@/payload/payload-types';

export function ButtonLinkBlock({ id, ...props }: PayloadButtonLinkBlock) {
  return (
    <PayloadButtonLink id={id ?? undefined} className="my-6 first:mt-0 last:mb-0" {...props} />
  );
}
