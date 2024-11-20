/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as IconCalendar } from 'iconoir-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { z } from 'zod';

import { Serialize } from '@/components/serialize';
import { Button } from '@/lib/components/button';
import { Calendar } from '@/lib/components/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/form';
import { Input, InputButton } from '@/lib/components/input';
import { OverflowText } from '@/lib/components/overflow-text';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/popover';
import { RadioGroup, RadioGroupItem } from '@/lib/components/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/select';
import { Spinner } from '@/lib/components/spinner';
import { Textarea } from '@/lib/components/textarea';
import { cn } from '@/lib/utils/cn';
import type { PayloadFormCollection } from '@/payload/payload-types';

const REQUIRED_MESSAGE = 'Field is required';

export const FormClient = (props: PayloadFormCollection) => {
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
            const validator = (arg: string | undefined) =>
              arg ? isMobilePhone(arg, 'en-US') : true;
            const message = 'Must be a valid US phone number';

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

  function formatDateShort(date: Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setPending(true);

    console.log(values);
    toast.success(confirmationMessage);

    // try {
    //   const data = await submitInquiry(inquiry);

    //   if (data.errors) {
    //     toast.error(data.errors[0].message);
    //   } else {
    //     toast.success(successMessage);
    //     form.reset();
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Something went wrong. Please try again.');
    // } finally {
    //   setPending(false);
    // }
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
                                displayChildren={
                                  !!field.value || !!field.value?.length || !!field.value?.from
                                }
                                icon={IconCalendar}
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
                                <FormLabel className="text-lg font-normal text-black">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      );
                  }
                })()}
                {payloadField.description?.root?.children ? (
                  <FormDescription>
                    <Serialize nodes={payloadField.description.root.children} />
                  </FormDescription>
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
