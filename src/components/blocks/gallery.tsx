import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/components/carousel';
import { PayloadImage } from '@/lib/components/payload-image';
import { PayloadBlockGallery } from '@/lib/types/payload';

export default function BlockGallery({ images, type }: PayloadBlockGallery) {
  if (type === 'grid') {
    return (
      <ul className="my-6 grid grid-cols-1 gap-4 first:mt-0 last:mb-0 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, i) => (
          <li key={i}>
            <PayloadImage {...image} className="overflow-clip rounded-2xl border border-black/75" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Carousel className="my-6 overflow-x-padded first:mt-0 last:mb-0" opts={{ dragFree: true }}>
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem key={i} className="mi-auto sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <PayloadImage {...image} className="overflow-clip rounded-2xl border border-black/75" />
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
