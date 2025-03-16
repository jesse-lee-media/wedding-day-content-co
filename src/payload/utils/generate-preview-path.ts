import type { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  path: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, path, req }: Props) => {
  const params = { collection, path: `${collectionPrefixMap[collection]}${path}` };
  const encodedParams = new URLSearchParams();
  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const protocol = isProduction ? 'https:' : req.protocol;

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value);
  });

  return `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`;
};
