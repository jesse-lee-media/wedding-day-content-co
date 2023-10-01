import { PAGES } from './pages';

const PAYLOAD_GRAPHQL = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api/graphql';
const NEXT_CONFIG = {
  revalidate: 60,
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
