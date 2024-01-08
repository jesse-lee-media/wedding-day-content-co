import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/components/accordion';
import { PayloadFaq } from '@/lib/types/payload';

import Serialize from '../serialize';

export default function FaqAccordion({ faqs }: { faqs: PayloadFaq[] }) {
  return (
    <Accordion type={faqs.length === 1 ? 'single' : 'multiple'}>
      {faqs.map((faq, i) => (
        <AccordionItem value={`faq-${i}`} key={i}>
          <AccordionHeader asChild>
            <h2>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
            </h2>
          </AccordionHeader>
          <AccordionContent className="text-white/75">
            {faq.answer?.root?.children && <Serialize nodes={faq.answer.root.children} />}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
