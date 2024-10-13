import { Metadata } from 'next';

export const pageTitle = (title: string | undefined, metadata: Metadata) =>
  !title || title?.toLowerCase() === 'home' ? metadata.title : `${title} | ${metadata.title}`;
