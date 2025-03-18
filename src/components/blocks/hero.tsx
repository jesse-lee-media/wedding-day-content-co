import { PayloadButtonLink } from '@/lib/components/payload-button-link';
import { PayloadVideo } from '@/lib/components/payload-video';
import type { PayloadHeroBlock } from '@/payload/payload-types';

export function HeroBlock({ buttonLinks, description, heading, media }: PayloadHeroBlock) {
  return (
    <div className="-mt-30 overflow-hero flex h-svh flex-row items-center justify-center">
      {typeof media !== 'string' ? <PayloadVideo {...media} outer={false} /> : null}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute z-10 flex h-full flex-col items-center justify-center gap-12 px-4">
        <div className="flex flex-col items-center justify-center gap-1 text-center text-wrap-balance">
          <h1 className="text-5xl text-white shadow-black t-shadow-lg md:text-8xl">{heading}</h1>
          <p className="text-xl font-light text-wrap-balance text-white italic shadow-black t-shadow-md md:text-2xl">
            {description}
          </p>
        </div>
        <ul className="flex flex-col items-center gap-4 xs:flex-row">
          {buttonLinks?.map(({ id, ...buttonLink }) => (
            <li key={id} className="flex w-full xs:w-fit">
              <PayloadButtonLink
                id={id ?? undefined}
                {...buttonLink}
                className="border-t-neutral-50/50 border-b-neutral-100/50 bg-neutral-50/75 backdrop-blur-sm"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
