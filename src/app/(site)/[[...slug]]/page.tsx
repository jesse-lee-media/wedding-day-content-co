import { cache } from 'react';

import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import { metadata } from '@/app/(site)/layout';
import { LivePreviewListener } from '@/components/live-preview-listener';
import { RichText } from '@/components/rich-text';
import { Breadcrumbs } from '@/lib/components/breadcrumbs';
import { pageTitle } from '@/lib/utils/page-title';
import config from '@payload-config';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const queryPage = cache(async ({ slug: segments }: { slug: string[] }) => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  const draftModePromis = draftMode();
  const payloadPromise = getPayload({ config });

  const [{ isEnabled: draft }, payload] = await Promise.all([draftModePromis, payloadPromise]);

  const result = await payload.find({
    collection: 'pages',
    draft,
    pagination: false,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      pagination: false,
      overrideAccess: false,
      select: {
        slug: true,
      },
    });

    return pages.docs.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await queryPage({ slug });

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await queryPage({ slug });

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      <LivePreviewListener />
      {page.slug !== 'home' && <Breadcrumbs breadcrumbs={page.breadcrumbs} />}
      <RichText data={page.content} />
    </main>
  );
}
