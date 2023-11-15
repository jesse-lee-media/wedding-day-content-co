import dynamic from 'next/dynamic';

import { metadata } from '@/app/layout';
import Marquee from '@/lib/components/Marquee';
import PayloadLink from '@/lib/components/PayloadLink';
import { PayloadFooter } from '@/lib/types/payload';

import FaqSection from './FaqSection';
import FaqsLoading from './FaqsLoading';

const FaqAccordion = dynamic(() => import('./FaqAccordion'), { loading: () => <FaqsLoading /> });

export default function Footer({ copyright, faqs, linkGroups, marquee }: PayloadFooter) {
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
      {marquee && <Marquee text={marquee} />}
      <p className="text-center text-xs text-white/75">
        &copy; {new Date().getFullYear()} {copyright ?? `${metadata.title}`}
      </p>
    </footer>
  );
}
