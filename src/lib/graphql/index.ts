import { GLOBALS } from './globals';
import { PAGE, PAGES } from './pages';
import { PayloadGlobals, PayloadPage } from '../types/payload';

const PAYLOAD_GRAPHQL = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api/graphql';
const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchGlobals = async (): Promise<PayloadGlobals> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: GLOBALS,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data;
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | undefined> => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PAGE,
      variables: {
        slug,
      },
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs[0];
};

export const fetchPages = async (): Promise<Array<{ slug: string }>> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PAGES,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs;
};
