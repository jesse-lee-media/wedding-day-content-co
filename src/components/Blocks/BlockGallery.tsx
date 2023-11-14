import PayloadImage from '@/lib/components/PayloadImage';
import { PayloadBlockGallery } from '@/lib/types/payload';

export default function BlockGallery({ images }: PayloadBlockGallery) {
  return (
    <ul className="my-6 grid grid-cols-1 gap-4 first:mt-0 last:mb-0 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, i) => (
        <li key={i}>
          <PayloadImage {...image} className="overflow-clip rounded-2xl border border-black border-opacity-75" />
        </li>
      ))}
    </ul>
  );
}
