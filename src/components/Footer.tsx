import Link from 'next/link';

import Icon from '@/lib/components/Icon';
import { PayloadFooter } from '@/lib/types/payload';

export default function Footer(props: PayloadFooter | undefined) {
  return (
    <footer className="px-4 pb-20 md:pb-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-orange-200 border-opacity-80 bg-orange-100/80 px-4 py-8 text-center text-sm font-semibold backdrop-blur-md">
        {props && (
          <ul className="flex flex-row items-center justify-center gap-2">
            {props?.socialLinks?.map((link, i) => (
              <Link
                key={i}
                href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab && link.type === 'external' ? 'noopener noreferrer' : undefined}
                aria-label={link.text}
                className="hover:no-underline"
              >
                <Icon name={link.icon!} />
              </Link>
            ))}
          </ul>
        )}
        <p className="text-pink-800">&copy; {new Date().getFullYear()} Jesse Lee Media</p>
      </div>
    </footer>
  );
}
