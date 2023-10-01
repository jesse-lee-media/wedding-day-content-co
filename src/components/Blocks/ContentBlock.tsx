import { PayloadContentBlock } from '@/lib/types/payload';

import Serialize from '../Serialize';

export default function ContentBlock(props: PayloadContentBlock) {
  return <Serialize nodes={props.content as any} pMarginClass="my-4" />;
}
