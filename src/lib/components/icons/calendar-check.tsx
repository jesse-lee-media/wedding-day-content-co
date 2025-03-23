import type { ComponentProps } from 'react';

export function IconCalendarCheck(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M11 20H4V9M4 9V5H20V9M4 9H20M20 9V12M8 5V3M16 5V3M21 16L17 21L15 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
