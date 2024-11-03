import { notFound } from 'next/navigation';

import { metadata } from '@/app/(site)/layout';
import { Serialize } from '@/components/serialize';
import { fetchCachedPage, fetchCachedPages } from '@/lib/api/pages';
import { Breadcrumbs } from '@/lib/components/breadcrumbs';
import { pageTitle } from '@/lib/utils/page-title';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  try {
    const pages = await fetchCachedPages();

    return pages.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const slug = await params.then(({ slug }) => slug);
  const page = await fetchCachedPage(slug);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page({ params }: PageProps) {
  const slug = await params.then(({ slug }) => slug);
  const page = await fetchCachedPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {page.slug !== 'home' && <Breadcrumbs breadcrumbs={page.breadcrumbs} />}
      {page.content?.root?.children ? <Serialize nodes={page.content.root.children} /> : null}
    </>
  );
}
