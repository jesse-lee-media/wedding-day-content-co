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

interface OptimizeResponse {
  optimizedVideo: {
    filename: string;
    filesize: number;
    height: number;
    width: number;
    mimeType: string;
  };
  thumbnail: {
    filename: string;
    filesize: number;
    height: number;
    width: number;
    mimeType: string;
  };
}

const optimizedVideoCondition: Condition<PayloadVideosCollection> = (data) =>
  !!data?.optimizedVideo?.url;

const thumbnailCondition: Condition<PayloadVideosCollection> = (data) => !!data?.thumbnail?.url;

const optimizeVideo: CollectionAfterChangeHook<PayloadVideosCollection> = async ({
  context,
  doc,
  req,
}) => {
  const { payload } = req;

  if (!doc.filename || context?.ignoreAfterChange) {
    payload.logger.info(`Skipping optimizeVideo for document "${doc.id}"`);
    return doc;
  }

  const response = await fetch(`${env.VIDEO_OPTIMIZATION_SERVER_URL}/optimize`, {
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

  const { optimizedVideo, thumbnail } = (await response.json()) as OptimizeResponse;

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
      optimizedVideo: {
        url: `${env.SERVER_URL}/api/videos/file/${optimizedVideo.filename}`,
        filename: optimizedVideo.filename,
        filesize: optimizedVideo.filesize,
        height: optimizedVideo.height,
        width: optimizedVideo.width,
        mimeType: optimizedVideo.mimeType,
      },
    },
    context: {
      ignoreAfterChange: true,
    },
    req,
  });
};

const deleteOptimizedVideo: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { payload } = req;
  const doc = await payload.findByID({ collection: 'videos', id, req });
  const filenames = [doc.optimizedVideo?.filename, doc.thumbnail?.filename].filter(Boolean);

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
    afterChange: [optimizeVideo],
    beforeDelete: [deleteOptimizedVideo],
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
      name: 'optimizedVideo',
      type: 'group',
      admin: {
        readOnly: true,
        condition: optimizedVideoCondition,
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
      ],
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
