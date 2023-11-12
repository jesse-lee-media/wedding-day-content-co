import { type ClassValue, clsx } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { PayloadFieldLink } from '../types/payload';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const internalLink = (link: PayloadFieldLink) => {
  const url = link.relationship.value.breadcrumbs[link.relationship.value.breadcrumbs.length - 1].url;
  const anchor = link.anchor ? `#${link.anchor}` : '';

  return `${url === '/home' ? '/' : url}${anchor}`;
};

export const linkProps = (link: PayloadFieldLink) => ({
  href: (link.type === 'internal' && link.relationship ? internalLink(link) : link.url) ?? '/',
  target: link.newTab ? '_blank' : '_self',
  ...(link.type === 'external' ? { rel: link.rel.join(',') } : {}),
  'aria-label': link.text,
});

export const pageTitle = (title: string | undefined, metadata: Metadata) =>
  !title || title?.toLowerCase() === 'home' ? metadata.title : `${title} | ${metadata.title}`;

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/gi, '')
    .replace(/\s+/g, '-');
