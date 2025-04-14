import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PayloadMedia } from '@/components/ui/payload-media';
import type { StripString } from '@/lib/types/strip-string';
import { isRelationshipPopulated } from '@/lib/utils/is-relationship-populated';
import type { PayloadGalleryBlock } from '@/payload/payload-types';

type FilteredMedia = StripString<PayloadGalleryBlock['media'][number]>;

export function GalleryBlock({ media, type }: PayloadGalleryBlock) {
  const filteredMedia = media?.filter((item) => isRelationshipPopulated<FilteredMedia>(item));

  if (!filteredMedia?.length) {
    return null;
  }

  if (type === 'grid') {
    const columns: FilteredMedia[][] = [[], [], []];

    filteredMedia.forEach((item, index) => {
      columns[index % 3].push(item);
    });

    return (
      <div className="my-6 flex flex-col gap-4 first:mt-0 last:mb-0 sm:flex-row">
        {columns.map((items, i) => (
          <div key={i} className="flex w-full flex-col gap-4">
            {items.map(({ relationTo, value }) => (
              <PayloadMedia
                key={value.id}
                relationTo={relationTo}
                value={value}
                className="w-full rounded-sm shadow-lg ring-2 shadow-black/10 ring-neutral-200"
                outerClassName="aspect-3/4"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Carousel className="my-6 overflow-x-padded first:mt-0 last:mb-0" opts={{ dragFree: true }}>
      <CarouselContent className="items-center py-2">
        {filteredMedia?.map(({ relationTo, value }) => (
          <CarouselItem key={value.id} className="mi-auto sm:basis-1/2 md:basis-1/3">
            <PayloadMedia
              relationTo={relationTo}
              value={value}
              className="overflow-clip rounded-sm ring-2 ring-neutral-200 dark:ring-neutral-700"
              outerClassName="aspect-3/4"
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
