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

export function Blocks({
  blockType,
  ...props
}: PayloadBlockButtonLink | PayloadBlockGallery | PayloadBlockHero | PayloadBlockPortfolioCards | PayloadBlockSection) {
  delete props.blockName;

  const RenderBlock: React.FC<any> = blocks[blockType];

  return RenderBlock ? <RenderBlock {...props} /> : null;
}
