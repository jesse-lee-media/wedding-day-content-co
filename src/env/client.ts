import { createEnv } from '@t3-oss/env-nextjs';
import { string } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_UMAMI_SRC: string().min(1),
    NEXT_PUBLIC_UMAMI_ID: string().min(1),
    NEXT_PUBLIC_DOMAIN: string().min(1),
    NEXT_PUBLIC_SERVER_URL: string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC,
    NEXT_PUBLIC_UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
});
