import { PayloadButtonLink } from '@/lib/components/Buttons';
import { PayloadButtonLinkBlock } from '@/lib/types/payload';

export default function ButtonLinkBlock(props: PayloadButtonLinkBlock) {
  return <PayloadButtonLink {...props} className="my-6 w-fit first:mt-0 last:mb-0" />;
}
