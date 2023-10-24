import Image from 'next/image';

import { PayloadImagesBlock, PayloadMedia } from '@/lib/types/payload';

function AppImage(props: PayloadMedia) {
  return (
    <Image
      src={props.sizes!.preview!.url!}
      blurDataURL={props.dataUrl}
      width={props.sizes!.preview!.width!}
      height={props.sizes!.preview!.height!}
      alt={props.alt!}
      placeholder="blur"
      className="w-full"
    />
  );
}

function Video(props: PayloadMedia) {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      aria-label={props.alt!}
      controls
      preload="none"
      poster={props.poster!.sizes!.preview!.url!}
      className="w-full"
    >
      <source src={props.url!} type={props.mimeType!} />
    </video>
  );
}

export default function ImagesBlock(props: PayloadImagesBlock) {
  const { images } = props;

  return (
    <ul className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md-lg:grid-cols-3">
      {images?.map((image, i) => (
        <li key={i} className="overflow-clip rounded-2xl">
          {image.mimeType?.startsWith('image') && <AppImage {...image} />}
          {image.mimeType?.startsWith('video') && <Video {...image} />}
        </li>
      ))}
    </ul>
  );
}
