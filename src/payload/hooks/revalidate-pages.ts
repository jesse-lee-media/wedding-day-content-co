import { revalidateTag } from 'next/cache';
import { BasePayload, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const revalidatePages = (payload: BasePayload) => {
  payload.logger.info('Revalidating pages');
  revalidateTag('pages');
};

export const revalidatePagesAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  revalidatePages(payload);

  return doc;
};

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook = ({ req: { payload } }) => {
  revalidatePages(payload);
};
