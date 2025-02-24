import { PayloadButtonLink } from '@/lib/components/payload-button-link';
import { PayloadImage } from '@/lib/components/payload-image';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import type { PayloadHeroBlock } from '@/payload/payload-types';

export function HeroBlock({ buttonLinks, description, heading, images }: PayloadHeroBlock) {
  return (
    <div className="md-lg:mb-16 md-lg:grid-cols-2 md-lg:gap-0 relative isolate grid grid-cols-1 gap-8 pb-12 lg:pb-16">
      <div className="z-10 flex flex-col gap-8">
        <h1 className="text-wrap-balance xxs:text-5xl text-4xl shadow-black/10 lg:text-7xl xl:text-8xl">
          {heading}
        </h1>
        <p className="text-wrap-balance text-2xl italic lg:text-3xl">{description}</p>
        <ul className="xs:flex-row flex flex-col items-center gap-4">
          {buttonLinks?.map(({ id, ...buttonLink }) => (
            <li key={id} className="xs:w-fit flex w-full">
              <PayloadButtonLink id={id ?? undefined} {...buttonLink} />
            </li>
          ))}
        </ul>
      </div>
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-4">
        {images
          ?.filter((image) => typeof image !== 'string')
          .map((image) => (
            <PolaroidImage
              key={image.id}
              className="first:md-lg:translate-x-12 first:md-lg:translate-y-16 first:md-lg:-rotate-3 last:md-lg:-translate-x-4 last:md-lg:rotate-3 z-10 h-fit first:z-20"
            >
              <PayloadImage {...image} className="rounded-sm" />
            </PolaroidImage>
          ))}
      </div>
    </div>
  );
}
