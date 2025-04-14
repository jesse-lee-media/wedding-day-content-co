/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';

import type { PayloadImagesCollection } from '@/payload/payload-types';
import { cn } from '@/utils/cn';

export type PayloadImageProps = PayloadImagesCollection & {
  className?: string;
  outerClassName?: string;
};

const PayloadImage = ({
  alt,
  className,
  createdAt,
  dataUrl,
  displayOriginal,
  filename,
  filesize,
  focalX,
  focalY,
  height: propsHeight,
  mimeType,
  outerClassName,
  sizes,
  thumbnailURL,
  updatedAt,
  url,
  width: propsWidth,
  ...props
}: PayloadImageProps) => {
  const src = displayOriginal ? url : sizes?.preview?.url;
  const width = displayOriginal ? propsWidth : sizes?.preview?.width;
  const height = displayOriginal ? propsHeight : sizes?.preview?.height;

  if (!src || !width || !height) {
    return null;
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={dataUrl ?? undefined}
      alt={alt}
      className={cn('rounded-xs', className)}
      {...props}
    />
  );
};

export { PayloadImage };
