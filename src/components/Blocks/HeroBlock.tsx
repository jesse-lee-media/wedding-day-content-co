import { PayloadButtonLink } from '@/lib/components/Buttons';
import Tag from '@/lib/components/Tag';
import { PayloadHeroBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

export default function HeroBlock(props: PayloadHeroBlock) {
  const { buttonLinks, description, heading, maxWidth, tags } = props;

  return (
    <section className={classes('mx-auto w-full pb-16 pt-8 md:pt-12', maxWidthClass[maxWidth])}>
      <ul className="flex flex-row flex-wrap gap-2">
        {tags?.map(({ text, icon }, i) => (
          <li key={i}>
            <Tag icon={icon} iconPosition="left">
              {text}
            </Tag>
          </li>
        ))}
      </ul>
      <h1 className="mb-4 indent-2 text-6xl sm:text-7xl md:text-8xl">{heading}</h1>
      <p className="mb-8 text-lg font-medium">{description}</p>
      <ul className="flex flex-col flex-wrap gap-2 sm:flex-row">
        {buttonLinks?.map((buttonLink, i) => (
          <li key={i}>
            <PayloadButtonLink
              {...buttonLink}
              className={classes(
                buttonLink.link.iconPosition === 'left'
                  ? 'sm:!pl-4 sm:!pr-5'
                  : buttonLink.link.iconPosition === 'right'
                  ? 'sm:!pl-5 sm:!pr-4'
                  : '!px-5',
                'w-full !px-5 xs:max-w-[12rem] sm:w-fit sm:max-w-none [&>i]:hidden [&>i]:sm:block',
              )}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
