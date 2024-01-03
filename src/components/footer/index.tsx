import dynamic from 'next/dynamic';

import { Marquee, MarqueeContent, MarqueeFade } from '@/lib/components/marquee';
import PayloadLink from '@/lib/components/payload-link';
import { PayloadFooter } from '@/lib/types/payload';

import FaqSection from './faq-section';
import FaqsLoading from './faqs-loading';

const FaqAccordion = dynamic(() => import('./faq-accordion'), { loading: () => <FaqsLoading /> });

export default function Footer({ faqs, linkGroups, marquee }: PayloadFooter) {
  const marqueeText = new Array(4).fill(marquee ?? '').join(' ') + ' ';

  return (
    <footer className="dark flex flex-col gap-24 bg-black py-16 text-white">
      <div className="mx-auto w-full max-w-7xl px-4">
        {faqs && faqs.length > 0 && (
          <FaqSection heading="Frequently asked questions">
            <FaqAccordion faqs={faqs} />
          </FaqSection>
        )}
        {linkGroups && (
          <FaqSection heading="Links">
            <div className="@container">
              <ul className="grid grid-cols-1 gap-8 @xs:grid-cols-2 @sm:grid-cols-3">
                {linkGroups.map((group, i) => (
                  <li key={i} className="flex flex-col gap-2">
                    <h1 className="font-sans text-sm !leading-normal text-white/75">{group.heading}</h1>
                    <ul className="flex flex-col gap-1">
                      {group?.links?.map((link, i) => (
                        <li key={i}>
                          <PayloadLink {...link} className="text-lg" />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </FaqSection>
        )}
      </div>
      {marquee && (
        <Marquee>
          <MarqueeContent asChild speed="slow">
            <h1 className="text-8xl">{marqueeText}</h1>
          </MarqueeContent>
          <MarqueeContent asChild duplicate speed="slow">
            <h1 className="text-8xl">{marqueeText}</h1>
          </MarqueeContent>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </Marquee>
      )}
    </footer>
  );
}
