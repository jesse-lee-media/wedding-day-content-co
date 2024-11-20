import type { Field, GlobalConfig } from 'payload';

import { Role, hasRole } from '@/payload/access';
import { buttonLinkGroup } from '@/payload/fields/buttonLink';
import { linkArray } from '@/payload/fields/link';
import { revalidateGlobalAfterChange } from '@/payload/hooks/revalidate-global';
import { deepMerge } from '@/payload/utils/deep-merge';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  typescript: {
    interface: 'PayloadNavigationGlobal',
  },
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    linkArray,
    deepMerge<Field>(buttonLinkGroup, { name: 'callToAction', label: 'Call to Action' }),
  ],
};
