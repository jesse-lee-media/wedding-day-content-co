import { Marquee, MarqueeContent, MarqueeFade } from '@/lib/components/marquee';
import { PayloadBlockMessagesMarquee } from '@/lib/types/payload';

export default function BlockMessagesMarquee({ messages }: PayloadBlockMessagesMarquee) {
  const duplicatedMessages = [...messages, ...messages].map(({ content }, i) => (
    <div
      key={i}
      className="max-w-80 shrink-0 text-balance rounded-xl border-2 border-black border-opacity-75 bg-pink-100 p-6 text-center text-xl shadow-lg odd:rotate-2 even:-rotate-2"
    >
      {content}
    </div>
  ));

  return (
    <Marquee className="py-6">
      <MarqueeContent className="flex shrink-0 flex-row items-center gap-6">{duplicatedMessages}</MarqueeContent>
      <MarqueeContent duplicate className="flex shrink-0 flex-row items-center gap-6">
        {duplicatedMessages}
      </MarqueeContent>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
    </Marquee>
  );
}
