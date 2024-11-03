import { Fragment } from 'react';

import { Serialize } from '@/components/serialize';
import { PayloadStepperBlock } from '@/payload/payload-types';

export function StepperBlock({ steps }: PayloadStepperBlock) {
  if (!steps?.length) {
    return null;
  }

  return (
    <div className="relative my-6 ml-4 max-w-5xl border-l-2 border-neutral-200/75 pl-8 first:mt-0 last:mb-0">
      {steps.map(({ content, heading, id }, i) => (
        <Fragment key={id}>
          <h2 className="mb-6 mt-8 flex items-center text-3xl drop-shadow-none first:mt-0 last:mb-0 xs:text-4xl">
            <span className="sr-only">Step</span>
            <span className="absolute -ml-[53.5px] inline-flex size-10 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-50 font-sans text-xl font-medium ring-8 ring-white">
              <span className="drop-shadow-lg"> {i + 1}</span>
            </span>
            <span className="drop-shadow-lg">{heading}</span>
          </h2>
          {content ? <Serialize nodes={content.root.children} /> : null}
        </Fragment>
      ))}
    </div>
  );
}
