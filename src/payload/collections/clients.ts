import type { CollectionConfig } from 'payload';

import { Role, hasRole } from '@/payload/access';
import { decryptField, encryptField } from '@/payload/hooks/encryption';

export const Clients: CollectionConfig<'clients'> = {
  slug: 'clients',
  typescript: {
    interface: 'PayloadClientsCollection',
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRole(Role.Admin),
    update: hasRole(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt', 'updatedAt'],
    group: 'CRM',
  },
  auth: true,
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      hooks: {
        beforeChange: [encryptField],
        afterRead: [decryptField],
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      hooks: {
        beforeChange: [encryptField],
        afterRead: [decryptField],
      },
    },
    {
      name: 'forms',
      type: 'join',
      collection: 'form-submissions',
      on: 'client',
    },
  ],
};
