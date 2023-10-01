import { notFound } from 'next/navigation';

import { Blocks } from '@/components/Blocks';
import { fetchPage } from '@/lib/api';
import { fetchPages } from '@/lib/graphql';

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
    title: page?.meta?.title || 'Jesse Lee Media',
    description:
      page?.meta?.description ||
      'Content creator for events, weddings, brands, and everything in between—your moments, our artistry!',
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  if (!page) {
    notFound();
  }

  return page.content?.layout?.map((block, i) => <Blocks key={i} {...block} />);
}
