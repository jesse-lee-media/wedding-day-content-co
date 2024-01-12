import { Marquee, MarqueeContent, MarqueeFade } from '@/lib/components/marquee';
import { PayloadBlockMessagesMarquee } from '@/lib/types/payload';

export default function BlockMessagesMarquee({ messages }: PayloadBlockMessagesMarquee) {
  const duplicatedMessages = [...messages, ...messages].map(({ content }, i) => (
    <div
      key={i}
      className="max-w-72 shrink-0 text-balance rounded-xl border border-black/75 bg-pink-100 p-4 text-center text-base shadow-lg selection:bg-black selection:text-pink-200 odd:rotate-2 even:-rotate-2 md:max-w-80 md:p-6 md:text-lg"
    >
      {content}
    </div>
  ));

  return (
    <Marquee className="py-6">
      <MarqueeContent className="flex shrink-0 flex-row items-center gap-6 whitespace-normal">
        {duplicatedMessages}
      </MarqueeContent>
      <MarqueeContent duplicate className="flex shrink-0 flex-row items-center gap-6 whitespace-normal">
        {duplicatedMessages}
      </MarqueeContent>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
    </Marquee>
  );
}
