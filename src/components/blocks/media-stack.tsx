import { PayloadMedia } from '@/lib/components/payload-media';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import type { StripString } from '@/lib/types/strip-string';
import { isRelationshipPopulated } from '@/lib/utils/is-relationship-populated';
import type { PayloadMediaStackBlock } from '@/payload/payload-types';

type FilteredMedia = StripString<PayloadMediaStackBlock['media'][number]>;

export function MediaStackBlock({ media }: PayloadMediaStackBlock) {
  const filteredMedia = media?.filter((item) => isRelationshipPopulated<FilteredMedia>(item));

  if (!filteredMedia?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-1! lg:grid-cols-2!">
      {filteredMedia.map(({ relationTo, value }) => (
        <PolaroidImage
          key={value.id}
          className="first:z-10 lg:first:translate-x-4 lg:first:translate-y-1 lg:first:-rotate-3 lg:last:-translate-x-8 lg:last:-translate-y-2 lg:last:rotate-3"
        >
          <PayloadMedia relationTo={relationTo} value={value} outerClassName="aspect-3/4" />
        </PolaroidImage>
      ))}
    </div>
  );
}
