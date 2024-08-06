import { Blockquote, BlockquoteBody, BlockquoteFooter } from '@/lib/components/blockquote';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/components/carousel';
import { PayloadBlockQuotes } from '@/lib/types/payload';

import Serialize from '../serialize';

export default function BlockQuotes({ quotes }: PayloadBlockQuotes) {
  if (quotes.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
        {quotes.map(({ client, content }, i) => (
          <Blockquote key={i} className="last:md:col-span-2 last:lg:col-span-1">
            <BlockquoteBody>
              <Serialize nodes={content.root.children!} />
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
        {quotes.map(({ client, content }, i) => (
          <CarouselItem key={i} className="mi-auto md:basis-1/2 xl:basis-1/3">
            <Blockquote>
              <BlockquoteBody>
                <Serialize nodes={content.root.children!} />
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
