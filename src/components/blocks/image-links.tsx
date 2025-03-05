import Link from 'next/link';

import { Icons } from '@/lib/components/icons';
import { OverflowText } from '@/lib/components/overflow-text';
import { PayloadImage } from '@/lib/components/payload-image';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import { linkProps } from '@/lib/utils/link';
import type { PayloadImageLinksBlock } from '@/payload/payload-types';

export function ImageLinksBlock({ cards }: PayloadImageLinksBlock) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards?.map(({ image, link }) =>
        typeof image !== 'string' ? (
          <PolaroidImage asChild key={image.id}>
            <Link
              {...linkProps(link)}
              className="relative overflow-clip transition hover:scale-[1.01] hover:ring-neutral-500"
            >
              <PayloadImage {...image} />
              <div className="absolute right-0 bottom-0 left-0 flex h-16 flex-row items-center gap-2 px-6">
                <OverflowText className="min-w-0 flex-1 text-xl">{link.text}</OverflowText>
                <Icons name="arrowRight" size="lg" />
              </div>
            </Link>
          </PolaroidImage>
        ) : null,
      )}
    </div>
  );
}
