export const slugify = (text?: string) =>
  text
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9\s]/gi, '')
    ?.replace(/\s+/g, '-');
