import { PayloadPage } from '../types/payload';

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api';
const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | undefined> => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  try {
    const req = await fetch(`${PAYLOAD_API}/pages?where[slug][equals]=${slug}`, {
      method: 'GET',
      next: NEXT_CONFIG,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await req.json();

    if (!req.ok || data.errors) {
      console.error(JSON.stringify(data.errors));

      throw new Error();
    }

    return data.docs[0];
  } catch (err) {
    console.error(err);

    return undefined;
  }
};
