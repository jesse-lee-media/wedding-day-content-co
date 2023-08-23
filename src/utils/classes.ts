export const classes = (...classNames: any[]) =>
  classNames
    .filter((value) => typeof value === 'string')
    .join(' ')
    .trim();
