import { PayloadBlockSection } from '@/lib/types/payload';
import { slugify } from '@/lib/utils';

import Serialize from '../serialize';

export default function BlockSection({
  heading,
  columns,
  content,
  contentColumnOne,
  contentColumnTwo,
}: PayloadBlockSection) {
  return (
    <section className="border-t border-black border-opacity-75 py-12 first:border-t-0 first:pt-0 last:pb-0">
      <h1 id={slugify(heading)} className="mb-8 text-4xl xs:text-5xl">
        {heading}
      </h1>
      {columns === '1' && content?.root?.children && <Serialize nodes={content.root.children} />}
      {columns === '2' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          {contentColumnOne?.root?.children && (
            <div>
              <Serialize nodes={contentColumnOne.root.children} />
            </div>
          )}
          {contentColumnTwo?.root?.children && (
            <div>
              <Serialize nodes={contentColumnTwo.root.children} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
