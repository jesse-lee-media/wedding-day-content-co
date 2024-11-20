import dynamic from 'next/dynamic';

import { FaqSection } from '@/components/footer/faq-section';
import { FaqsLoading } from '@/components/footer/faqs-loading';
import { Marquee, MarqueeContent, MarqueeFade } from '@/lib/components/marquee';
import { PayloadLink } from '@/lib/components/payload-link';
import type { PayloadFooterGlobal } from '@/payload/payload-types';

const FaqAccordion = dynamic(() => import('./faq-accordion'), { loading: () => <FaqsLoading /> });

export function Footer({ faqs, linkGroups, marquee }: PayloadFooterGlobal) {
  const marqueeText = new Array(4).fill(marquee ?? '').join(' ') + ' ';

  return (
    <footer className="dark flex flex-col gap-24 bg-black py-16 text-white">
      <div className="mx-auto w-full max-w-7xl px-4">
        {faqs && faqs.length > 0 && (
          <FaqSection heading="Frequently asked questions">
            <FaqAccordion faqs={faqs} />
          </FaqSection>
        )}
        {linkGroups && linkGroups.length > 0 && (
          <FaqSection heading="Links">
            <div className="@container">
              <ul className="grid grid-cols-1 gap-8 @xs:grid-cols-2 @sm:grid-cols-3">
                {linkGroups.map(({ heading, id, links }) => (
                  <li key={id} className="flex flex-col gap-2">
                    <h2 className="font-sans text-sm !leading-normal text-white/75">{heading}</h2>
                    <ul className="flex flex-col gap-1">
                      {links?.map((link) => (
                        <li key={link.id}>
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
