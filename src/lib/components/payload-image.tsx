/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import { PayloadMedia } from '../types/payload';
import { cn } from '../utils';

export type PayloadImageProps = PayloadMedia & {
  className?: string;
};

export default function PayloadImage({ alt, className, dataUrl, sizes }: PayloadImageProps) {
  return (
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
}
