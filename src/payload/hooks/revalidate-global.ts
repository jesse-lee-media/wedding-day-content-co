import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({
  doc,
  global: { slug },
  req: { payload },
}) => {
  payload.logger.info(`Revalidating global: ${slug}`);
  revalidateTag(`global_${slug}`);

  return doc;
};
