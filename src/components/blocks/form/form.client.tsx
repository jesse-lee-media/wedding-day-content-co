/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { z } from 'zod';

import { submitForm } from '@/components/blocks/form/form.action';
import { RichText } from '@/components/rich-text';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputButton } from '@/components/ui/input';
import { OverflowText } from '@/components/ui/overflow-text';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/cn';
import type {
  PayloadFormSubmissionsCollection,
  PayloadFormsCollection,
} from '@/payload/payload-types';

const REQUIRED_MESSAGE = 'Field is required';

export const FormClient = (props: PayloadFormsCollection) => {
  const { confirmationMessage, fields, id, submitButtonLabel } = props;

  let defaultValues: Record<string, any> = {};

  const formSchema = z.object(
    fields.reduce(
      (schema, field) => {
        let fieldSchema;

        switch (field.blockType) {
          case 'text':
          case 'textarea':
          case 'select':
          case 'radio': {
            if (field.required) {
              fieldSchema = z.string().min(1, { message: REQUIRED_MESSAGE });
            } else {
              fieldSchema = z.string().optional();
            }

            defaultValues = Object.assign(defaultValues, {
              [field.name]: field.defaultValue ?? '',
            });

            break;
          }
          case 'email': {
            const validator = (arg: string | undefined) => (arg ? isEmail(arg) : true);
            const message = 'Must be a valid email address';

            if (field.required) {
              fieldSchema = z.string().min(1, { message: REQUIRED_MESSAGE }).refine(validator, {
                message,
              });
            } else {
              fieldSchema = z.string().optional().refine(validator, { message });
            }

            defaultValues = Object.assign(defaultValues, {
              [field.name]: field.defaultValue ?? '',
            });

            break;
          }
          case 'phoneNumber': {
            const validator = (arg: string | undefined) => (arg ? isMobilePhone(arg) : true);
            const message = 'Must be a valid phone number';

            if (field.required) {
              fieldSchema = z
                .string()
                .min(1, { message: REQUIRED_MESSAGE })
                .refine(validator, { message });
            } else {
              fieldSchema = z.string().optional().refine(validator, { message });
            }

            defaultValues = Object.assign(defaultValues, {
              [field.name]: field.defaultValue ?? '',
            });

            break;
          }
          case 'date': {
            switch (field.mode) {
              case 'single': {
                if (field.required) {
                  fieldSchema = z.date({ required_error: REQUIRED_MESSAGE });
                } else {
                  fieldSchema = z.date().optional();
                }

                defaultValues = Object.assign(defaultValues, {
                  [field.name]: field.defaultDateValue
                    ? new Date(field.defaultDateValue)
                    : undefined,
                });

                break;
              }
              case 'multiple': {
                if (field.required) {
                  fieldSchema = z.date().array().min(1, { message: REQUIRED_MESSAGE });
                } else {
                  fieldSchema = z.date().array().optional();
                }

                defaultValues = Object.assign(defaultValues, {
                  [field.name]: field.defaultDateValues?.length
                    ? field.defaultDateValues
                        .filter((v) => !!v.value)
                        .map((v) => new Date(v.value!))
                    : [],
                });

                break;
              }
              case 'range': {
                if (field.required) {
                  fieldSchema = z.object({
                    from: z.date({ required_error: REQUIRED_MESSAGE }),
                    to: z.date().optional(),
                  });
                } else {
                  fieldSchema = z.object({
                    from: z.date().optional(),
                    to: z.date().optional(),
                  });
                }

                defaultValues = Object.assign(defaultValues, {
                  [field.name]: {
                    ...(field.defaultDateFromValue
                      ? { from: new Date(field.defaultDateFromValue) }
                      : {}),
                    ...(field.defaultDateToValue ? { to: new Date(field.defaultDateToValue) } : {}),
                  },
                });

                break;
              }
            }

            break;
          }
        }

        return Object.assign(schema, { [field.name]: fieldSchema });
      },
      {} as Record<string, z.ZodType>,
    ),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [pending, setPending] = useState(false);

  function formatDateShort(date?: Date | null) {
    if (!date) {
      return '';
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function dateFieldHasValue(payloadField: PayloadFormsCollection['fields'][number], field: any) {
    if (payloadField.blockType !== 'date') {
      return false;
    }

    if (payloadField.mode === 'single') {
      return !!field.value;
    }

    if (payloadField.mode === 'multiple') {
      return !!field.value?.length;
    }

    return !!field.value?.from || !!field.value?.to;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const formattedValues = fields.map<PayloadFormSubmissionsCollection['data'][number]>(
      (field) => {
        if (field.blockType === 'date') {
          let value = '';

          if (field.mode === 'multiple') {
            value = (values[field.name] as Date[]).reduce(
              (acc: string, date: Date, i: number) =>
                `${acc}${formatDateShort(date)}${i < values[field.name].length - 1 ? '; ' : ''}`,
              '',
            );
          } else if (field.mode === 'range') {
            const from = values[field.name].from;
            const to = values[field.name].to;

            value = `${formatDateShort(from)} ${to ? `– ${formatDateShort(to)}` : ''}`.trim();
          } else {
            value = formatDateShort(values[field.name]);
          }

          return {
            label: field.label,
            name: field.name,
            value,
          };
        }

        return {
          label: field.label,
          name: field.name,
          value: String(values[field.name]),
        };
      },
    );

    try {
      await submitForm(id, formattedValues);

      toast.success(confirmationMessage);
      form.reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id={id}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {fields.map((payloadField) => (
          <FormField
            key={payloadField.id}
            control={form.control}
            name={payloadField.name}
            render={({ field }) => (
              <FormItem className={cn(payloadField.width === 'full' && 'sm:col-span-2')}>
                <FormLabel>
                  {payloadField.label}
                  {payloadField.required ? null : ' (optional)'}
                </FormLabel>
                {(() => {
                  switch (payloadField.blockType) {
                    case 'text':
                      return (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      );
                    case 'textarea':
                      return (
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      );
                    case 'email':
                      return (
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                      );
                    case 'phoneNumber':
                      return (
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                      );
                    case 'date':
                      return (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <InputButton
                                displayChildren={dateFieldHasValue(payloadField, field)}
                                icon={
                                  dateFieldHasValue(payloadField, field)
                                    ? 'calendarCheck'
                                    : 'calendar'
                                }
                              >
                                <OverflowText>
                                  {(() => {
                                    switch (payloadField.mode) {
                                      case 'single':
                                        return field.value ? formatDateShort(field.value) : null;
                                      case 'multiple':
                                        return field.value.map(formatDateShort).join(', ');
                                      case 'range':
                                        return field.value.from ? (
                                          field.value.to ? (
                                            <>
                                              {formatDateShort(field.value.from)} &ndash;{' '}
                                              {formatDateShort(field.value.to)}
                                            </>
                                          ) : (
                                            formatDateShort(field.value.from)
                                          )
                                        ) : null;
                                    }
                                  })()}
                                </OverflowText>
                              </InputButton>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode={payloadField.mode}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                switch (payloadField.allowedDates) {
                                  case 'any':
                                    return false;
                                  case 'previous':
                                    return date > new Date();
                                  case 'future':
                                    return date < new Date();
                                }
                              }}
                              numberOfMonths={1}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      );
                    case 'select':
                      return (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {payloadField.options.map((option) => (
                              <SelectItem key={option.id} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    case 'radio':
                      return (
                        <FormControl>
                          <RadioGroup
                            value={field.value ?? 'no'}
                            onValueChange={field.onChange}
                            defaultValue={field.value ?? 'no'}
                            className="flex flex-col justify-start"
                          >
                            {payloadField.options.map((option) => (
                              <FormItem key={option.id} className="flex flex-row gap-3">
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
                })()}
                {payloadField.description ? (
                  <div>
                    <RichText
                      data={payloadField.description}
                      overrideClasses={{ paragraph: 'text-sm text-neutral-500' }}
                    />
                  </div>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end sm:col-span-2">
          <Button
            type="submit"
            disabled={pending}
            variant="primary"
            size="lg"
            iconPosition={pending ? 'left' : undefined}
            className="xs:w-full sm:w-fit"
          >
            {submitButtonLabel}
            {pending ? <Spinner /> : null}
          </Button>
        </div>
      </form>
    </Form>
  );
};
