import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import InquiryFormLoading from '@/components/InquiryForm/InquiryFormLoading';
import Serialize from '@/components/Serialize';
import { fetchPage } from '@/lib/graphql';
import { pageTitle } from '@/lib/utils';

import { metadata } from '../layout';

const InquiryForm = dynamic(() => import('@/components/InquiryForm'), { ssr: false, loading: InquiryFormLoading });

export async function generateMetadata() {
  const page = await fetchPage(['inquire']);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page() {
  const page = await fetchPage(['inquire']);

  if (!page) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      {page.content?.root?.children && <Serialize nodes={page.content.root.children} />}
      <InquiryForm />
    </section>
  );
}
