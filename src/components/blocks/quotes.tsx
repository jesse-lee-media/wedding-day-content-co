import { RichText } from '@/components/rich-text';
import { Blockquote, BlockquoteBody, BlockquoteFooter } from '@/lib/components/blockquote';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/components/carousel';
import type { PayloadQuotesBlock } from '@/payload/payload-types';

export function QuotesBlock({ quotes }: PayloadQuotesBlock) {
  if (!quotes || quotes.length === 0) {
    return null;
  }

  if (quotes.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
        {quotes.map(({ client, content, id }) => (
          <Blockquote key={id} className="md:last:col-span-2 lg:last:col-span-1">
            <BlockquoteBody>
              <RichText data={content} />
            </BlockquoteBody>
            <BlockquoteFooter>{client}</BlockquoteFooter>
          </Blockquote>
        ))}
      </div>
    );
  }

  return (
    <Carousel className="my-6 overflow-x-padded first:mt-0 last:mb-0">
      <CarouselContent className="items-center">
        {quotes.map(({ client, content, id }) => (
          <CarouselItem key={id} className="mi-auto md:basis-1/2 xl:basis-1/3">
            <Blockquote>
              <BlockquoteBody>
                <RichText data={content} />
              </BlockquoteBody>
              <BlockquoteFooter>{client}</BlockquoteFooter>
            </Blockquote>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-between py-4 md:py-0">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
