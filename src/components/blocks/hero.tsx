import { PayloadButtonLink } from '@/lib/components/payload-button-link';
import { PayloadMedia } from '@/lib/components/payload-media';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import type { PayloadHeroBlock } from '@/payload/payload-types';

export function HeroBlock({ buttonLinks, description, heading, media }: PayloadHeroBlock) {
  return (
    <div className="relative isolate grid grid-cols-1 gap-8 pb-12 md-lg:mb-16 md-lg:grid-cols-2 md-lg:gap-0 lg:pb-16">
      <div className="z-10 flex flex-col gap-8">
        <h1 className="text-4xl text-wrap-balance shadow-black/10 xxs:text-5xl lg:text-7xl xl:text-8xl">
          {heading}
        </h1>
        <p className="text-2xl text-wrap-balance italic lg:text-3xl">{description}</p>
        <ul className="flex flex-col items-center gap-4 xs:flex-row">
          {buttonLinks?.map(({ id, ...buttonLink }) => (
            <li key={id} className="flex w-full xs:w-fit">
              <PayloadButtonLink id={id ?? undefined} {...buttonLink} />
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
        {media?.map(({ relationTo, value }) =>
          typeof value !== 'string' ? (
            <PolaroidImage
              key={value.id}
              className="z-10 h-fit first:z-20 md-lg:first:translate-x-12 md-lg:first:translate-y-16 md-lg:first:-rotate-3 md-lg:last:-translate-x-4 md-lg:last:rotate-3"
            >
              <PayloadMedia relationTo={relationTo} value={value} className="rounded-xs" />
            </PolaroidImage>
          ) : null,
        )}
      </div>
    </div>
  );
}
