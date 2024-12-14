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
import type {
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

export function Blocks(
  props:
    | PayloadButtonLinkBlock
    | PayloadFormBlock
    | PayloadGalleryBlock
    | PayloadHeroBlock
    | PayloadImageLinksBlock
    | PayloadImageStackBlock
    | PayloadMessagesMarqueeBlock
    | PayloadQuotesBlock
    | PayloadSectionBlock
    | PayloadStepperBlock,
) {
  switch (props.blockType) {
    case 'buttonLink':
      return <ButtonLinkBlock {...props} />;
    case 'gallery':
      return <GalleryBlock {...props} />;
    case 'hero':
      return <HeroBlock {...props} />;
    case 'imageStack':
      return <ImageStackBlock {...props} />;
    case 'messagesMarquee':
      return <MessagesMarqueeBlock {...props} />;
    case 'imageLinks':
      return <ImageLinksBlock {...props} />;
    case 'quotes':
      return <QuotesBlock {...props} />;
    case 'section':
      return <SectionBlock {...props} />;
    case 'stepper':
      return <StepperBlock {...props} />;
    case 'formBlock':
      return <FormBlock {...props} />;
    default:
      return null;
  }
}
