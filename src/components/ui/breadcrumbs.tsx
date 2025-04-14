import type { ComponentProps } from 'react';
import { Fragment } from 'react';

import Link from 'next/link';

import type { PayloadPagesCollection } from '@/payload/payload-types';

const homeBreadcrumb = {
  url: '/',
  label: 'Home',
  id: 'home',
};

type BreadcrumbsProps = ComponentProps<'ul'> & {
  breadcrumbs: PayloadPagesCollection['breadcrumbs'];
};

const Breadcrumbs = ({ breadcrumbs: pageBreadcrumbs, ...props }: BreadcrumbsProps) => {
  const breadcrumbs = [homeBreadcrumb, ...(pageBreadcrumbs ?? [])];

  return (
    <ul className="mb-8 flex flex-row flex-wrap items-baseline gap-2" {...props}>
      {breadcrumbs?.map(({ label, url, id }, i) => (
        <Fragment key={id}>
          {i > 0 ? '/' : null}
          <li className="shrink-0 whitespace-nowrap">
            {i < breadcrumbs.length - 1 ? (
              <Link href={url === '/home' ? '/' : (url ?? '/')}>{label}</Link>
            ) : (
              <span className="text-neutral-800/75">{label}</span>
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

export { Breadcrumbs };
