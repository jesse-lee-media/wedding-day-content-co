import { PayloadSectionBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

import { Blocks } from '.';

export default function SectionBlock(props: PayloadSectionBlock) {
  const { layout, maxWidth, sectionId } = props;

  return (
    <section id={sectionId} className={classes(maxWidthClass[maxWidth], 'mx-auto my-8 w-full md:my-12')}>
      {layout?.map((block, i) => <Blocks key={i} {...block} />)}
    </section>
  );
}
