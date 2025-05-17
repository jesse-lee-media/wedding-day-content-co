import type { ComponentProps } from 'react';
import { useMemo } from 'react';

import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type {
  PayloadEmailBlock,
  PayloadPhoneNumberBlock,
  PayloadTextBlock,
  PayloadTextareaBlock,
} from '@/payload/payload-types';

type PayloadTextField =
  | PayloadTextBlock
  | PayloadTextareaBlock
  | PayloadEmailBlock
  | PayloadPhoneNumberBlock;

type Props = {
  meta: PayloadTextField;
  field: ControllerRenderProps<Record<string, string>, string>;
};

export function TextField({ meta, field }: Props) {
  if (meta.blockType === 'textarea') {
    return (
      <FormControl>
        <Textarea {...field} />
      </FormControl>
    );
  }

  const extra = useMemo(() => {
    const e: Partial<ComponentProps<typeof Input>> = {};

    if (meta.blockType === 'email') {
      e.type = 'email';
    }

    if (meta.blockType === 'phoneNumber') {
      e.type = 'tel';
    }

    return e;
  }, [meta.blockType]);

  return (
    <FormControl>
      <Input {...field} {...extra} />
    </FormControl>
  );
}
