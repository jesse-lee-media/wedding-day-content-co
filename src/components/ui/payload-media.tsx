import { PayloadImage } from '@/components/ui/payload-image';
import type { PayloadImagesCollection } from '@/payload/payload-types';

type Props = {
  relationTo: 'images';
  value: string | PayloadImagesCollection;
  className?: string;
};

export function PayloadMedia({ className, relationTo, value }: Props) {
  if (typeof value === 'string' || relationTo !== 'images') {
    return null;
  }

  return <PayloadImage {...value} className={className} />;
}
