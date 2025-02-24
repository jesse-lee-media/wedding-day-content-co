import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/components/carousel';
import { PayloadImage } from '@/lib/components/payload-image';
import type { PayloadGalleryBlock, PayloadMediaCollection } from '@/payload/payload-types';

export function GalleryBlock({ images, type }: PayloadGalleryBlock) {
  if (!images?.length) {
    return null;
  }

  if (type === 'grid') {
    const columns: PayloadMediaCollection[][] = [[], [], []];

    images
      .filter((image) => typeof image !== 'string')
      .forEach((image, index) => columns[index % 3].push(image));

    return (
      <div className="my-6 flex flex-col gap-4 first:mt-0 last:mb-0 sm:flex-row">
        {columns.map((images, i) => (
          <div key={i} className="flex w-full flex-col gap-4">
            {images.map((image) => (
              <PayloadImage
                key={image.id}
                className="w-full rounded shadow-lg ring-2 shadow-black/10 ring-neutral-200"
                {...image}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Carousel className="overflow-x-padded my-6 first:mt-0 last:mb-0" opts={{ dragFree: true }}>
      <CarouselContent className="items-center py-2">
        {images
          .filter((image) => typeof image !== 'string')
          .map((image) => (
            <CarouselItem key={image.id} className="mi-auto sm:basis-1/2 md:basis-1/3">
              <PayloadImage
                {...image}
                className="overflow-clip rounded ring-2 ring-neutral-200 dark:ring-neutral-700"
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="flex justify-between py-4 md:py-0">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
