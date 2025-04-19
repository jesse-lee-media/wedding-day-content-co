'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import MuxPlayer from '@mux/mux-player-react';

import type { MuxVideo } from '@/payload/payload-types';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  onPlaying?: () => void;
  video: string | MuxVideo;
}

export default function PayloadMuxVideo({ className, onPlaying, video }: Props) {
  if (
    typeof video === 'string' ||
    !video?.playbackOptions?.length ||
    !video?.playbackOptions[0]?.playbackId ||
    !video?.playbackOptions[0]?.posterUrl
  ) {
    return null;
  }

  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const playerRefCallback = useCallback((element: MuxPlayerRefAttributes | null) => {
    videoElementRef.current = element?.media?.nativeEl ?? null;
  }, []);

  useEffect(() => {
    const currentVideoElement = videoElementRef.current;

    if (!currentVideoElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentVideoElement.play().catch((error) => {
              console.error('Video play failed:', error);
            });
          } else {
            currentVideoElement.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(currentVideoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <MuxPlayer
      ref={playerRefCallback}
      autoPlay="muted"
      disablePictureInPicture
      loop
      muted
      onPlaying={onPlaying}
      playbackId={video.playbackOptions[0].playbackId}
      poster={video.playbackOptions[0].posterUrl}
      className={cn('pointer-events-none', className)}
    />
  );
}
