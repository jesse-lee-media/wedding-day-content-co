import { PayloadHeroSectionBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

import { Blocks } from '.';

export default function HeroSectionBlock(props: PayloadHeroSectionBlock) {
  const { heading, layout, maxWidth, sectionId } = props;

  return (
    <section className={classes('mx-auto w-full py-12', maxWidthClass[maxWidth])}>
      <h1 id={sectionId} className="mb-10 border-b-2 border-b-pink-800 pb-4 text-4xl xs:text-5xl sm:text-6xl">
        {heading}
      </h1>
      {layout?.map((block, i) => <Blocks key={i} {...block} />)}
    </section>
  );
}
