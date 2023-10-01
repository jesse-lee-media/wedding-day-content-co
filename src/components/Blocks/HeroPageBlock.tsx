import { PayloadButtonLink } from '@/lib/components/Buttons';
import { PayloadHeroPageBlock } from '@/lib/types/payload';
import { classes, maxWidthClass } from '@/lib/utils/classes';

export default function HeroPageBlock(props: PayloadHeroPageBlock) {
  const { buttonLink, ctaButton, description, heading, maxWidth } = props;

  return (
    <section
      className={classes(
        maxWidthClass[maxWidth],
        'mx-auto flex w-full flex-col items-center justify-center pt-8 text-center md:pt-12',
      )}
    >
      <h1 className="mb-4 text-5xl sm:text-6xl">{heading}</h1>
      <p className="mx-auto mb-6 max-w-2xl text-lg">{description}</p>
      {ctaButton && buttonLink && <PayloadButtonLink {...buttonLink} />}
    </section>
  );
}
