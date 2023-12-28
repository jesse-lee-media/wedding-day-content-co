'use server';

import { Resend } from 'resend';

import { PayloadInquiry } from '@/lib/types/payload';

const { RESEND_KEY, EMAIL_FROM_ADDRESS, EMAIL_TO_ADDRESS, NEXT_PUBLIC_PAYLOAD_URL } = process.env;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const submitInquiry = async (data: PayloadInquiry) => {
  const resend = new Resend(RESEND_KEY);

  await resend.emails
    .send({
      from: `No Reply <${EMAIL_FROM_ADDRESS}>`,
      to: EMAIL_TO_ADDRESS!,
      subject: `New Inquiry from ${data.first} ${data.last}`,
      html: `
      <p style="margin: 0 0 4px"><strong>First name</strong></p>
      <p style="margin: 0 0 16px">${data.first}</p>

      <p style="margin: 0 0 4px"><strong>Last name</strong></p>
      <p style="margin: 0 0 16px">${data.last}</p>

      <p style="margin: 0 0 4px"><strong>Email</strong></p>
      <p style="margin: 0 0 16px">${data.email}</p>

      <p style="margin: 0 0 4px"><strong>Phone</strong></p>
      <p style="margin: 0 0 16px">${data.phone}</p>

      <p style="margin: 0 0 4px"><strong>Start date</strong></p>
      <p style="margin: 0 0 16px">${formatDate(data.startDate)}</p>

      <p style="margin: 0 0 4px"><strong>End date</strong></p>
      <p style="margin: 0 0 16px">${data.endDate ? formatDate(data.endDate) : '<em>none</em>'}</p>

      <p style="margin: 0 0 4px"><strong>Budget</strong></p>
      <p style="margin: 0 0 16px">${data.budget}</p>

      <p style="margin: 0 0 4px"><strong>Location</strong></p>
      <p style="margin: 0 0 16px">${data.location}</p>

      <p style="margin: 0 0 4px"><strong>Information</strong></p>
      <p style="margin: 0 0 16px">${data.information}</p>

      <p style="margin: 0 0 4px"><strong>Photographer name(s)</strong></p>
      <p style="margin: 0 0 16px">${data.photographerNames || '<em>none</em>'}</p>

      <p style="margin: 0 0 4px"><strong>Open to other creators</strong></p>
      <p style="margin: 0 0 16px">${data.openToOtherCreators === 'no' ? 'No' : 'Yes'}</p>
    `,
    })
    .catch((error) => console.error(error));

  const res = await fetch(`${NEXT_PUBLIC_PAYLOAD_URL}/api/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
