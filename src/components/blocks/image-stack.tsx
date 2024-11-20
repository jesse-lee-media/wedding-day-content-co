import { PayloadImage } from '@/lib/components/payload-image';
import { PolaroidImage } from '@/lib/components/polaroid-image';
import type { PayloadImageStackBlock } from '@/payload/payload-types';

export function ImageStackBlock({ images }: PayloadImageStackBlock) {
  const filteredImages = images.filter((image) => typeof image !== 'string');

  if (filteredImages.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:!grid-cols-1 lg:!grid-cols-2">
      {filteredImages.map((image) => (
        <PolaroidImage
          key={image.id}
          className="first:z-10 first:lg:translate-x-4 first:lg:translate-y-1 first:lg:-rotate-3 last:lg:-translate-x-8 last:lg:-translate-y-2 last:lg:rotate-3"
        >
          <PayloadImage {...image} />
        </PolaroidImage>
      ))}
    </div>
  );
}
