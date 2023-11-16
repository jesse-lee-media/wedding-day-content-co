import PayloadButtonLink from '@/lib/components/payload-button-link';
import { PayloadBlockButtonLink } from '@/lib/types/payload';

export default function BlockButtonLink(props: PayloadBlockButtonLink) {
  // @ts-expect-error – safe to delete
  delete props.blockType;

  return (
    <div className="my-6 first:mt-0 last:mb-0">
      <PayloadButtonLink {...props} />
    </div>
  );
}
