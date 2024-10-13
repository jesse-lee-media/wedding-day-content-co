import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_DOMAINS: z.string().min(1),
    NEXT_PUBLIC_UMAMI_ID: z.string().min(1),
    NEXT_PUBLIC_UMAMI_SRC: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DOMAINS: process.env.NEXT_PUBLIC_DOMAINS,
    NEXT_PUBLIC_UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID,
    NEXT_PUBLIC_UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC,
  },
});
