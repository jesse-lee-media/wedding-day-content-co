import { Fragment } from 'react';

import Link from 'next/link';

import { PayloadPage } from '../types/payload';

const homeBreadcrumb = {
  url: '/',
  label: 'Home',
  id: 'home',
};

export default function Breadcrumbs({ breadcrumbs: pageBreadcrumbs }: PayloadPage) {
  const breadcrumbs = [homeBreadcrumb, ...pageBreadcrumbs];
  const breadcrumbUrl = (url: string) => (url === '/home' ? '/' : url);

  return (
    <ul className="mb-8 flex flex-row flex-wrap items-baseline gap-2">
      {breadcrumbs?.map((breadcrumb, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-black/60 dark:text-white/60">/</span>}
          <li className="shrink-0 whitespace-nowrap">
            {i < breadcrumbs.length - 1 ? (
              <Link href={breadcrumbUrl(breadcrumb.url!)} className="text-black/60 dark:text-white/60">
                {breadcrumb.label}
              </Link>
            ) : (
              breadcrumb.label
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
