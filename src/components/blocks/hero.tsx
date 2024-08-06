import { PayloadButtonLink } from '@/lib/components/payload-button-link';
import { PayloadImage } from '@/lib/components/payload-image';
import { PayloadBlockHero } from '@/lib/types/payload';

export default function BlockHero({ buttonLinks, description, heading, images }: PayloadBlockHero) {
  return (
    <div className="grid grid-cols-1 gap-8 pb-12 md:mb-16 md:grid-cols-2 md:gap-0 lg:pb-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl text-wrap-balance xxs:text-5xl lg:text-7xl xl:text-8xl">
          {heading}
        </h1>
        <p className="text-xl text-wrap-balance lg:text-2xl">{description}</p>
        <ul className="flex flex-col items-center gap-4 xs:flex-row">
          {buttonLinks.map((buttonLink, i) => (
            <li key={i} className="flex w-full xs:w-fit">
              <PayloadButtonLink {...buttonLink} />
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
        {images.map((image, i) => (
          <PayloadImage
            key={i}
            {...image}
            className="rounded-2xl border border-black/75 shadow-lg first:z-10 first:md:translate-x-12 first:md:translate-y-16 first:md:-rotate-3 last:md:-translate-x-4 last:md:rotate-3"
          />
        ))}
      </div>
    </div>
  );
}
