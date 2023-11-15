import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/components/Accordion';
import { PayloadFaq } from '@/lib/types/payload';

import Serialize from '../Serialize';

export default function FaqAccordion({ faqs }: { faqs: PayloadFaq[] }) {
  return (
    <Accordion type={faqs.length === 1 ? 'single' : 'multiple'}>
      {faqs.map((faq, i) => (
        <AccordionItem value={`faq-${i}`} key={i}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="text-white/75">
            {faq.answer?.root?.children && <Serialize nodes={faq.answer.root.children} />}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
