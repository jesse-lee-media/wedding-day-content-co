import { revalidateTag } from 'next/cache';
import { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({
  doc,
  global,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating global: ${global.slug}`);
  revalidateTag(`global_${doc.slug}`);

  return doc;
};
