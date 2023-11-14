import IconChevronDown from '@/lib/components/Icons/IconChevronDown';

export default function FaqsLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row border-b border-black border-opacity-75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <IconChevronDown className="shrink-0 transition-transform duration-200" />
      </div>
      <div className="flex flex-row border-b border-black border-opacity-75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <IconChevronDown className="shrink-0 transition-transform duration-200" />
      </div>
      <div className="flex flex-row border-b border-black border-opacity-75 py-4 last:border-b-0 dark:border-white">
        <div className="h-6 w-full animate-pulse rounded-lg bg-white/5" />
        <IconChevronDown className="shrink-0 transition-transform duration-200" />
      </div>
    </div>
  );
}
