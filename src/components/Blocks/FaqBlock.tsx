import * as Accordion from '@/lib/components/AppAccordion';
import { PayloadFaqBlock } from '@/lib/types/payload';

import Serialize from '../Serialize';

export default function FaqBlock(props: PayloadFaqBlock) {
  const { id, questions } = props;

  return (
    <Accordion.Root id={id!} className="my-10 first:mt-0 last:mb-0">
      {questions?.map(({ question, answer }, index: number) => (
        <Accordion.Item key={index} value={`${id}-${index}`}>
          <Accordion.Trigger>{question}</Accordion.Trigger>
          <Accordion.Content>
            <Serialize nodes={answer as any} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
