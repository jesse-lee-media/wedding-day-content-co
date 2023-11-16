'use client';

import { useEffect, useState } from 'react';

import { Menu } from 'iconoir-react';
import { useMediaQuery } from 'usehooks-ts';

import PayloadButtonLink from '@/lib/components/payload-button-link';
import PayloadLink from '@/lib/components/payload-link';
import { Sheet, SheetContent, SheetTrigger } from '@/lib/components/sheet';
import { PayloadNavigation } from '@/lib/types/payload';

function MobileMenu({ callToAction, links }: PayloadNavigation) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/5 focus:outline-none focus:ring-[1.5px] focus:ring-black/75 dark:focus:ring-white/75"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col gap-2 p-4">
          {links?.map((link, i) => (
            <li key={i}>
              <PayloadLink {...link} className="text-xl" />
            </li>
          ))}
          {callToAction && (
            <li className="mt-4 flex w-full">
              <PayloadButtonLink {...callToAction} className="flex-1" />
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

function DesktopLinks({ callToAction, links }: PayloadNavigation) {
  return (
    <>
      {links?.map((link, i) => (
        <li key={i}>
          <PayloadLink {...link} />
        </li>
      ))}
      {callToAction && (
        <li>
          <PayloadButtonLink {...callToAction} />
        </li>
      )}
    </>
  );
}

export default function NavigationLinks(props: PayloadNavigation) {
  const [isDesktop, setIsDesktop] = useState(false);

  const matchesDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setIsDesktop(matchesDesktop);
  }, [matchesDesktop]);

  return <>{isDesktop ? <DesktopLinks {...props} /> : <MobileMenu {...props} />}</>;
}
