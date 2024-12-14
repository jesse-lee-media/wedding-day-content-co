import { Marquee, MarqueeContent, MarqueeFade } from '@/lib/components/marquee';
import type { PayloadMessagesMarqueeBlock } from '@/payload/payload-types';

export function MessagesMarqueeBlock({ messages }: PayloadMessagesMarqueeBlock) {
  if (!messages?.length) {
    return null;
  }

  const duplicatedMessages = messages.concat(messages).map(({ content }, i) => (
    <div
      key={i}
      className="relative isolate max-w-72 shrink-0 overflow-clip text-balance rounded bg-neutral-50 p-4 text-center text-base shadow-lg shadow-black/10 ring-2 ring-neutral-200 dark:bg-neutral-800 dark:shadow-white/5 dark:ring-neutral-700 md:max-w-80 md:p-6 md:text-lg"
    >
      {content}
      <div className="absolute -z-10 h-32 w-48 rotate-45 rounded-full bg-dusty-rose-300/25 blur-3xl group-odd:-right-1/4 group-odd:top-1/4 group-even:right-1/4 group-even:top-1/2 dark:bg-dusty-rose-800/25"></div>
    </div>
  ));

  return (
    <Marquee className="overflow-hidden py-6 overflow-section">
      <MarqueeContent className="flex shrink-0 flex-row items-center gap-8 whitespace-normal">
        {duplicatedMessages}
      </MarqueeContent>
      <MarqueeContent
        duplicate
        className="flex shrink-0 flex-row items-center gap-6 whitespace-normal"
      >
        {duplicatedMessages}
      </MarqueeContent>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
    </Marquee>
  );
}
