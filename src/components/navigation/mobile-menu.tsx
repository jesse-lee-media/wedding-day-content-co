import { Menu } from 'iconoir-react';

import PayloadButtonLink from '@/lib/components/payload-button-link';
import PayloadLink from '@/lib/components/payload-link';
import { Sheet, SheetContent, SheetTrigger } from '@/lib/components/sheet';
import { PayloadNavigation } from '@/lib/types/payload';

export default function MobileMenu({ callToAction, links }: PayloadNavigation) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className="md:hidden">
          <button
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/5 focus:outline-none focus:ring-[1.5px] focus:ring-black/75 dark:focus:ring-white/75"
          >
            <Menu className="h-5 w-5" />
          </button>
        </li>
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
