export const classes = (...classNames: any[]) =>
  classNames
    .filter((value) => typeof value === 'string')
    .map((value) => value.trim())
    .join(' ')
    .trim();

export const maxWidthClass = {
  full: '',
  large: 'max-w-6xl',
  medium: 'max-w-4xl',
};
