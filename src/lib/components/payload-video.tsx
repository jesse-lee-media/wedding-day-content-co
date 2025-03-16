'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import type { PayloadVideosCollection } from '@/payload/payload-types';

type Props = PayloadVideosCollection & {
  className?: string;
};

export function PayloadVideo({ alt, className, mimeType, optimizedVideo, thumbnail, url }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="aspect-3/4">
      <video
        ref={videoRef}
        controls={false}
        disableRemotePlayback
        disablePictureInPicture
        loop
        muted
        playsInline
        poster={thumbnail!.dataUrl!}
        height={optimizedVideo!.height!}
        width={optimizedVideo!.width!}
        // eslint-disable-next-line react/no-unknown-property
        x-webkit-airplay="deny"
        className={cn('h-full w-full object-cover', className)}
      >
        <source src={optimizedVideo!.url!} type={optimizedVideo!.mimeType || undefined} />
        <source src={url!} type={mimeType || undefined} />
        <Image
          src={thumbnail!.url!}
          alt={alt}
          width={thumbnail!.width!}
          height={thumbnail!.height!}
          placeholder="blur"
          blurDataURL={thumbnail!.dataUrl!}
          className={cn('h-full w-full object-cover', className)}
        />
      </video>
    </div>
  );
}
