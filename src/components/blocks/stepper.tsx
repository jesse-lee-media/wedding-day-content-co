import { Fragment } from 'react';

import { RichText } from '@/components/rich-text';
import type { PayloadStepperBlock } from '@/payload/payload-types';

export function StepperBlock({ steps }: PayloadStepperBlock) {
  if (!steps?.length) {
    return null;
  }

  return (
    <div className="relative my-6 ml-4 max-w-5xl border-l-2 border-neutral-200/75 pl-8 first:mt-0 last:mb-0">
      {steps.map(({ content, heading, id }, i) => (
        <Fragment key={id}>
          <h2 className="relative mt-8 mb-6 flex items-center text-3xl leading-none drop-shadow-none first:mt-0 last:mb-0 xs:text-4xl">
            <span className="sr-only">Step</span>
            <span className="absolute -top-0.5 -ml-13 inline-flex size-9 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-50 font-sans text-lg font-medium ring-8 ring-white">
              <span className="drop-shadow-lg">{i + 1}</span>
            </span>
            <span className="drop-shadow-lg">{heading}</span>
          </h2>
          <RichText data={content} />
        </Fragment>
      ))}
    </div>
  );
}
