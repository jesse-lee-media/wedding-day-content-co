import { FC } from 'react';

import { ButtonLinkBlock } from '@/components/blocks/button-link';
import { FormBlock } from '@/components/blocks/form';
import { GalleryBlock } from '@/components/blocks/gallery';
import { HeroBlock } from '@/components/blocks/hero';
import { ImageLinksBlock } from '@/components/blocks/image-links';
import { ImageStackBlock } from '@/components/blocks/image-stack';
import { MessagesMarqueeBlock } from '@/components/blocks/messages-marquee';
import { QuotesBlock } from '@/components/blocks/quotes';
import { SectionBlock } from '@/components/blocks/section';
import { StepperBlock } from '@/components/blocks/stepper';
import {
  PayloadButtonLinkBlock,
  PayloadFormBlock,
  PayloadGalleryBlock,
  PayloadHeroBlock,
  PayloadImageLinksBlock,
  PayloadImageStackBlock,
  PayloadMessagesMarqueeBlock,
  PayloadQuotesBlock,
  PayloadSectionBlock,
  PayloadStepperBlock,
} from '@/payload/payload-types';

const blocks = {
  buttonLink: ButtonLinkBlock,
  gallery: GalleryBlock,
  hero: HeroBlock,
  imageStack: ImageStackBlock,
  messagesMarquee: MessagesMarqueeBlock,
  imageLinks: ImageLinksBlock,
  quotes: QuotesBlock,
  section: SectionBlock,
  stepper: StepperBlock,
  formBlock: FormBlock,
};

export function Blocks({
  blockType,
  ...props
}:
  | PayloadButtonLinkBlock
  | PayloadFormBlock
  | PayloadGalleryBlock
  | PayloadHeroBlock
  | PayloadImageLinksBlock
  | PayloadImageStackBlock
  | PayloadMessagesMarqueeBlock
  | PayloadQuotesBlock
  | PayloadSectionBlock
  | PayloadStepperBlock) {
  const RenderBlock: FC<any> = blocks[blockType];

  delete props.blockName;

  return RenderBlock ? <RenderBlock {...props} /> : null;
}
