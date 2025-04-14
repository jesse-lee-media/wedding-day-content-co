import Link from 'next/link';

import { OverflowText } from '@/components/ui/overflow-text';
import { PayloadMedia } from '@/components/ui/payload-media';
import { PolaroidImage } from '@/components/ui/polaroid-image';
import { Icons } from '@/icons';
import type { PayloadMediaLinksBlock } from '@/payload/payload-types';
import { linkProps } from '@/utils/link';

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
                <PayloadMedia
                  relationTo={relationTo}
                  value={value}
                  outerClassName="aspect-3/4"
                  {...value}
                />
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
