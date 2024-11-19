import { createEnv } from '@t3-oss/env-nextjs';
import { string } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_UMAMI_SRC: string().min(1),
    NEXT_PUBLIC_UMAMI_ID: string().min(1),
    NEXT_PUBLIC_DOMAINS: string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC,
    NEXT_PUBLIC_UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID,
    NEXT_PUBLIC_DOMAINS: process.env.NEXT_PUBLIC_DOMAINS,
  },
});
