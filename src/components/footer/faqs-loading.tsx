import { NavArrowDown } from 'iconoir-react';

export default function FaqsLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row border-b border-black/75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <NavArrowDown className="shrink-0 transition-transform duration-200" />
      </div>
      <div className="flex flex-row border-b border-black/75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <NavArrowDown className="shrink-0 transition-transform duration-200" />
      </div>
      <div className="flex flex-row border-b border-black/75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <NavArrowDown className="shrink-0 transition-transform duration-200" />
      </div>
    </div>
  );
}
