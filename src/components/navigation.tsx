/**
 * The focus guard portion of this file is adapted from the Radix Primitives Focus Guards
 * https://github.com/radix-ui/primitives/tree/6469d41dcc6e84fe41d70a2703924338e7562dd1/packages/react/focus-guards
 *
 * ---
 *
 * MIT License

 * Copyright (c) 2022 WorkOS

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import { FocusScope } from '@radix-ui/react-focus-scope';
import Link from 'next/link';

import { PayloadButtonLink } from '@/components/ui/payload-button-link';
import { PayloadLink } from '@/components/ui/payload-link';
import { Icons } from '@/icons';
import type { PayloadNavigationGlobal } from '@/payload/payload-types';

function createFocusGuard() {
  const element = document.createElement('span');

  element.setAttribute('data-radix-focus-guard', '');
  element.tabIndex = 0;
  element.style.outline = 'none';
  element.style.opacity = '0';
  element.style.position = 'fixed';
  element.style.pointerEvents = 'none';

  return element;
}

let count = 0;

export function Navigation({ callToAction, links }: PayloadNavigationGlobal) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (open) {
      const edgeGuards = document.querySelectorAll('[data-radix-focus-guard]');

      document.body.classList.add('overflow-hidden');
      ref.current?.insertAdjacentElement('afterbegin', edgeGuards[0] ?? createFocusGuard());
      ref.current?.insertAdjacentElement('beforeend', edgeGuards[1] ?? createFocusGuard());

      count++;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.querySelectorAll('[data-radix-focus-guard]').forEach((node) => node.remove());
    }

    return () => {
      if (count === 1) {
        document.querySelectorAll('[data-radix-focus-guard]').forEach((node) => node.remove());
      }

      count--;
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth || 0;

      if (width >= 992) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => setOpen((open) => !open);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div
        aria-hidden
        data-state={open ? 'open' : 'closed'}
        className="data-[state=open]:fixed data-[state=open]:inset-0 data-[state=open]:z-40 data-[state=open]:bg-neutral-50/25 data-[state=open]:backdrop-blur-md"
      />
      <nav ref={ref} role={open ? 'dialog' : 'navigation'} className="fixed inset-x-2 top-2 z-50">
        <FocusScope
          loop={open}
          trapped={open}
          onMountAutoFocus={(e) => e.preventDefault()}
          className="outline-hidden"
        >
          <ul className="z-50 mx-auto flex h-16 max-w-7xl flex-row items-center justify-between gap-4 rounded-xs bg-neutral-50/75 pr-1 pl-4 shadow-lg ring-2 shadow-black/10 ring-neutral-200/75 backdrop-blur-lg md-lg:px-4 xl:px-6">
            <li className="flex flex-1">
              <Link href="/" onClick={closeMenu} className="subheading text-sm">
                Wedding Day Content Co.
              </Link>
            </li>
            {links?.map((link) => (
              <li key={link.id} className="hidden md-lg:block">
                <PayloadLink {...link} className="subheading text-sm" />
              </li>
            ))}
            {callToAction.link.text ? (
              <li className="hidden md-lg:block">
                <PayloadButtonLink {...callToAction} />
              </li>
            ) : null}
            <button
              onClick={toggleMenu}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              className="inline-flex size-10 items-center justify-center rounded-xs transition focus-visible:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-600/75 focus-visible:outline-hidden md-lg:hidden"
            >
              {open ? <Icons name="x" /> : <Icons name="menu" />}
            </button>
          </ul>
          <dialog
            aria-live="polite"
            aria-hidden={!open}
            open={open}
            data-state={open ? 'open' : 'closed'}
            className="inset-x-0 z-40 m-[unset] mt-3 w-[unset] rounded-xs bg-neutral-50/75 p-4 pt-2 shadow-lg ring-2 shadow-black/10 ring-neutral-200/75 backdrop-blur-lg"
          >
            <ul className="flex w-full flex-col gap-2">
              {links?.map((link) => (
                <li key={link.id}>
                  <PayloadLink
                    {...link}
                    onClick={closeMenu}
                    className="subheading inline-flex h-10 w-full items-center justify-between gap-2"
                  >
                    <Icons name="arrowRight" />
                  </PayloadLink>
                </li>
              ))}
              {callToAction.link.text ? (
                <li className="mt-2 flex">
                  <PayloadButtonLink
                    {...callToAction}
                    onClick={closeMenu}
                    size="md"
                    className="flex-1"
                  />
                </li>
              ) : null}
            </ul>
          </dialog>
        </FocusScope>
      </nav>
    </>
  );
}
