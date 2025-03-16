'use server';

import { getPayload } from 'payload';

import type { PayloadFormSubmissionsCollection } from '@/payload/payload-types';
import config from '@/payload/payload.config';

export const submitForm = async (form: string, data: PayloadFormSubmissionsCollection['data']) => {
  const payload = await getPayload({ config });
  const result = await payload.create({
    collection: 'form-submissions',
    data: {
      form,
      data,
    },
  });

  return result;
};
