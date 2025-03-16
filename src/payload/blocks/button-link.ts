import type { Block } from 'payload';

import { fields } from '@/payload/fields/buttonLink';

export const ButtonLink: Block = {
  slug: 'buttonLink',
  interfaceName: 'PayloadButtonLinkBlock',
  fields,
};
