import {
  PayloadButtonLinkBlock,
  PayloadContentBlock,
  PayloadContentCardsBlock,
  PayloadFaqBlock,
  PayloadFeatureCardsBlock,
  PayloadHeroBlock,
  PayloadHeroPageBlock,
  PayloadHeroSectionBlock,
  PayloadImagesBlock,
  PayloadPackageCardsBlock,
  PayloadSectionBlock,
} from '@/lib/types/payload';

import ButtonLinkBlock from './ButtonLinkBlock';
import ContentBlock from './ContentBlock';
import ContentCardsBlock from './ContentCardsBlock';
import FaqBlock from './FaqBlock';
import FeatureCardsBlock from './FeatureCardsBlock';
import HeroBlock from './HeroBlock';
import HeroPageBlock from './HeroPageBlock';
import HeroSectionBlock from './HeroSectionBlock';
import ImagesBlock from './ImagesBlock';
import PackageCardsBlock from './PackageCardsBlock';
import SectionBlock from './SectionBlock';

const blocks = {
  buttonLink: ButtonLinkBlock,
  content: ContentBlock,
  contentCards: ContentCardsBlock,
  faq: FaqBlock,
  featureCards: FeatureCardsBlock,
  hero: HeroBlock,
  heroPage: HeroPageBlock,
  heroSection: HeroSectionBlock,
  images: ImagesBlock,
  packageCards: PackageCardsBlock,
  section: SectionBlock,
};

export function Blocks(
  props:
    | PayloadButtonLinkBlock
    | PayloadContentBlock
    | PayloadContentCardsBlock
    | PayloadFaqBlock
    | PayloadFeatureCardsBlock
    | PayloadHeroBlock
    | PayloadHeroPageBlock
    | PayloadHeroSectionBlock
    | PayloadImagesBlock
    | PayloadPackageCardsBlock
    | PayloadSectionBlock,
) {
  const RenderBlock = blocks[props.blockType];

  // @ts-expect-error - dynamic props
  return RenderBlock ? <RenderBlock {...props} /> : null;
}
