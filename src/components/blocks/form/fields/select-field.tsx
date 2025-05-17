import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PayloadSelectBlock } from '@/payload/payload-types';

type Props = {
  meta: PayloadSelectBlock;
  field: ControllerRenderProps<Record<string, string>, string>;
};

export function SelectField({ meta, field }: Props) {
  return (
    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {meta.options.map((option) => (
          <SelectItem key={option.id || option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
