import { revalidateTag } from 'next/cache';
import { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating global: ${doc.slug}`);
  revalidateTag(`global_${doc.slug}`);

  return doc;
};
