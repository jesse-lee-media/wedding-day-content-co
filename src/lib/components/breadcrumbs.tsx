import { Fragment, HTMLAttributes, forwardRef } from 'react';

import Link from 'next/link';

import { PayloadPage } from '../types/payload';

const homeBreadcrumb = {
  url: '/',
  label: 'Home',
  id: 'home',
};

const Breadcrumbs = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement> & { breadcrumbs: PayloadPage['breadcrumbs'] }
>(({ breadcrumbs: pageBreadcrumbs, ...props }, ref) => {
  const breadcrumbs = [homeBreadcrumb, ...pageBreadcrumbs];

  return (
    <ul ref={ref} className="mb-8 flex flex-row flex-wrap items-baseline gap-2" {...props}>
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
});
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
