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

export const colSpanClass = (length: number) => {
  if (length === 1) {
    return 'md-lg:col-span-2';
  }

  let smClass = '';
  let mdLgClass = '';

  switch (length % 2) {
    case 0:
      smClass = 'sm:col-span-2';
      break;
    case 1:
      smClass = 'sm:col-span-1';
      break;
    default:
      smClass = '';
  }

  switch (length % 3) {
    case 0:
      mdLgClass = 'md-lg:col-span-3';
      break;
    case 1:
      mdLgClass = 'md-lg:col-span-2';
      break;
    case 2:
      mdLgClass = 'md-lg:col-span-1';
      break;
    default:
      mdLgClass = '';
  }

  return `${smClass} ${mdLgClass}`;
};
