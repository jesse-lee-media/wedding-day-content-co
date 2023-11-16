import {
  PayloadBlockButtonLink,
  PayloadBlockGallery,
  PayloadBlockHero,
  PayloadBlockPortfolioCards,
  PayloadBlockSection,
} from '@/lib/types/payload';

import BlockButtonLink from './button-link';
import BlockGallery from './gallery';
import BlockHero from './hero';
import BlockPortfolioCards from './portfolio-cards';
import BlockSection from './section';

const blocks = {
  buttonLink: BlockButtonLink,
  gallery: BlockGallery,
  hero: BlockHero,
  portfolioCards: BlockPortfolioCards,
  section: BlockSection,
};

export function Blocks({
  blockType,
  ...props
}: PayloadBlockButtonLink | PayloadBlockGallery | PayloadBlockHero | PayloadBlockPortfolioCards | PayloadBlockSection) {
  delete props.blockName;

  const RenderBlock: React.FC<any> = blocks[blockType];

  return RenderBlock ? <RenderBlock {...props} /> : null;
}
