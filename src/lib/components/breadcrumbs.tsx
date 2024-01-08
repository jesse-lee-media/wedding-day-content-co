import { Fragment } from 'react';

import Link from 'next/link';

import { PayloadPage } from '../types/payload';

export default function Breadcrumbs({ breadcrumbs }: PayloadPage) {
  return (
    <ul className="mb-8 flex flex-row flex-wrap items-baseline gap-2">
      {breadcrumbs?.map(({ label, url }, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-black/60 dark:text-white/60">/</span>}
          <li className="shrink-0 whitespace-nowrap">
            {i < breadcrumbs.length - 1 ? (
              <Link href={url === '/home' ? '/' : url} className="text-black/60 dark:text-white/60">
                {label}
              </Link>
            ) : (
              label
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
