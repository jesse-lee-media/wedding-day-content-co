import {
  PayloadButtonLinkBlock,
  PayloadContentBlock,
  PayloadFaqBlock,
  PayloadFeatureCardsBlock,
  PayloadHeroBlock,
  PayloadHeroPageBlock,
  PayloadHeroSectionBlock,
  PayloadPackageCardsBlock,
  PayloadSectionBlock,
} from '@/lib/types/payload';

import ButtonLinkBlock from './ButtonLinkBlock';
import ContentBlock from './ContentBlock';
import FaqBlock from './FaqBlock';
import FeatureCardsBlock from './FeatureCardsBlock';
import HeroBlock from './HeroBlock';
import HeroPageBlock from './HeroPageBlock';
import HeroSectionBlock from './HeroSectionBlock';
import PackageCardsBlock from './PackageCardsBlock';
import SectionBlock from './SectionBlock';

const blocks = {
  buttonLink: ButtonLinkBlock,
  content: ContentBlock,
  faq: FaqBlock,
  featureCards: FeatureCardsBlock,
  hero: HeroBlock,
  heroPage: HeroPageBlock,
  heroSection: HeroSectionBlock,
  packageCards: PackageCardsBlock,
  section: SectionBlock,
};

export function Blocks(
  props:
    | PayloadButtonLinkBlock
    | PayloadContentBlock
    | PayloadFaqBlock
    | PayloadFeatureCardsBlock
    | PayloadHeroBlock
    | PayloadHeroPageBlock
    | PayloadHeroSectionBlock
    | PayloadPackageCardsBlock
    | PayloadSectionBlock,
) {
  const RenderBlock = blocks[props.blockType];

  // @ts-expect-error - dynamic props
  return RenderBlock ? <RenderBlock {...props} /> : null;
}
