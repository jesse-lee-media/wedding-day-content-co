import type {
  CollectionAfterChangeHook,
  CollectionBeforeDeleteHook,
  CollectionConfig,
  Condition,
} from 'payload';

import { env } from '@/env/server';
import { Role, hasRole } from '@/payload/access';
import type { PayloadVideosCollection } from '@/payload/payload-types';
import { createDataUrl } from '@/payload/utils/create-data-url';

interface ThumbnailResponse {
  filename: string;
  filesize: number;
  height: number;
  width: number;
  mimeType: string;
}

const thumbnailCondition: Condition<PayloadVideosCollection> = (data) => !!data?.thumbnail?.url;

const generateThumbnail: CollectionAfterChangeHook<PayloadVideosCollection> = async ({
  context,
  doc,
  req,
}) => {
  const { payload } = req;

  if (!doc.filename || context?.ignoreGenerateThumbnail) {
    payload.logger.info(`Skipping generateThumbnail for document "${doc.id}"`);
    return doc;
  }

  const response = await fetch(`${env.VIDEO_OPTIMIZATION_SERVER_URL}/thumbnail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `API-Key ${env.VIDEO_OPTIMIZATION_API_KEY}`,
    },
    body: JSON.stringify({
      filename: doc.filename,
    }),
  });

  if (!response.ok) {
    const message = `Failed to optimize video: ${response.statusText}: ${response.status}`;

    payload.logger.error(message);
    throw new Error(message);
  }

  const thumbnail = (await response.json()) as ThumbnailResponse;
  const dataUrl = await createDataUrl(`${env.SERVER_URL}/api/images/file/${thumbnail.filename}`);

  return payload.update({
    collection: 'videos',
    id: doc.id,
    data: {
      thumbnail: {
        url: `${env.SERVER_URL}/api/images/file/${thumbnail.filename}`,
        filename: thumbnail.filename,
        filesize: thumbnail.filesize,
        height: thumbnail.height,
        width: thumbnail.width,
        mimeType: thumbnail.mimeType,
        dataUrl,
      },
    },
    context: {
      ignoreGenerateThumbnail: true,
    },
    req,
  });
};

const deleteGeneratedThumbnail: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { payload } = req;
  const doc = await payload.findByID({ collection: 'videos', id, req });
  const filenames = [doc.thumbnail?.filename].filter(Boolean);

  if (!filenames.length) {
    payload.logger.info(`Skipping deleteOptimizedVideo for document "${id}"`);
    return;
  }

  const response = await fetch(`${env.VIDEO_OPTIMIZATION_SERVER_URL}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `API-Key ${env.VIDEO_OPTIMIZATION_API_KEY}`,
    },
    body: JSON.stringify({
      filenames,
    }),
  });

  if (!response.ok) {
    const message = `Failed to delete optimized video: ${response.statusText}: ${response.status}`;

    payload.logger.error(message);
    throw new Error(message);
  }

  return;
};

export const Videos: CollectionConfig<'videos'> = {
  slug: 'videos',
  typescript: {
    interface: 'PayloadVideosCollection',
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin),
  },
  hooks: {
    afterChange: [generateThumbnail],
    beforeDelete: [deleteGeneratedThumbnail],
  },
  upload: {
    // @ts-expect-error – valid path
    adminThumbnail: ({ doc }) => doc.thumbnail?.url,
    mimeTypes: ['video/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'group',
      admin: {
        readOnly: true,
        condition: thumbnailCondition,
      },
      fields: [
        {
          name: 'url',
          label: 'URL',
          type: 'text',
        },
        {
          name: 'filename',
          label: 'Filename',
          type: 'text',
        },
        {
          name: 'filesize',
          label: 'Filesize',
          type: 'number',
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number',
        },
        {
          name: 'width',
          label: 'Width',
          type: 'number',
        },
        {
          name: 'mimeType',
          label: 'Mime Type',
          type: 'text',
        },
        {
          name: 'dataUrl',
          label: 'Data URL',
          type: 'text',
          maxLength: 1_000_000,
        },
      ],
    },
  ],
};
