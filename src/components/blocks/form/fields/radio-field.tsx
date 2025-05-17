import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { PayloadRadioBlock } from '@/payload/payload-types';

type Props = {
  meta: PayloadRadioBlock;
  field: ControllerRenderProps<Record<string, string>, string>;
};

export function RadioField({ meta, field }: Props) {
  return (
    <FormControl>
      <RadioGroup
        value={field.value}
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex flex-col justify-start"
      >
        {meta.options.map((option) => (
          <FormItem key={option.id || option.value} className="flex flex-row gap-3">
            <FormControl>
              <RadioGroupItem value={option.value} />
            </FormControl>
            <FormLabel className="text-lg font-normal tracking-normal text-neutral-800 normal-case">
              {option.label}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
