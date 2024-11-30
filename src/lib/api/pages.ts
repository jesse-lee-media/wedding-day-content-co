import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';

import config from '@payload-config';

export const fetchPages = async () => {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    pagination: false,
    overrideAccess: false,
  });

  return pages.docs.map(({ slug }) => ({ slug }));
};

export const fetchPage = async (slug: string) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return pages?.docs?.[0] || null;
};

export const fetchCachedPages = async () =>
  await unstable_cache(fetchPages, [], { tags: ['pages'] })();

export const fetchCachedPage = async (segments?: string[]) => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  return unstable_cache(fetchPage, [slug], { tags: [`page_${slug}`] })(slug);
};
