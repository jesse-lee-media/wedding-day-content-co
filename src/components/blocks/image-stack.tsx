import { PayloadImage } from '@/lib/components/payload-image';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import type { PayloadImageStackBlock } from '@/payload/payload-types';

export function ImageStackBlock({ images }: PayloadImageStackBlock) {
  const filteredImages = images?.filter((image) => typeof image !== 'string');

  if (!filteredImages?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-1! lg:grid-cols-2!">
      {filteredImages.map((image) => (
        <PolaroidImage
          key={image.id}
          className="first:z-10 lg:first:translate-x-4 lg:first:translate-y-1 lg:first:-rotate-3 lg:last:-translate-x-8 lg:last:-translate-y-2 lg:last:rotate-3"
        >
          <PayloadImage {...image} />
        </PolaroidImage>
      ))}
    </div>
  );
}
