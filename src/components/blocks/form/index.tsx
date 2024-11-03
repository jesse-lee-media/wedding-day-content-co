import { FormClient } from '@/components/blocks/form/form.client';
import { Serialize } from '@/components/serialize';
import { PayloadFormBlock } from '@/payload/payload-types';

export function FormBlock(props: PayloadFormBlock) {
  const { form } = props;

  if (typeof form === 'string') {
    // TODO: make alert component
    return <p>There was an error rendering the form. Please reload the page and try again.</p>;
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="mb-8 mt-10 text-4xl first:mt-0 last:mb-0 xs:text-5xl">{form.title}</h1>
      {form.description?.root?.children ? (
        <Serialize nodes={form.description.root.children} />
      ) : null}
      <FormClient {...form} />
    </section>
  );
}
