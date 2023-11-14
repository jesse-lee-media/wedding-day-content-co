import { Fragment } from 'react';

import Link from 'next/link';

import { PayloadPage } from '../types/payload';

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: PayloadPage['breadcrumbs'] }) {
  return (
    <div className="mb-8 flex flex-row gap-2">
      {breadcrumbs.map((breadcrumb, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-black/60 dark:text-white/60">/</span>}
          {i < breadcrumbs.length - 1 ? (
            <Link href={breadcrumb.url} className="text-black/60 dark:text-white/60">
              {breadcrumb.label}
            </Link>
          ) : (
            breadcrumb.label
          )}
        </Fragment>
      ))}
    </div>
  );
}
