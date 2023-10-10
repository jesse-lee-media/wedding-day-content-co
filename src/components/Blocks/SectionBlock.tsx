import { PayloadSectionBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

import { Blocks } from '.';

export default function SectionBlock(props: PayloadSectionBlock) {
  const { layout, maxWidth, sectionId } = props;

  const isScrollSectionLast = !!(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (layout?.[layout?.length - 1]?.blockType === 'contentCards' && layout?.[layout?.length - 1]?.variant === 'scroll')
  );

  return (
    <section
      id={sectionId}
      className={classes(
        maxWidthClass[maxWidth],
        isScrollSectionLast ? 'mb-0 md:mb-4' : 'mb-8 md:mb-12',
        'mt-8 w-full mi-auto md:mt-12',
      )}
    >
      {layout?.map((block, i) => <Blocks key={i} {...block} />)}
    </section>
  );
}
