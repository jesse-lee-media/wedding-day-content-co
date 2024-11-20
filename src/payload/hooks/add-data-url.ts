import type { CollectionAfterChangeHook } from 'payload';
import sharp from 'sharp';

import type { PayloadMediaCollection } from '@/payload/payload-types';

export const addDataUrl: CollectionAfterChangeHook<PayloadMediaCollection> = async ({
  context,
  doc,
  req,
}) => {
  if (!doc.url || context?.ignoreAfterChange) {
    return doc;
  }

  const image = await fetch(doc.url);
  const imageBuffer = await image.arrayBuffer();
  const sharpBuffer = await sharp(imageBuffer).resize(50).toBuffer();
  const dataUrl = `data:${doc.mimeType};base64,${sharpBuffer.toString('base64')}`;

  return req.payload.update({
    collection: 'media',
    id: doc.id,
    data: {
      dataUrl,
    },
    context: {
      ignoreAfterChange: true,
    },
    req,
  });
};
