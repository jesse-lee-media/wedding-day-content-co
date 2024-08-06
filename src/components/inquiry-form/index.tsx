'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Calendar as IconCalendar } from 'iconoir-react';
import { useForm } from 'react-hook-form';
import isMobilePhone from 'validator/lib/isMobilePhone';
import * as z from 'zod';

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
import { Input } from '@/lib/components/input';
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
import { useToast } from '@/lib/hooks/use-toast';
import { PayloadInquiry } from '@/lib/types/payload';
import { cn } from '@/lib/utils';

import { submitInquiry } from './inquiry.actions';

const formSchema = z.object({
  first: z.string().min(1, {
    message: 'First name is required',
  }),
  last: z.string().min(1, {
    message: 'Last name is required',
  }),
  email: z.string().email({
    message: 'Must be a valid email address',
  }),
  phone: z.string().refine(isMobilePhone, {
    message: 'Must be a valid phone number',
  }),
  dates: z.object({
    from: z.date({
      required_error: 'Date is required',
    }),
    to: z.date().optional(),
  }),
  budget: z.string().min(1, {
    message: 'Budget is required',
  }),
  location: z.string().min(1, {
    message: 'Location is required',
  }),
  information: z.string().min(1, {
    message: 'Information is required',
  }),
  names: z.string().optional(),
  openToOtherCreators: z.enum(['no', 'yes'], {
    required_error: 'Selection is required',
  }),
});

export default function InquiryForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first: '',
      last: '',
      email: '',
      phone: '',
      dates: {},
      location: '',
      budget: '',
      information: '',
      names: '',
      openToOtherCreators: 'no',
    },
  });
  const { toast } = useToast();

  function formatDateShort(date: Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const inquiry: PayloadInquiry = {
      first: values.first,
      last: values.last,
      email: values.email,
      phone: values.phone,
      startDate: values.dates.from.toISOString(),
      endDate: values.dates.to?.toISOString() ?? null,
      budget: values.budget,
      location: values.location,
      information: values.information,
      photographerNames: values.names,
      openToOtherCreators: values.openToOtherCreators,
    };

    try {
      const data = await submitInquiry(inquiry);

      if (data.errors) {
        toast({
          title: 'Oh no!',
          description: data.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Thank you!',
          description: 'Your inquiry has been submitted.',
          variant: 'success',
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Oh no!',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="first"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      className={cn(
                        'flex h-14 w-full flex-row items-center justify-between rounded-xl border border-black/75 bg-white pl-5 pr-4 text-lg text-black transition hover:border-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/75 dark:border-white dark:bg-black dark:text-white dark:hover:bg-white/5 dark:focus:ring-white/75',
                        !field.value && 'text-black/75',
                      )}
                    >
                      {field.value?.from ? (
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {field.value.to ? (
                            <>
                              {formatDateShort(field.value.from)} &ndash;{' '}
                              {formatDateShort(field.value.to)}
                            </>
                          ) : (
                            formatDateShort(field.value.from)
                          )}
                        </span>
                      ) : (
                        <span />
                      )}
                      <IconCalendar className={cn(!field.value && 'text-black', 'justify-end')} />
                    </button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    numberOfMonths={1}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="pr-4">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="$1,650 – $2,000">$1,650 &ndash; $2,000</SelectItem>
                  <SelectItem value="$2,000 – $2,500">$2,000 &ndash; $2,500</SelectItem>
                  <SelectItem value="$2,500+">$2,500+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Information</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Tell me more about your venue (name, location, theme, etc.), wedding events that
                you&apos;d like covered (welcome party, rehearsal dinner, etc.), or anything else!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="names"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Photographer and videographer names (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openToOtherCreators"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                Are you comfortable working with another creator on our team if Jesse is
                unavailable?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value ?? 'no'}
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? 'no'}
                  className="flex flex-col justify-start"
                >
                  <FormItem className="flex flex-row gap-3">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="text-lg font-normal text-black">
                      No, I only want to work with Jesse
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-row gap-3">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="text-lg font-normal text-black">
                      I&apos;m open to working with other team members who are the best of the best
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end sm:col-span-2">
          <Button
            type="submit"
            disabled={pending}
            variant="solid"
            size="lg"
            iconPosition="right"
            className="xs:w-full sm:w-fit"
            data-umami-event="Inquiry form submit"
            data-umami-event-first={form.watch('first')}
            data-umami-event-last={form.watch('last')}
            data-umami-event-email={form.watch('email')}
          >
            Submit
            {pending ? <Spinner /> : <ArrowRight className="size-5" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
