import { notFound } from 'next/navigation';

import Serialize from '@/components/Serialize';
import Breadcrumbs from '@/lib/components/Breadcrumbs';
import { fetchPage, fetchPages } from '@/lib/graphql';
import { pageTitle } from '@/lib/utils';

import { metadata } from '../layout';

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();

    return pages.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {page.breadcrumbs.length > 1 && <Breadcrumbs breadcrumbs={page.breadcrumbs} />}
      {page.content?.root?.children && <Serialize nodes={page.content.root.children} />}
    </>
  );
}
