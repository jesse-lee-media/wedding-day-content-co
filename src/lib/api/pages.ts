import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

import config from '@payload-config';

export const fetchPages = async () => {
  const payload = await getPayloadHMR({ config });
  const pages = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    pagination: false,
  });

  return pages.docs.map(({ slug }) => ({ slug }));
};

export const fetchPage = async (slug: string) => {
  const payload = await getPayloadHMR({ config });
  const page = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  });

  return page?.docs?.[0] || null;
};

export const fetchCachedPages = async () =>
  await unstable_cache(fetchPages, [], { tags: ['pages'] })();

export const fetchCachedPage = async (segments?: string[]) => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  return await unstable_cache(fetchPage, [slug], { tags: [`page_${slug}`] })(slug);
};
