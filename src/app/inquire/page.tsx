import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import InquiryFormLoading from '@/components/inquiry-form/inquiry-form-loading';
import Serialize from '@/components/serialize';
import { fetchPage } from '@/lib/api';
import { pageTitle } from '@/lib/utils';

import { metadata } from '../layout';

const InquiryForm = dynamic(() => import('@/components/inquiry-form'), { ssr: false, loading: InquiryFormLoading });

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
