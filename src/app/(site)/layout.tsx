import { ReactNode } from 'react';

import { getPayloadHMR } from '@payloadcms/next/utilities';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { GlobalSlug } from 'payload';

import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { env } from '@/env/client';
import { Toaster } from '@/lib/components/toaster';
import { Providers } from '@/lib/providers';
import { cn } from '@/lib/utils/cn';
import { PayloadFooterGlobal, PayloadNavigationGlobal } from '@/payload/payload-types';
import payloadConfig from '@payload-config';

import './globals.css';

const zodiak = localFont({
  src: '../../../public/font/Zodiak-Variable.ttf',
  display: 'swap',
  variable: '--font-zodiak',
});
const figtree = Figtree({ subsets: ['latin'], display: 'swap', variable: '--font-figtree' });

export const metadata: Metadata = {
  title: 'Wedding Day Content Co.',
  description: 'Content creator for weddings and events—your moments, our artistry.',
  keywords: [
    'Wedding Day Content Co.',
    'Wedding Day Content Co',
    'Wedding Day Content',
    'Content',
    'Creator',
    'Content Creator',
    'Events',
    'Event Content',
    'Event Content Creator',
    'Weddings',
    'Wedding Content',
    'Wedding Content Creator',
    'Photography',
    'Wedding Photography',
    'Videography',
    'Wedding Videography',
    'Photographer',
    'Wedding Photographer',
    'Videographer',
    'Wedding Videographer',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96' },
      { url: '/favicons/favicon-128x128.png', sizes: '128x128' },
      { url: '/favicons/favicon-196x196.png', sizes: '196x196' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/favicons/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    other: [
      { url: '/favicons/mask-icon.svg', rel: 'mask-icon' },
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
};

const fetchGlobal = async (slug: GlobalSlug) => {
  const payload = await getPayloadHMR({ config: payloadConfig });

  return await payload.findGlobal({ slug });
};

const fetchCachedGlobal = <T,>(slug: GlobalSlug) =>
  unstable_cache(fetchGlobal, [slug], {
    tags: [`global_${slug}`],
  })(slug) as Promise<T>;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const navigation = await fetchCachedGlobal<PayloadNavigationGlobal>('navigation');
  const footer = await fetchCachedGlobal<PayloadFooterGlobal>('footer');

  return (
    <html
      lang="en"
      className={cn(
        zodiak.variable,
        figtree.variable,
        'h-full scroll-p-36 !scroll-smooth bg-white font-sans text-black',
      )}
    >
      <body className="relative flex h-full flex-col">
        <div className="dot-mask fixed inset-0 -z-10 h-full w-full" />
        <Providers>
          <Navigation {...navigation} />
          <main className="mx-auto mt-16 w-full max-w-7xl px-6 py-12">{children}</main>
          <Footer {...footer} />
        </Providers>
        <Toaster />
        <Script
          src={env.NEXT_PUBLIC_UMAMI_SRC}
          data-website-id={env.NEXT_PUBLIC_UMAMI_ID}
          data-domains={env.NEXT_PUBLIC_DOMAINS}
        />
      </body>
    </html>
  );
}