import { PayloadImage } from '@/components/ui/payload-image';
import { PayloadVideo } from '@/components/ui/payload-video';
import type { PayloadImagesCollection, PayloadVideosCollection } from '@/payload/payload-types';

type Props = {
  relationTo: 'images' | 'videos';
  value: string | PayloadImagesCollection | PayloadVideosCollection;
  outerClassName?: string;
  className?: string;
};

export function PayloadMedia({ className, outerClassName, relationTo, value }: Props) {
  if (typeof value === 'string') {
    return null;
  }

  const Component = relationTo === 'images' ? PayloadImage : PayloadVideo;

  return <Component {...value} className={className} outerClassName={outerClassName} />;
}
