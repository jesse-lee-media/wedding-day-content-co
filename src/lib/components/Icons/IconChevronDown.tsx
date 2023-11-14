import { BaseProps } from '@/lib/types/base-props';

export default function IconChevronDown(props: Omit<BaseProps, 'children'>) {
  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
