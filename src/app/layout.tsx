import type { Metadata } from 'next';
import { Figtree, Paytone_One } from 'next/font/google';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { fetchGlobal } from '@/lib/api';
import { PayloadFooter, PayloadNavigation } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

import './globals.css';

const figtree = Figtree({ subsets: ['latin'], display: 'swap', variable: '--font-figtree' });
const paytoneOne = Paytone_One({ subsets: ['latin'], weight: ['400'], variable: '--font-paytone-one' });

export const metadata: Metadata = {
  title: 'Jesse Lee Media',
  description: 'Content creator for events, weddings, brands, and everything in between—your moments, our artistry!',
  icons: {
    icon: [
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
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  themeColor: '#ffedd5',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navigation = await fetchGlobal<PayloadNavigation>('navigation');
  const footer = await fetchGlobal<PayloadFooter>('footer');

  return (
    <html lang="en" className={classes(figtree.variable, paytoneOne.variable)}>
      <body>
        <Navigation links={navigation?.links ?? []} />
        <main className="flex flex-1 flex-col px-4 md:mt-16">{children}</main>
        <Footer {...footer} />
      </body>
    </html>
  );
}
