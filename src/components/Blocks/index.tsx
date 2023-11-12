import {
  PayloadBlockButtonLink,
  PayloadBlockGallery,
  PayloadBlockHero,
  PayloadBlockPortfolioCards,
  PayloadBlockSection,
} from '@/lib/types/payload';

import BlockButtonLink from './BlockButtonLink';
import BlockGallery from './BlockGallery';
import BlockHero from './BlockHero';
import BlockPortfolioCards from './BlockPortfolioCards';
import BlockSection from './BlockSection';

const blocks = {
  buttonLink: BlockButtonLink,
  gallery: BlockGallery,
  hero: BlockHero,
  portfolioCards: BlockPortfolioCards,
  section: BlockSection,
};

export function Blocks(
  props:
    | PayloadBlockButtonLink
    | PayloadBlockGallery
    | PayloadBlockHero
    | PayloadBlockPortfolioCards
    | PayloadBlockSection,
) {
  const RenderBlock = blocks[props.blockType];

  // @ts-expect-error – valid props
  return RenderBlock ? <RenderBlock {...props} /> : null;
}
