import Link from 'next/link';

import Icons from '@/lib/components/Icons';
import PayloadImage from '@/lib/components/PayloadImage';
import { PayloadBlockPortfolioCards } from '@/lib/types/payload';
import { linkProps } from '@/lib/utils';

export default function BlockPortfolioCards({ cards }: PayloadBlockPortfolioCards) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map(({ image, link }, i) => (
        <Link
          key={i}
          {...linkProps(link)}
          className="group relative overflow-clip rounded-2xl border border-black border-opacity-75 transition-all hover:shadow-lg focus:shadow-lg"
        >
          <PayloadImage {...image} hasLink={false} className="transition-all group-hover:scale-105" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-between gap-2 border-t-[1.5px] border-black border-opacity-75 bg-white px-6 py-4 text-black transition-all group-hover:bg-pink-100">
            <p className="text-xl">{link.text}</p>
            <Icons name={link.icon ?? 'arrow-right'} className="h-5 w-5" />
          </div>
        </Link>
      ))}
    </div>
  );
}
