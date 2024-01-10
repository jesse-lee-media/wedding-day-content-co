import { FC } from 'react';

import {
  PayloadBlockButtonLink,
  PayloadBlockGallery,
  PayloadBlockHero,
  PayloadBlockImageStack,
  PayloadBlockMessagesMarquee,
  PayloadBlockPortfolioCards,
  PayloadBlockQuotes,
  PayloadBlockSection,
  PayloadBlockStepper,
} from '@/lib/types/payload';

import BlockButtonLink from './button-link';
import BlockGallery from './gallery';
import BlockHero from './hero';
import BlockImageStack from './image-stack';
import BlockMessagesMarquee from './messages-marquee';
import BlockPortfolioCards from './portfolio-cards';
import BlockQuotes from './quotes';
import BlockSection from './section';
import BlockStepper from './stepper';

const blocks = {
  buttonLink: BlockButtonLink,
  gallery: BlockGallery,
  hero: BlockHero,
  imageStack: BlockImageStack,
  messagesMarquee: BlockMessagesMarquee,
  portfolioCards: BlockPortfolioCards,
  quotes: BlockQuotes,
  section: BlockSection,
  stepper: BlockStepper,
};

export function Blocks({
  blockType,
  ...props
}:
  | PayloadBlockButtonLink
  | PayloadBlockGallery
  | PayloadBlockHero
  | PayloadBlockImageStack
  | PayloadBlockMessagesMarquee
  | PayloadBlockPortfolioCards
  | PayloadBlockQuotes
  | PayloadBlockSection
  | PayloadBlockStepper) {
  delete props.blockName;

  const RenderBlock: FC<any> = blocks[blockType];

  return RenderBlock ? <RenderBlock {...props} /> : null;
}
