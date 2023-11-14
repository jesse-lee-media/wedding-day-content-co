import { PayloadButtonLink } from '@/lib/components/Buttons';
import { PayloadBlockButtonLink } from '@/lib/types/payload';

export default function BlockButtonLink(props: PayloadBlockButtonLink) {
  return <PayloadButtonLink {...props} className="my-6 first:mt-0 last:mb-0" />;
}
