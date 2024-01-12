import { PayloadImage } from '@/lib/components/payload-image';
import { PayloadBlockImageStack } from '@/lib/types/payload';

export default function BlockImageStack({ images }: PayloadBlockImageStack) {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:!grid-cols-1 lg:!grid-cols-2">
      {images.map((image, i) => (
        <PayloadImage
          key={i}
          {...image}
          className="rounded-2xl border border-black/75 first:z-10 lg:shadow-lg first:lg:translate-x-4 first:lg:translate-y-1 first:lg:-rotate-3 last:lg:-translate-x-8 last:lg:-translate-y-2 last:lg:rotate-3"
        />
      ))}
    </div>
  );
}
