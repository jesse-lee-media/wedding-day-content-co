import type { ComponentProps } from 'react';

export function IconArrowUpRight(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      {...props}
    >
      <path
        d="M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
