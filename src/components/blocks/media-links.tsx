import Link from 'next/link';

import { Icons } from '@/lib/components/icons';
import { OverflowText } from '@/lib/components/overflow-text';
import { PayloadMedia } from '@/lib/components/payload-media';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import { linkProps } from '@/lib/utils/link';
import type { PayloadMediaLinksBlock } from '@/payload/payload-types';

export function MediaLinksBlock({ cards }: PayloadMediaLinksBlock) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards
        ?.filter((card) => card.media.relationTo === 'images')
        .map(({ media: { relationTo, value }, link }) =>
          typeof value !== 'string' ? (
            <PolaroidImage asChild key={value.id}>
              <Link
                {...linkProps(link)}
                className="relative overflow-clip transition hover:scale-[1.01] hover:ring-neutral-500"
              >
                <PayloadMedia relationTo={relationTo} value={value} {...value} />
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
