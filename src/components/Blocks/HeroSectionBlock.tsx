import { PayloadHeroSectionBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

import { Blocks } from '.';

export default function HeroSectionBlock(props: PayloadHeroSectionBlock) {
  const { heading, layout, maxWidth, sectionId } = props;

  const isScrollSectionFirst = !!(layout?.[0]?.blockType === 'contentCards' && layout?.[0]?.variant === 'scroll');
  const isScrollSectionLast = !!(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (layout?.[layout?.length - 1]?.blockType === 'contentCards' && layout?.[layout?.length - 1]?.variant === 'scroll')
  );

  return (
    <section
      className={classes(maxWidthClass[maxWidth], isScrollSectionLast ? 'pb-4' : 'pb-12', 'w-full pt-12 mi-auto')}
    >
      <h1
        id={sectionId}
        className={classes(
          isScrollSectionFirst ? 'mb-9' : 'mb-10',
          'border-b-2 border-b-pink-800 pb-4 text-4xl xs:text-5xl sm:text-6xl',
        )}
      >
        {heading}
      </h1>
      {layout?.map((block, i) => <Blocks key={i} {...block} />)}
    </section>
  );
}
