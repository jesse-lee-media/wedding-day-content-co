/* eslint-disable jsx-a11y/alt-text */
import PrimitiveImage from 'next/image';
import Link from 'next/link';

import { PayloadMedia } from '../types/payload';
import { cn, linkProps } from '../utils';

export type PayloadImageProps = PayloadMedia & {
  className?: string;
};

export type ImageProps = Omit<PayloadMedia, 'hasLink' | 'link'> & {
  className?: string;
};

const Image = ({ alt, className, dataUrl, sizes }: ImageProps) => (
  <PrimitiveImage
    src={sizes.preview.url}
    width={sizes.preview.width}
    height={sizes.preview.height}
    placeholder="blur"
    blurDataURL={dataUrl}
    alt={alt}
    className={cn('transition-all group-hover/image:scale-105 group-focus/image:scale-105', className)}
  />
);

export default function PayloadImage(props: PayloadImageProps) {
  const { hasLink, link, className, ...rest } = props;

  return hasLink && link ? (
    <Link {...linkProps(link)} className={cn('group/image block', className)}>
      <Image {...rest} />
    </Link>
  ) : (
    <Image {...rest} className={className} />
  );
}
