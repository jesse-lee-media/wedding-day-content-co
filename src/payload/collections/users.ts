import type { CollectionConfig } from 'payload';

import { Role, hasRole, hasRoleField, hasRoleOrSelf, hasRoleOrSelfField } from '@/payload/access';

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  typescript: {
    interface: 'PayloadUsersCollection',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleOrSelf(Role.Admin),
    update: hasRoleOrSelf(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      interfaceName: 'PayloadUserRolesField',
      access: {
        read: hasRoleOrSelfField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
      hasMany: true,
      required: true,
      defaultValue: [Role.Public],
      options: Object.values(Role).map((value) => value),
    },
  ],
};
