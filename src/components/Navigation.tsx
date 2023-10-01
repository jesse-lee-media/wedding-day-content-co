'use client';

import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

import { ButtonLink } from '@/lib/components/Buttons';
import Icon from '@/lib/components/Icon';
import { PayloadLinkField } from '@/lib/types/payload';

const MobileNav = ({ links }: { links: PayloadLinkField[] }) => (
  <li>
    <Dialog.Root>
      <Dialog.Trigger className="flex h-9 w-9 items-center justify-center rounded-md text-pink-800 transition-all focus:outline-none focus:ring-2 focus:ring-pink-800/75">
        <Icon name="menu" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-neutral-900/50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-end">
          <ul className="flex w-full flex-col rounded-t-xl bg-orange-100/80 p-4 backdrop-blur-md">
            {links.map((link, i) => (
              <li key={i} className="w-full">
                <Dialog.Close asChild>
                  <Link
                    href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                    className="flex w-full items-center justify-center rounded-lg px-6 py-4 text-xl font-semibold"
                  >
                    {link.text}
                  </Link>
                </Dialog.Close>
              </li>
            ))}
          </ul>
          <ul className="flex h-[66px] w-full flex-row items-center justify-between border-t-2 border-t-orange-200 border-opacity-80 bg-orange-100 px-4">
            <li>
              <Dialog.Close asChild>
                <Link href="/" className="font-serif lowercase">
                  Jesse Lee Media
                </Link>
              </Dialog.Close>
            </li>
            <li>
              <Dialog.Close
                className="flex h-9 w-9 items-center justify-center rounded-md text-pink-800 transition-all focus:outline-none focus:ring-2 focus:ring-pink-800/75"
                aria-label="Close dialog"
              >
                <Icon name="x" />
              </Dialog.Close>
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </li>
);

const DesktopNav = ({ links }: { links: PayloadLinkField[] }) => (
  <>
    {links.map((link, i, arr) => (
      <li key={i} className="last:ml-auto last:flex last:w-36 last:justify-end">
        {i === arr.length - 1 ? (
          <ButtonLink
            href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
            target={link.newTab ? '_blank' : undefined}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            icon={link.icon}
            iconPosition={link.iconPosition ?? 'none'}
          >
            {link.text}
          </ButtonLink>
        ) : (
          <Link
            href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
            target={link.newTab ? '_blank' : undefined}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            className="rounded font-semibold"
          >
            {link.text}
          </Link>
        )}
      </li>
    ))}
  </>
);

export default function Navigation({ links }: { links: PayloadLinkField[] }) {
  const matchesDesktop = useMediaQuery('(min-width: 768px)');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(matchesDesktop);
  }, [matchesDesktop]);

  return (
    <header className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-orange-200 border-opacity-80 bg-orange-100/80 px-4 backdrop-blur-md md:bottom-[unset] md:top-0 md:border-b-2 md:border-t-0">
      <nav>
        <ul className="mx-auto flex h-16 w-full max-w-6xl flex-row items-center justify-between gap-4 md:justify-normal">
          <li className="w-36 md:mr-auto">
            <Link href="/" className="font-serif lowercase">
              Jesse Lee Media
            </Link>
          </li>
          {isDesktop ? <DesktopNav links={links} /> : <MobileNav links={links} />}
        </ul>
      </nav>
    </header>
  );
}
