import dynamic from 'next/dynamic';
import Link from 'next/link';

import { PayloadNavigation } from '@/lib/types/payload';

const NavigationLinks = dynamic(() => import('./links'), { ssr: false });

export default function Navigation(props: PayloadNavigation) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-b-black border-opacity-75 bg-white">
      <ul className="mx-auto flex h-16 w-full max-w-7xl flex-row items-center justify-between gap-4 pl-4 pr-2 md:px-4">
        <li className="flex flex-1">
          <Link href="/">Wedding Day Content Co.</Link>
        </li>
        <NavigationLinks {...props} />
      </ul>
    </nav>
  );
}
