import Image from 'next/image';

import { PayloadMedia } from '../types/payload';
import { cn } from '../utils';

export type PayloadImageProps = PayloadMedia & {
  className?: string;
};

const PayloadImage = ({ alt, className, dataUrl, sizes }: PayloadImageProps) => (
  <Image
    src={sizes.preview.url}
    width={sizes.preview.width}
    height={sizes.preview.height}
    placeholder="blur"
    blurDataURL={dataUrl}
    alt={alt}
    className={cn('transition group-hover/image:scale-105 group-focus/image:scale-105', className)}
  />
);

export { PayloadImage };
