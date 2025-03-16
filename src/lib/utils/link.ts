import { slugify } from '@/lib/utils/slugify';
import type { PayloadLinkGroupField } from '@/payload/payload-types';

export const internalLink = (link: PayloadLinkGroupField) => {
  if (typeof link.relationship === 'string' || !link.relationship?.breadcrumbs) {
    return '/';
  }

  const url = link.relationship.breadcrumbs[link.relationship.breadcrumbs.length - 1].url;
  const anchor = link.anchor ? `#${link.anchor}` : '';

  return `${url === '/home' ? '/' : url}${anchor}`;
};

export const linkProps = (link: PayloadLinkGroupField) => {
  const href = link.type === 'internal' && link.relationship ? internalLink(link) : link.url;
  const rel = link.rel && link.rel.length > 0 ? { rel: link.rel.join(',') } : {};

  return {
    href: href ?? '/',
    target: link.newTab ? '_blank' : '_self',
    ...rel,
    'aria-label': link.text,
    'data-umami-event': link.umamiEvent ?? 'Link',
    'data-umami-event-id': link.umamiEventId ?? slugify(link.text),
    'data-umami-event-url': href,
  };
};
