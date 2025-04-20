'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { PayloadImage } from '@/components/ui/payload-image';
import type { MuxVideo, PayloadImagesCollection } from '@/payload/payload-types';
import { cn } from '@/utils/cn';

const PayloadMuxVideo = dynamic(() => import('@/components/ui/payload-mux-video'), { ssr: false });

interface Props {
  video: string | MuxVideo;
  videoPoster: string | PayloadImagesCollection;
}

export function PayloadVideo({ video, videoPoster }: Props) {
  const [displayPoster, setDisplayPoster] = useState(true);

  const handleOnPlaying = () => setDisplayPoster(false);

  return (
    <>
      {typeof videoPoster === 'string' ? null : (
        <PayloadImage
          {...videoPoster}
          hasLink={false}
          className={cn('absolute h-full object-cover', displayPoster ? 'block' : 'hidden')}
        />
      )}
      <PayloadMuxVideo
        video={video}
        onPlaying={handleOnPlaying}
        className={cn('h-full', displayPoster ? 'hidden' : 'block')}
      />
    </>
  );
}
