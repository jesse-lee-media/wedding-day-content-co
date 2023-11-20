import dynamic from 'next/dynamic';
import Link from 'next/link';

import PayloadButtonLink from '@/lib/components/payload-button-link';
import PayloadLink from '@/lib/components/payload-link';
import { PayloadNavigation } from '@/lib/types/payload';

const MobileMenu = dynamic(() => import('./mobile-menu'), { ssr: false });

function DesktopLinks({ callToAction, links }: PayloadNavigation) {
  return (
    <>
      {links?.map((link, i) => (
        <li key={i} className="hidden md:block">
          <PayloadLink {...link} />
        </li>
      ))}
      {callToAction && (
        <li className="hidden md:block">
          <PayloadButtonLink {...callToAction} />
        </li>
      )}
    </>
  );
}

export default function Navigation(props: PayloadNavigation) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-b-black border-opacity-75 bg-white">
      <ul className="mx-auto flex h-16 w-full max-w-7xl flex-row items-center justify-between gap-4 pl-4 pr-2 md:px-4">
        <li className="flex flex-1">
          <Link href="/">Wedding Day Content Co.</Link>
        </li>
        <DesktopLinks {...props} />
        <MobileMenu {...props} />
      </ul>
    </nav>
  );
}
