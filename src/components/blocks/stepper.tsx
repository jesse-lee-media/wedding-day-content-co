import { Fragment } from 'react';

import { PayloadBlockStepper } from '@/lib/types/payload';

import Serialize from '../serialize';

export default function BlockStepper({ steps }: PayloadBlockStepper) {
  return (
    <div className="relative my-6 ml-4 max-w-5xl border-l border-black pl-8 first:mt-0 last:mb-0">
      {steps.map(({ content, heading }, i) => (
        <Fragment key={i}>
          <h2 className="mb-6 mt-8 flex items-center text-3xl first:mt-0 last:mb-0 xs:text-4xl">
            <span className="sr-only">Step</span>
            <span className="absolute -ml-[49.5px] inline-flex size-8 items-center justify-center rounded-full border border-black bg-pink-100 font-sans text-xl ring-8 ring-white">
              {i + 1}
            </span>
            {heading}
          </h2>
          <Serialize nodes={content.root.children!} />
        </Fragment>
      ))}
    </div>
  );
}
