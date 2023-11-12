import { slugify } from '@/lib/utils';

export default function FaqSection({ children, heading }: { children: React.ReactNode; heading: string }) {
  return (
    <div className="grid grid-cols-1 gap-12 border-t border-white border-opacity-75 py-16 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-2">
      <h1 id={slugify(heading)} className="text-4xl text-wrap-balance xs:text-5xl">
        {heading}
      </h1>
      {children}
    </div>
  );
}
