'use client';

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

import { getClientSideUrl } from '@/payload/utils/get-client-side-url';

export const LivePreviewListener = () => {
  const router = useRouter();

  const onRefresh = () => router.refresh();

  return <RefreshRouteOnSave refresh={onRefresh} serverURL={getClientSideUrl()} />;
};
