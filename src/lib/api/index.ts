import { stringify } from 'qs';

import { PayloadApi, PayloadPage } from '../types/payload';

const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api';
const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchGlobal = async <T = any>(global: string): Promise<T | undefined> => {
  try {
    const res = await fetch(`${PAYLOAD_API}/globals/${global}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: NEXT_CONFIG,
    });

    if (res.ok) {
      const data = await res.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | undefined> => {
  const slug = (segments || ['home']).join('/');
  const query = stringify({
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  });

  try {
    const res = await fetch(`${PAYLOAD_API}/pages?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: NEXT_CONFIG,
    });

    if (res.ok) {
      const data = (await res.json()) as PayloadApi<PayloadPage>;

      return data?.docs?.[0] ?? undefined;
    }
  } catch (error) {
    console.error(JSON.stringify(error));
  }

  return undefined;
};
