export const getServerSideURL = (path: string) => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}${path}`;
  }

  if (!url) {
    url = 'http://localhost:3000';
  }

  return url + path;
};
