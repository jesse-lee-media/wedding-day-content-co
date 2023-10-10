import Image from 'next/image';
import Link from 'next/link';

import { PayloadButtonLink } from '@/lib/components/Buttons';
import Icon from '@/lib/components/Icon';
import Tag from '@/lib/components/Tag';
import { PayloadContentCardsBlock, PayloadPage } from '@/lib/types/payload';
import { classes, colSpanClass } from '@/lib/utils/classes';

import Serialize from '../Serialize';

type UpSellCardProps = PayloadContentCardsBlock['upSellCard'] & {
  className?: string;
};

const UpSellCard = (props: UpSellCardProps) => {
  const { className, description, heading, buttonLink } = props;

  return (
    <li
      className={classes(
        className,
        'flex w-full flex-1 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-orange-200 border-opacity-80 bg-gradient-to-br from-orange-100/50 to-orange-100/25 p-6 text-center transition-all',
      )}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-sans text-xl font-bold normal-case">{heading}</h1>
        <Serialize nodes={description as any} pMarginClass="mx-auto max-w-lg text-sm" />
      </div>
      <PayloadButtonLink {...buttonLink} />
    </li>
  );
};

export default function ContentCardsBlock(props: PayloadContentCardsBlock) {
  const { cards, variant, showUpSellCard, upSellCard } = props;

  const cardVariantClass = {
    scroll: 'flex-col min-w-[18rem] max-w-xs sm:min-w-[24rem] sm:max-w-sm',
    grid: 'flex-col',
  };
  const listVariantClass = {
    scroll: 'scrollbar-hide flex flex-row gap-4 pb-8 pt-1 overflow-x-padded-scroll',
    grid: 'grid grid-cols-1 gap-4 sm:grid-cols-2 md-lg:grid-cols-3',
  };
  const imageVariantClass = {
    scroll: '',
    grid: '',
  };

  const getNestedUrl = (page: PayloadPage) => page.breadcrumbs[page.breadcrumbs.length - 1].url;

  return (
    <ul className={listVariantClass[variant]}>
      {cards?.map(({ heading, tags, image, link }, i) => (
        <li key={i} className="flex">
          <Link
            href={link.type === 'external' ? link.url : getNestedUrl(link.reference.value)}
            target={link.newTab ? '_blank' : undefined}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            aria-label={link.text}
            className={classes(
              cardVariantClass[variant],
              'group/card relative flex w-full flex-1 overflow-clip rounded-2xl border-2 border-orange-200 border-opacity-80 transition-all hover:no-underline hover:shadow-lg',
            )}
          >
            <div className="relative overflow-hidden border-b-2 border-b-orange-200 border-opacity-80 transition-all">
              <Icon
                name="arrow-right"
                className="absolute right-4 top-4 z-10 rounded-full bg-neutral-700/75 p-2 text-neutral-100/80 transition-all group-hover/card:bg-neutral-900/75 group-hover/card:text-neutral-50"
              />
              <Image
                src={image!.sizes!.preview!.url!}
                blurDataURL={image.dataUrl}
                width={image!.sizes!.preview!.width!}
                height={image!.sizes!.preview!.height!}
                alt={image.alt ?? ''}
                placeholder="blur"
                className={classes(imageVariantClass[variant], '"transition-all group-hover/card:opacity-95"')}
              />
            </div>
            <div className="flex flex-1 flex-col bg-gradient-to-br from-orange-100/25 to-orange-50 p-4 transition-all group-hover/card:from-orange-100/25 group-hover/card:to-orange-100/25">
              {tags && tags.length > 0 && (
                <ul className="mb-3 flex flex-row flex-wrap items-center gap-2">
                  {tags.map(({ icon, text }, j) => (
                    <li key={j}>
                      <Tag icon={icon} className="transition-all group-hover/card:text-orange-950">
                        {text}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )}
              <h1 className="font-sans text-2xl font-bold normal-case transition-all group-hover/card:text-pink-900">
                {heading}
              </h1>
            </div>
          </Link>
        </li>
      ))}
      {showUpSellCard && upSellCard && <UpSellCard {...upSellCard} className={colSpanClass(cards.length)} />}
    </ul>
  );
}
