import { PayloadButtonLink } from '@/lib/components/Buttons';
import { PayloadButtonLinkBlock } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

export default function ButtonLinkBlock(props: PayloadButtonLinkBlock) {
  return <PayloadButtonLink {...props} className={classes(props.margin ? 'my-6 first:mt-0 last:mb-0' : '', 'w-fit')} />;
}
