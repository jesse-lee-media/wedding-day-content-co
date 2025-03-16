import { RichText } from '@/components/rich-text';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/components/accordion';
import type { PayloadFooterGlobal } from '@/payload/payload-types';

export default function FaqAccordion({ faqs }: { faqs: PayloadFooterGlobal['faqs'] }) {
  const faqsArray = faqs?.filter((faq) => typeof faq !== 'string');

  if (!faqsArray?.length) {
    return null;
  }

  return (
    <Accordion type={faqsArray.length === 1 ? 'single' : 'multiple'}>
      {faqsArray.map((faq) => (
        <AccordionItem value={faq.id} key={faq.id}>
          <AccordionHeader asChild>
            <h2>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
            </h2>
          </AccordionHeader>
          <AccordionContent>
            <RichText data={faq.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
