import { unstable_cache } from 'next/cache';
import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';

import { env } from '@/env/client';
import config from '@payload-config';

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const siteUrl = env.NEXT_PUBLIC_SERVER_URL;

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      pagination: false,
      select: {
        path: true,
        updatedAt: true,
      },
    });
    const docs = results?.docs || [];

    return docs
      .filter((page) => Boolean(page?.path))
      .map((page) => ({
        loc: page?.path === '/home' ? `${siteUrl}/` : `${siteUrl}${page?.path}`,
        lastmod: page.updatedAt || new Date().toISOString(),
      }));
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
);

export async function GET() {
  const sitemap = await getPagesSitemap();

  return getServerSideSitemap(sitemap);
}
