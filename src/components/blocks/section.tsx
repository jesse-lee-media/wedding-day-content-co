import { Serialize } from '@/components/serialize';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';
import type { PayloadSectionBlock } from '@/payload/payload-types';

export function SectionBlock({
  background,
  columns,
  content,
  contentColumnOne,
  contentColumnTwo,
  heading,
}: PayloadSectionBlock) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden py-16 overflow-section',
        background === 'dark' && 'dark bg-black text-white shadow-lg shadow-black/10',
      )}
    >
      <h1
        id={slugify(heading)}
        data-background={background}
        className="mb-8 text-4xl shadow-black/10 text-shadow-lg data-[background='dark']:shadow-white/15 xs:text-5xl"
      >
        {heading}
      </h1>
      {columns === '1' && content?.root?.children ? (
        <Serialize nodes={content.root.children} />
      ) : null}
      {columns === '2' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          {contentColumnOne?.root?.children ? (
            <div>
              <Serialize nodes={contentColumnOne.root.children} />
            </div>
          ) : null}
          {contentColumnTwo?.root?.children ? (
            <div>
              <Serialize nodes={contentColumnTwo.root.children} />
            </div>
          ) : null}
        </div>
      )}
      {/* {background === 'dark' ? (
        <>
          <div className="absolute -left-8 top-64 -z-10 h-64 w-96 rotate-45 rounded-full bg-neutral-300/10 blur-3xl"></div>
          <div className="absolute right-72 top-0 -z-10 h-64 w-56 rotate-45 rounded-full bg-neutral-400/10 blur-3xl"></div>
        </>
      ) : null} */}
    </section>
  );
}
