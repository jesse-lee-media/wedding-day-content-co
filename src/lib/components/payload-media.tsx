import { PayloadImage } from '@/lib/components/payload-image';
import { PayloadVideo } from '@/lib/components/payload-video';
import type { PayloadImagesCollection, PayloadVideosCollection } from '@/payload/payload-types';

type Props = {
  relationTo: 'images' | 'videos';
  value: string | PayloadImagesCollection | PayloadVideosCollection;
  className?: string;
};

export function PayloadMedia({ className, relationTo, value }: Props) {
  if (typeof value === 'string') {
    return null;
  }

  const Component = relationTo === 'images' ? PayloadImage : PayloadVideo;

  return <Component {...value} className={className} />;
}
